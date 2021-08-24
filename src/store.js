import { reactive, computed } from 'vue'

// keep the state object private so that the state can be shared across the diffrent components
const state = reactive({
    storedTasksList: []
});

const localStorage = window.localStorage;

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

    const setStoppedTask = (taskId) => {
        state.storedTasksList.forEach(task => {
            if (task.id === taskId) {
                task.activeTask = false;
            }
        });
    }

    const writeStateToLocalStorage = () => {
        localStorage.setItem('stored-state', JSON.stringify(state));
    }

    const readStateFromLocalStorage = () => {
        const stringifiedStoredState = localStorage.getItem('stored-state');
        const storedState = JSON.parse(stringifiedStoredState);

        if (storedState) {
            Object.keys(state).map(key => {
                if (storedState[key]) {
                    state[key] = storedState[key];
                }
            })
        }
    }

    return {
        addTask,
        removeTask,
        setActiveTask,
        setStoppedTask,
        storedTasksList: getTasksList,
        writeStateToLocalStorage,
        readStateFromLocalStorage
    };
}