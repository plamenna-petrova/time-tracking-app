<template>
  <img alt="Vue logo" src="./assets/asbestos-app-icon.jpg">
  <router-view/>
  <ButtonSwitchTheme />
</template>

<script>
import ButtonSwitchTheme from './components/button/ButtonSwitchTheme.vue';

import { onMounted } from 'vue'
import { useStore } from './store.js'
import { applyTheme } from './utils'

export default {
  name: 'App',
  components: {
    ButtonSwitchTheme
  },
  setup() {
    const { appTheme, activeTasks, deactivateAll, readStateFromLocalStorage } = useStore();

    const onAppClose = (event) => {
        if (activeTasks.value && activeTasks.value.length !== 0) {
          alert(activeTasks.value);
          console.log(activeTasks.value)
          event.preventDefault(); // Firefox
          event.returnValue = ''; // Chrome
        } else {
          delete event['returnValue'];
        }
    }

    onMounted(() => {
      const appNode = document.getElementById('app');
      appNode.style.opacity = '1';
      appNode.style.transition = 'opacity 1.5s ease';

      setTimeout(readStateFromLocalStorage(['appTheme', 'storedTasksList']), 50);
      // in case someone has saved the task list with a running task
      setTimeout(deactivateAll(), 100);
      setTimeout(applyTheme(appTheme.value), 150);

      window.addEventListener('beforeunload', onAppClose);
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
