<template>
  <div>
    <InputToggle
      v-model="settings.autoStart"
      name="autoStart"
      @update:modelValue="updateSettings('autoStart', $event)"
      >Automatically start tracking for new tasks</InputToggle
    >
    <InputToggle
      v-model="settings.saveTaskTotal"
      name="save-total"
      @update:modelValue="updateSettings('saveTaskTotal', $event)"
      >Save tasks with time tracked</InputToggle
    >
    <InputToggle
      v-model="settings.darkTheme"
      name="theme"
      @update:modelValue="updateSettings('darkTheme', $event)"
      >Use dark theme</InputToggle
    >
    <button class="btn btn-light btn-outline-success mb-5" @click="saveSettings">Save Settings</button>
  </div>
</template>

<script>
import InputToggle from "./input/InputToggle.vue";

import { reactive } from "vue";
import { useStore } from "../store.js";
import { applyTheme } from "../utils.js";

export default {
  name: "Settings",
  components: {
    InputToggle,
  },
  setup() {
    const { appTheme, autoStart, saveTime, setState } =
      useStore();

    const settings = reactive({
      autoStart: autoStart.value,
      darkTheme: appTheme.value === "dark" ? true : false,
      saveTaskTotal: saveTime.value,
    });

    const saveSettings = () => {
      let theme = settings.darkTheme ? "dark" : "light";

      setState("autoStart", settings.autoStart, true);
      setState("saveTime", settings.saveTaskTotal, true);
      setState("appTheme", theme, true);

      applyTheme(appTheme.value);
    };

    const updateSettings = (key, value) => {
      settings[key] = value;
    };

    return {
      saveSettings,
      settings,
      updateSettings,
    };
  },
};
</script>

<style>
.settings {
  border: 2px solid red;
  border-radius: 20px;
  background-color: grey;
  width: calc(100% - 4rem);
}
</style>