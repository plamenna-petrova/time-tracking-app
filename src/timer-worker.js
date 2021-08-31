onmessage = (message) => {
    let increment;
    let total = message.data.total;

    increment = setInterval(() => {
        total++;
        postMessage(total);
    }, 1000);
}