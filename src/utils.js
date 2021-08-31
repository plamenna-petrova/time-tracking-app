import { useStore } from './store.js'

const { appTheme } = useStore();

export const formatTime = (input) => {

    let hours = input / 3600;
    hours = hours.toString().split('.')[0];

    let minutes = (input / 60) - (hours * 60);
    minutes = minutes.toString().split('.')[0];

    let seconds = input - (minutes * 60) - (hours * 3600);

    return hours > 0 ?
        `${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}` :
        `${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}`;
}

export const applyTheme = (theme) => {
    if (appTheme.value) {
        document.body.setAttribute('data-theme', theme);
    }
}

export const getDate = () => {
    const date = new Date();

    let dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return date.toLocaleString('en-US', dateOptions);
}