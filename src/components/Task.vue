<template>
    <div class="d-flex flex-row justify-content-center tasks-to-remove-list m-3 p-3" :class="{ 'active-task-container shadow' : isActive, 'shadow' : !isActive }">
        <div class="d-flex flex-row bg-warning task-name">
            <div class="p-2">
                <ButtonEditTask class="click-outside-ignore" @click="toggleEdit" />
            </div>
            <div class="p-2">
                <div class="text-dark flex-grow" :class="{ 'font-weight-bold' : isActive }"> Task Name : {{ task.name }} </div>
            </div>
            <div class="p-2">
                <InputText v-model="taskToEdit.name" v-click-outside="toggleEdit" v-esc="toggleEdit" class="flex-grow" @keyup.enter="updateTask"/>
            </div>
            <div class="p-2">
                <ButtonSaveEdit @click="updateTask" />
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
        <div class="update-time">
            <button class="btn btn-primary" @click="updateTime">Save and update time</button>
        </div>
    </div>
</template>

<script>

import { computed, reactive, ref, watch } from 'vue'
import { useStore } from '../store.js'
import { formatTime } from '../utils.js'

import ButtonDeleteTask from './button/ButtonDeleteTask.vue'
import ButtonStop from './button/ButtonStop.vue'
import ButtonStart from './button/ButtonStart.vue'
import ButtonEditTask from './button/ButtonEditTask.vue'
import ButtonSaveEdit from './button/ButtonSaveEdit.vue'
import InputText from './input/InputText.vue'

export default {
    name: 'Task',
    components: {
        ButtonDeleteTask,
        ButtonStart,
        ButtonStop,
        ButtonEditTask,
        ButtonSaveEdit,
        InputText
    },
    props: {
        task: Object
    },
    emits: ['reduce:total', 'update:total'],
    setup(props, { emit }) {

        const { editTaskName, updateTaskTime, removeTask, setActiveTask, setStoppedTask } = useStore();

        const isActive = computed(() => props.task.activeTask);

        const taskToEdit = reactive({
            editing: false,
            name: ''
        });

        const taskTotalTime = ref(0);
        const timeSpent = computed(() => { return formatTime(taskTotalTime.value) });

        let increment;

        const deleteTaskFromList = (currentTask) => {
            if (taskTotalTime.value > 0) {
                if (confirm('Do you really want to remove this task and the time spent on it?')) {
                    clearInterval(increment);
                    removeTask(currentTask);
                    emit('reduce:total', taskTotalTime.value);
                } else { 
                    return
                }
            } else {
                removeTask(currentTask);    
            }
        }

        const toggleEdit = () => {
            // console.log(taskToEdit.editing);
            taskToEdit.editing = !taskToEdit.editing;
            return taskToEdit.editing ? taskToEdit.name = props.task.name : ''
        }

        const startTracking = () => {
            setActiveTask(props.task.id);
        }

        const stopTracking = () => {
            setStoppedTask(props.task.id);
        }

        const updateTask = () => {
            if (taskToEdit.name) {
                editTaskName(props.task.id, taskToEdit.name);
                // toggleEdit();
            } else {
                alert('Please enter a task name!');
                return
            }
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

        const updateTime = () => {
            if (props.task.name) {
                updateTaskTime(props.task.id, timeSpent);
            } else {
                alert('Error');
                return
            }
        }

        return {
            isActive,
            toggleEdit,
            taskToEdit,
            deleteTaskFromList,
            stopTracking,
            startTracking,
            timeSpent,
            updateTask,
            updateTime
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