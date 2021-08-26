<template>
  <img alt="Vue logo" src="./assets/asbestos-app-icon.jpg">
  <ButtonSwitchTheme />
  <TasksList />
</template>

<script>
import ButtonSwitchTheme from './components/button/ButtonSwitchTheme.vue';
import TasksList from './components/TasksList.vue'

import { onMounted } from 'vue'
import { useStore } from './store.js'
import { applyTheme } from './utils'

export default {
  name: 'App',
  components: {
    ButtonSwitchTheme,
    TasksList
  },
  setup() {
    const { appTheme, deactivateAll, readStateFromLocalStorage } = useStore();

    onMounted(() => {
      const app = document.getElementById('app');
      app.style.opacity = '1';
      app.style.transition = 'opacity 1.5s ease';
      setTimeout(readStateFromLocalStorage(['appTheme', 'storedTasksList']), 50);
      // in case someone has saved the task list with a running task
      setTimeout(deactivateAll(), 100);
      setTimeout(applyTheme(appTheme.value), 150);
    })

    return {
      appTheme
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  height: 100px;
  width: 100px;
}
</style>
