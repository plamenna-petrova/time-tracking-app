import { createApp } from 'vue'
import App from './App.vue'
import ('./index.css');

import 'bootstrap/dist/css/bootstrap.min.css'

import runtime from "serviceworker-webpack-plugin/lib/runtime";

if ('serviceWorker' in navigator) {
    runtime.register();
}


createApp(App).mount('#app')