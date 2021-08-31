import { createApp } from 'vue'
import App from './App.vue'
import ('./index.css')
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'

import runtime from "serviceworker-webpack-plugin/lib/runtime";

if ('serviceWorker' in navigator) {
    runtime.register();
}

const app = createApp(App).use(router);

let escHandler = null;
let handleOutsideClick = null;

app.directive('click-outside', {
    beforeMount(element, binding) {
        handleOutsideClick = (event) => {
            event.stopPropagation();
            if (!element.contains(event.target) && !event.target.classList.contains('click-outside-ignore')) {
                binding.value();
            }
        }
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
    },
    beforeUnmount() {
        document.removeEventListener('click', handleOutsideClick);
        document.removeEventListener('touchstart', handleOutsideClick);
    }
});

app.directive('esc', {
    beforeMount(element, binding) {
        escHandler = (event) => {
            if (event.key == 'Escape' || event.key == 'Esc' || event.keyCode == 27) {
                binding.value();
            }
        }
        document.addEventListener('keydown', escHandler);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', escHandler);
    }
});

app.mount('#app');

// createApp(App).use(router).mount('#app');