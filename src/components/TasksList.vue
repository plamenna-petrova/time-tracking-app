<template>
  <h3 class="mt-3">Simple Time Tracking App with Vue 3</h3>
  <div class="tasks-container">
    <div class="create-new-task">
      <div class="input-group create-new-task-group mt-3 mb-3">
        <InputText v-model="newTask.name" @keyup.enter="createNewTask" />
        <div class="input-group-append">
          <ButtonCreateTask @click="createNewTask"/>
        </div>
      </div>
    </div>
    <div class="task-list">
      <Task v-for="task in tasksList" :key="task.id" :task="task" @remove:task="deleteTaskFromList($event)" />
    </div>
  </div>
</template>

<script>

import ButtonCreateTask from './button/ButtonCreateTask.vue'
import InputText from './input/InputText.vue'
import Task from './Task.vue'

import { computed, reactive } from 'vue'
import { useStore } from '../store.js'

export default {
  name: 'TasksList',
  components: {
    ButtonCreateTask,
    InputText,
    Task
  },
  setup() {

    const store = useStore();

    const tasksList = computed(() => store.state.storedTasksList);

    const newTask = reactive({
      id: '',
      name: ''
    });

    const createNewTask = () => {
      if (newTask.name) {
        newTask.id = (Math.floor(Math.random() * 1000) + 1000).toString().substring(1);

        store.addTask({...newTask});

        alert('Task successfully created');

        newTask.id = '';
        newTask.name = '';
      } else {
        alert('Please enter a name of the task');
        return
      }
    }

    const deleteTaskFromList = (task) => {
      store.removeTask(task);
    }

    return {
      createNewTask,
      deleteTaskFromList,
      tasksList,
      newTask
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.create-new-task-group {
       width: 50%;
       left: 50%;
       transform: translateX(-50%);
}

@media (max-width: 767px) {
   .create-new-task-group {
     width: 75%;
   }
}

@media (max-width: 480px) {
  .create-new-task-group {
    width: 90%;
  }
}

</style>
