<template>
  <button
    class="btn btn-outline-dark save-tasks-button"
    ref="buttonSave"
    title="Save Tasks List to Local Storage"
    @click="saveCurrentTasksList"
  >
    <transition-group name="inner">
      <span
        v-if="buttonState.text"
        v-html="buttonState.text"
        class="text-gray-800"
      ></span>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-device-floppy"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"
        />
        <circle cx="12" cy="14" r="2" />
        <polyline points="14 4 14 8 8 8 8 4" />
      </svg>
    </transition-group>
  </button>
</template>

<script>
import { reactive, ref } from "vue";
import { useStore } from "../../store.js";

export default {
  name: "ButtonSave",
  setup() {
    const { saveTime, storedTasksList, writeStateToLocalStorage } = useStore();

    const buttonSave = ref();

    const buttonState = reactive({
      enabled: true,
      text: "",
    });

    const saveCurrentTasksList = () => {
      if (saveTime.value) {
        writeStateToLocalStorage("storedTasksList");
        writeStateToLocalStorage("tasksListTotal");
      } else {
        let copy = JSON.stringify(storedTasksList.value);
        let template = JSON.parse(copy);
        template.map((task) => {
          task.taskTotal = 0;
          return task;
        });
        writeStateToLocalStorage("storedTasksList", template);
        writeStateToLocalStorage("tasksListTotal", 0);
      }

      buttonSave.value.blur();

      buttonState.enabled = false;
      buttonState.text = 'Task list saved &#10003;';

      setTimeout(() => {
        buttonState.enabled = true;
        buttonState.text = '';
      }, 3000);
    }

    return {
      buttonSave,
      buttonState,
      saveCurrentTasksList,
    };
  },
};
</script>


<style>
</style>