<template>
    <div class="tasks-to-remove-list border border-danger m-3 p-3">
        <p class="text-dark">{{task.id}} - {{task.name}}</p>
        <button class="btn btn-danger" @click="$emit('remove:task', task)">&times;</button>
    </div>
</template>

<script>
export default {
    name: 'Task',
    props: {
        task: Object
    },
    emits: ['remove:task']
}
</script>

<style>
    .tasks-to-remove-list {
        position: relative;
        width: 80%;
        right: -50%;
        transform: translateX(-50%);
    }
</style>