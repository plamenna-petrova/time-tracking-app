export const formatTime = (input) => {

    let minutes = input / 60;
    minutes = minutes.toString().split('.')[0];
    let seconds = input - (minutes * 60);

    // formatted time
    return `${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}`
}