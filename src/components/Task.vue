<template>
    <div class="d-flex flex-row justify-content-center tasks-to-remove-list m-3 p-3" :class="{ 'active-task-container shadow' : isActive, 'shadow' : !isActive }">
        <div class="d-flex flex-row bg-warning task-name">
            <div class="p-2">
                <div class="text-dark flex-grow" :class="{ 'font-weight-bold' : isActive }"> Task Name : {{ task.name }} </div>
            </div>
            <div class="p-2">
                <InputText v-model="taskToEdit.name" v-click-outside="toggleEdit" v-esc="toggleEdit" class="flex-grow" @keyup.enter="updateCurrentTask"/>
            </div>
            <div class="p-2">
                <ButtonSaveEdit @click="updateCurrentTask" />
            </div>    
        </div>
        <div class="p-2 bg-info rounded text-dark time-spent"> Time Spent : {{ timeSpent }}</div>
        <div class="adjust-tracking">
            <transition-group name="buttons">
                <ButtonStart v-if="!isActive" buttonTitle="Start Tracking" @click="startTracking" />
                <ButtonStop v-else :isActive="isActive" buttonTitle="Stop Tracking" @click="stopTracking" />
            </transition-group>
        </div>
        <div class="remove-tracked-task">
            <ButtonDeleteTask buttonTitle="Delete Task" class="btn btn-danger" @click="deleteTaskFromList(task)" />
        </div>
    </div>
</template>

<script>

import { computed, onMounted, reactive, watch } from 'vue'
import { useStore } from '../store.js'
import { formatTime } from '../utils.js'

import ButtonDeleteTask from './button/ButtonDeleteTask.vue'
import ButtonStop from './button/ButtonStop.vue'
import ButtonStart from './button/ButtonStart.vue'

import InputText from './input/InputText.vue'
import ButtonSaveEdit from './button/ButtonSaveEdit.vue'

export default {
    name: 'Task',
    components: {
        ButtonDeleteTask,
        ButtonStart,
        ButtonStop,
        InputText,
        ButtonSaveEdit
    },
    props: {
        task: Object
    },
    emits: ['reduce:total', 'update:total'],
    setup(props, { emit }) {

        const { updateTask, removeTask, setActiveTask, setStoppedTask } = useStore();

        const isActive = computed(() => props.task.activeTask);

        const taskToEdit = reactive({
            editing: false,
            name: ''
        });

        const taskTotal = computed(() => props.task.taskTotal);
        const timeSpent = computed(() => { return formatTime(taskTotal.value) });

        let timer;

        const deleteTaskFromList = (currentTask) => {
            if (taskTotal.value > 0) {
                if (confirm('Do you really want to remove this task and the time spent on it?')) {
                    removeTask(currentTask);
                    emit('reduce:total', taskTotal.value);
                } else { 
                    return
                }
            } else {
                removeTask(currentTask);    
            }
        }

        const toggleEdit = () => {
            taskToEdit.editing = !taskToEdit.editing;
            return taskToEdit.editing ? taskToEdit.name = props.task.name : ''
        }

        const stopTracking = () => {
            setStoppedTask(props.task.id);
        }
        
        const startTimerWorker = () => {
            timer = new Worker('../timer-worker.js');
            timer.postMessage({ total: taskTotal.value });
            timer.onmessage = (event) => {
                updateTask(props.task.id, 'taskTotal', event.data);
                emit('update:total');
            }
        }

         const startTracking = () => {
            setActiveTask(props.task.id);
        }

        const stopTimerWorker = () => {
            timer.terminate();
        }

        const updateCurrentTask = () => {
            if (taskToEdit.name) {
                updateTask(props.task.id, 'name', taskToEdit.name);
            } else {
                alert('Please enter a task name!');
                return
            }
        }

        watch(isActive, () => {
            if (isActive.value) {
                startTimerWorker();
            } else {
                stopTimerWorker();
            }
        })

        onMounted(() => {
            if (isActive.value) {
                startTimerWorker();
            }
        })

        return {
            isActive,
            toggleEdit,
            taskToEdit,
            deleteTaskFromList,
            stopTracking,
            startTracking,
            timeSpent,
            updateCurrentTask
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

    .task-name, .time-spent, .adjust-tracking, .remove-tracked-task {
        margin-right: 15px;
    }

    .active-task-container {
        background-color: darkslateblue;
    }
</style>