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
    const { appTheme, readStateFromLocalStorage } = useStore();

    onMounted(() => {
      setTimeout(readStateFromLocalStorage(['appTheme', 'storedTasksList']), 50);
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
