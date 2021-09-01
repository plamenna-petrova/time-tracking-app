import { reactive, computed } from 'vue'

// keep the state object private so that the state can be shared across the diffrent components
const state = reactive({
    appTheme: 'light',
    storedTasksList: [],
    autoStart: false,
    saveTime: false,
    showSettings: false,
    tasksListTotal: 0
});

//const isBoolean = value => 'boolean' === typeof value

const localStorage = window.localStorage;

export const useStore = () => {

    // getters
    const getTasksList = computed(() => state.storedTasksList);
    const getAppTheme = computed(() => state.appTheme);
    const getActiveTasks = computed(() => state.storedTasksList.filter(task => task.activeTask));
    const getAutoStart = computed(() => state.autoStart);
    const getSaveTime = computed(() => state.saveTime);
    const getSettingsDisplay = computed(() => state.showSettings);
    const getTasksListTotal = computed(() => state.tasksListTotal);

    // actions
    const addTask = (taskToAdd) => {
        state.storedTasksList.push(taskToAdd);
    }

    const deactivateAll = () => {
        state.storedTasksList.forEach(task => {
            task.activeTask = false;
        });
    }

    const removeTask = (taskToRemove) => {
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

    const setState = (key, value, ls) => {
        state[key] = value;
        if (ls) {
            // save key to local storage as well
            writeStateToLocalStorage(key, value);
        }
    }

    const resetSavedTime = () => {
        state.storedTasksList.forEach(task => {
            task.taskTotalTime = 0;
        });
        state.tasksListTotal = 0;
        writeStateToLocalStorage('storedTasksList');
        writeStateToLocalStorage('tasksListTotal');
    }

    const toggleSettings = () => { state.showSettings = !state.showSettings }

    const updateTask = (id, key, value) => {
        state.storedTasksList.forEach(task => {
            if (task.id === id) {
                task[key] = value;
            }
        });
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
        updateTask,
        removeTask,
        setActiveTask,
        setStoppedTask,
        setState,
        resetSavedTime,
        toggleSettings,
        readStateFromLocalStorage,
        writeStateToLocalStorage,
        appTheme: getAppTheme,
        storedTasksList: getTasksList,
        activeTasks: getActiveTasks,
        autoStart: getAutoStart,
        saveTime: getSaveTime,
        settingsShown: getSettingsDisplay,
        tasksListTotal: getTasksListTotal
    }
}