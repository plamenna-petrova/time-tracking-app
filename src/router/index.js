import { createRouter, createWebHistory } from 'vue-router';

import TasksList from '../components/TasksList.vue'

const routes = [{
    path: '/',
    name: 'TasksList',
    component: TasksList
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router