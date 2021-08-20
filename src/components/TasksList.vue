<template>
  <h3 class="m-3">Simple Time Tracking App with Vue 3</h3>
  <div
    class="tasks-total-time my-6"
    v-if="storedTasksList.length > 0 || totalTime > 0"
  >
    <h4 class="d-inline text-white bg-dark p-2 mt-3">Total: {{ totalTimeDisplay }}</h4>
  </div>
  <div v-else>
    <h4 class="d-inline text-white bg-dark p-2 mt-3">No time tracked</h4>
  </div>
  <div class="create-new-task">
    <div class="input-group create-new-task-group mt-3 mb-3">
      <InputText v-model="newTask.name" @keyup.enter="createNewTask" />
      <div class="input-group-append">
        <ButtonCreateTask @click="createNewTask" />
      </div>
    </div>
  </div>
  <div class="tasks-container">
    <div class="task-list">
      <Task
        v-for="task in storedTasksList"
        :key="task.id"
        :task="task"
        @reduce:total="updateTotal($event)"
        @update:total="updateTotal"
      />
    </div>
  </div>
</template>

<script>
import ButtonCreateTask from "./button/ButtonCreateTask.vue";
import InputText from "./input/InputText.vue";
import Task from "./Task.vue";

import { computed, reactive, ref } from "vue";
import { useStore } from "../store.js";
import { formatTime } from "../utils.js";

export default {
  name: "TasksList",
  components: {
    ButtonCreateTask,
    InputText,
    Task,
  },
  setup() {
    const { addTask, storedTasksList } = useStore();

    const newTask = reactive({
      id: "",
      name: "",
      activeTask: false,
    });

    const totalTime = ref(0);

    const totalTimeDisplay = computed(() => {
      return formatTime(totalTime.value);
    });

    const createNewTask = () => {
      if (newTask.name) {
        newTask.id = (Math.floor(Math.random() * 1000) + 1000)
          .toString()
          .substring(1);

        addTask({ ...newTask });

        alert("Task successfully created");

        newTask.id = "";
        newTask.name = "";
      } else {
        alert("Please enter a name of the task");
        return;
      }
    }

    const updateTotal = (minutes) => {
      if (minutes) {
        totalTime.value = totalTime.value - minutes;
      } else {
        totalTime.value++;
      }
    }

    return {
      createNewTask,
      storedTasksList,
      newTask,
      totalTime,
      totalTimeDisplay,
      updateTotal,
    }
  },
};
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
