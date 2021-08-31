import { reactive, computed } from 'vue'

// keep the state object private so that the state can be shared across the diffrent components
const state = reactive({
    appTheme: 'light',
    storedTasksList: []
});

const localStorage = window.localStorage;

export const useStore = () => {

    // getters
    const getTasksList = computed(() => state.storedTasksList);
    const getAppTheme = computed(() => state.appTheme);
    const getActiveTasks = computed(() => state.storedTasksList.filter(task => task.activeTask));

    // actions
    const addTask = (taskToAdd) => {
        state.storedTasksList.push(taskToAdd);
    }

    const deactivateAll = () => {
        state.storedTasksList.forEach(task => {
            task.activeTask = false;
        });
    }

    const editTaskName = (id, newTaskName) => {
        state.storedTasksList.forEach(task => {
            if (task.id === id) {
                task.name = newTaskName;
            }
        });
    }

    const updateTaskTime = (id, updatedTime) => {
        state.storedTasksList.forEach(task => {
            if (task.id === id) {
                task.totalTimeSpent = updatedTime;
            }
        });
    }

    const removeTask = (taskToRemove) => {
        // state.storedTasksList = state.storedTasksList.filter(task => task.id !== taskToRemove.id);
        // writeStateToLocalStorage('storedTasksList');
        const filtered = (source) => source.filter(task => task.id !== taskToRemove.id);
        let savedTasks = JSON.parse(localStorage.getItem('storedTasksList'));
        state.storedTasksList = filtered(state.storedTasksList);
        if (savedTasks.length > 0) {
            writeStateToLocalStorage('storedTasksList', filtered(savedTasks));
        }
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

    const setAppTheme = (theme) => {
        state.appTheme = theme;
        writeStateToLocalStorage('appTheme');
    }

    const writeStateToLocalStorage = (targetKey, update) => {
        if (targetKey) {
            // const currentTarget = targetKey in state ? state[targetKey] : null;
            const currentTarget = update || state[targetKey] || null;
            if (currentTarget) {
                localStorage.setItem(targetKey, JSON.stringify(currentTarget));
            }
        } else {
            Object.keys(state).map(key => {
                localStorage.setItem(key, JSON.stringify(state[key]));
            });
        }
    }

    const readStateFromLocalStorage = (storedKeys) => {
        storedKeys.forEach((storedKey) => {
            const stringifiedStoredState = localStorage.getItem(storedKey);
            const storedState = JSON.parse(stringifiedStoredState);

            if (storedState && storedKey in state) {
                state[storedKey] = storedState;
            }
        });
    }

    return {
        addTask,
        deactivateAll,
        editTaskName,
        updateTaskTime,
        removeTask,
        setActiveTask,
        setStoppedTask,
        setAppTheme,
        readStateFromLocalStorage,
        writeStateToLocalStorage,
        appTheme: getAppTheme,
        storedTasksList: getTasksList,
        activeTasks: getActiveTasks
    }
}