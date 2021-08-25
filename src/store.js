import { reactive, computed } from 'vue'

// keep the state object private so that the state can be shared across the diffrent components
const state = reactive({
    appTheme: '',
    storedTasksList: []
});

const localStorage = window.localStorage;

export const useStore = () => {

    // getters
    const getTasksList = computed(() => state.storedTasksList);
    const getAppTheme = computed(() => state.appTheme);

    // actions
    const addTask = (taskToAdd) => {
        state.storedTasksList.push(taskToAdd);
    }

    const removeTask = (taskToRemove) => {
        state.storedTasksList = state.storedTasksList.filter(task => task.id !== taskToRemove.id);
        // remove tasks on reload
        writeStateToLocalStorage('storedTasksList');
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

    const writeStateToLocalStorage = (targetKey) => {
        if (targetKey) {
            const currentTarget = targetKey in state ? state[targetKey] : null;
            if (currentTarget) {
                localStorage.setItem(targetKey, JSON.stringify(currentTarget));
            }
        } else {
            Object.keys(state).map(key => {
                localStorage.setItem(key, JSON.stringify(state[key]));
            })
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
        removeTask,
        setActiveTask,
        setStoppedTask,
        setAppTheme,
        readStateFromLocalStorage,
        writeStateToLocalStorage,
        appTheme: getAppTheme,
        storedTasksList: getTasksList
    };
}