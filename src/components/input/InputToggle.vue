<template>
  <div class="flex justify-start justify-content-center mb-4">
    <div
      :class="{ 'bg-primary': modelValue, 'bg-secondary': !modelValue }"
      class="position-relative rounded shadow flex-shrink"
    >
      <label
        :for="name"
        :class="{ 'border-primary': modelValue, 'border-dark': !modelValue }"
        class="position-absolute left-0 bg-white border mb-2 rounded shadow"
      >
      <input type="checkbox"
        :id="name"
        :name="name"
        :checked="modelValue"
        @click="$emit('update:modelValue', $event.target.checked)"
      />
      </label>
    </div>
    <span class="d-block ml-4">
        <slot></slot>
    </span>    
  </div>
</template>

<script>
export default {
  name: 'InputToggle',
  props: {
    modelValue: Boolean,
    name: String,
  },
  emits: ["update:modelValue"],
};
</script>
