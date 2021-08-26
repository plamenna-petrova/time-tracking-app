<template>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-control create-new-task-input border border-success"
      :placeholder="placeholder"
      aria-label="Enter a fancy task name"
      v-focus="true"
    />
</template>

<script>
export default {
  name: "InputText",
  props: {
    modelValue: String,
    placeholder: String
  },
  emits: ["update:modelValue"],
  directives: {
      focus: {
        mounted(element, binding) {
          if (binding.value) {
            element.focus();
          }
        }
      }
  }
};
</script>

<style>
   .create-new-task-input {
       margin-right: 20px;
   }
</style>