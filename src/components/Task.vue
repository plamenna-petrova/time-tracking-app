<template>
    <div class="d-flex flex-row justify-content-center tasks-to-remove-list m-3 p-3" :class="{ 'active-task-container shadow' : isActive, 'shadow' : !isActive }">
        <div class="p-2 bg-warning text-dark task-name" :class="{ 'font-weight-bold' : isActive }"> Task Name : {{ task.name }} </div>
        <div class="p-2 bg-info rounded text-dark time-spent"> Time Spent : {{ timeSpent }}</div>
        <div class="adjust-tracking">
            <transition-group name="buttons">
                <ButtonStart v-if="!isActive" buttonTitle="Start Tracking" @click="startTracking" />
                <ButtonStop v-else :isActive="isActive" buttonTitle="Stop Tracking" @click="pauseTracking" />
            </transition-group>
        </div>
        <div class="remove-tracked-task">
            <ButtonDeleteTask buttonTitle="Delete Task" class="btn btn-danger" @click="deleteTaskFromList(task)" />
        </div>
    </div>
</template>

<script>

import { computed, ref, watch } from 'vue'
import { useStore } from '../store.js'
import { formatTime } from '../utils.js'

import ButtonDeleteTask from './button/ButtonDeleteTask.vue';
import ButtonStop from './button/ButtonStop.vue';
import ButtonStart from './button/ButtonStart.vue';

export default {
    name: 'Task',
    components: {
        ButtonDeleteTask,
        ButtonStart,
        ButtonStop
    },
    props: {
        task: Object
    },
    emits: ['reduce:total', 'update:total'],
    setup(props, { emit }) {

        const { removeTask, setActiveTask, setPausedTask } = useStore();

        const isActive = computed(() => props.task.activeTask);
        const taskTotalTime = ref(0);
        const timeSpent = computed(() => { return formatTime(taskTotalTime.value) });

        let increment;

        const deleteTaskFromList = (currentTask) => {
            if (taskTotalTime.value > 0) {
                if (confirm('Do you really want to remove this task and the time spent on it?')) {
                    removeTask(currentTask);
                    emit('reduce:total', taskTotalTime.value);
                    clearInterval(increment);
                } else { 
                    return
                }
            } else {
                removeTask(currentTask);    
            }
        }

        const startTracking = () => {
            setActiveTask(props.task.id);
        }

        const pauseTracking = () => {
            setPausedTask(props.task.id);
        }

        watch(isActive, () => {
            if (isActive.value) {
                increment = setInterval(() => {
                  taskTotalTime.value++;
                  emit('update:total');        
                }, 1000);
            } else {
                clearInterval(increment);
            }
        })

        return {
            isActive,
            deleteTaskFromList,
            pauseTracking,
            startTracking,
            timeSpent
        }
    }
}

</script>

<style>
    .tasks-to-remove-list {
        width: 50%;
        position: relative;
        right: -50%;
        transform: translateX(-50%);
    }

    @media (max-width: 767px) {
        .tasks-to-remove-list {
          width: 75%;
        }
    }

    @media (max-width: 480px) {
        .tasks-to-remove-list {
        width: 90%;
        }
    }

    .task-name, .time-spent, .adjust-tracking {
        margin-right: 15px;
    }

    .active-task-container {
        background-color: darkslateblue;
    }
</style>