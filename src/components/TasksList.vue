<template>
  <div class="tasks-container">
    <div class="create-new-task">
      <InputText v-model="newTask.name" @keyup.enter="createNewTask" />
      <ButtonCreateTask @click="createNewTask"/>
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
