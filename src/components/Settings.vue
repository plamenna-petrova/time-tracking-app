<template>
  <div class="settings" v-click-outside="toggleSettings" v-esc="toggleSettings">
    <div class="d-flex justify-content-between mb-5">
      <h2 class="text-dark font-weight-bold text-center ml-2">Settings</h2>
      <button
        class="btn btn-outline-primary"
        title="Close Settings Menu"
        @click="toggleSettings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-x"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
    <div>
      <InputToggle v-model="settings.autoStart" name="autoStart" @update:modelValue="updateSettings('autoStart', $event)">Automatically start tracking for new tasks</InputToggle>
      <InputToggle v-model="settings.saveTaskTotal" name="save-total" @update:modelValue="updateSettings('saveTaskTotal', $event)">Save tasks with time tracked</InputToggle>
      <InputToggle v-model="settings.darkTheme" name="theme" @update:modelValue="updateSettings('darkTheme', $event)">Use dark theme</InputToggle>
      <button class="text-success" @click="saveSettings">Save Settings</button>
    </div>
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
    const { appTheme, autoStart, saveTime, setState, toggleSettings } =
      useStore();

    const settings = reactive({
      autoStart: autoStart.value,
      darkTheme: appTheme.value === "dark" ? true : false,
      saveTaskTotal: saveTime.value,
    });

    const saveSettings = () => {
      let theme = settings.darkTheme ? "dark" : "light";

      setState('autoStart', settings.autoStart, true);
      setState('saveTime', settings.saveTaskTotal, true);
      setState('appTheme', theme, true);

      toggleSettings();
      applyTheme(appTheme.value);
    };

    const updateSettings = (key, value) => {
      settings[key] = value;
    };

    return {
      saveSettings,
      settings,
      toggleSettings,
      updateSettings,
    };
  },
};
</script>

<style>
</style>