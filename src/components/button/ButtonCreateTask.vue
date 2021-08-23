<template>
    <button class="btn btn-success">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'ButtonCreateTask'
}
</script>

<style>
    .btn-default {
        background: teal;
        color: grey;
        border: transparent;
    }
</style>