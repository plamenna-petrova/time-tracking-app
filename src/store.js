import { reactive, readonly } from 'vue'

export const useStore = () => {

    const state = reactive({
        storedTasksList: []
    });

    const addTask = (taskToAdd) => {
        state.storedTasksList.push(taskToAdd);
    }

    const removeTask = (taskToRemove) => {
        state.storedTasksList = state.storedTasksList.filter(task => task.id !== taskToRemove.id);
    }

    return {
        addTask,
        removeTask,
        state: readonly(state)
    };
}