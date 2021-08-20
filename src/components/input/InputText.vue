<template>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control create-new-task-input border border-success"
      placeholder="Enter a fancy task name"
      aria-label="Enter a fancy task name"
    />
</template>

<script>
export default {
  name: "InputText",
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
};
</script>

<style>
   .create-new-task-input {
       margin-right: 20px;
   }
</style>