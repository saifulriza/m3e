<template>
  <label :class="['m3e-checkbox', error && 'm3e-checkbox--error']">
    <input
      class="m3e-checkbox__input"
      type="checkbox"
      :checked="modelValue"
      :indeterminate="indeterminate"
      :disabled="disabled"
      v-bind="$attrs"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="m3e-checkbox__indicator"></span>
    <span v-if="$slots.default || label" class="m3e-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MCheckbox",
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: null },
    disabled: Boolean,
    indeterminate: Boolean,
    error: Boolean,
  },
  emits: ["update:modelValue"],
});
</script>
