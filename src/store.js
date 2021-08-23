import { reactive, computed } from 'vue'

// keep the state object private so that the state can be shared across the diffrent components
const state = reactive({
    storedTasksList: []
});

export const useStore = () => {

    // getters
    const getTasksList = computed(() => state.storedTasksList);

    // actions
    const addTask = (taskToAdd) => {
        state.storedTasksList.push(taskToAdd);
    }

    const removeTask = (taskToRemove) => {
        state.storedTasksList = state.storedTasksList.filter(task => task.id !== taskToRemove.id);
    }

    const setActiveTask = (taskId) => {
        state.storedTasksList.forEach(task => {
            task.id === taskId ? task.activeTask = true : task.activeTask = false;
        });
    }

    const setPausedTask = (taskId) => {
        state.storedTasksList.forEach(task => {
            if (task.id === taskId) {
                task.activeTask = false;
            }
        });
    }

    return {
        addTask,
        removeTask,
        setActiveTask,
        setPausedTask,
        storedTasksList: getTasksList
    };
}