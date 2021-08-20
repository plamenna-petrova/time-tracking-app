<template>
  <img alt="Vue logo" src="./assets/asbestos-app-icon.jpg">
  <TasksList />
</template>

<script>
import TasksList from './components/TasksList.vue'

export default {
  name: 'App',
  components: {
    TasksList
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
