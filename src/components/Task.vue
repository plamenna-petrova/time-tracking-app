<template>
    <div class="tasks-to-remove-list">
        <p>{{task.id}} - {{task.name}}</p>
        <button @click="$emit('remove:task', task)">&times;</button>
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