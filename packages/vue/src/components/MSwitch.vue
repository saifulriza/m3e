<template>
  <label class="m3e-switch">
    <input
      class="m3e-switch__input"
      type="checkbox"
      role="switch"
      :checked="modelValue"
      :disabled="disabled"
      v-bind="$attrs"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="m3e-switch__track">
      <span class="m3e-switch__thumb"></span>
    </span>
    <span v-if="$slots.default || label" class="m3e-switch__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MSwitch",
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: null },
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
});
</script>
