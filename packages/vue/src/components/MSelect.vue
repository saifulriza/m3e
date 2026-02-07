<template>
  <div
    :class="['m3e-select', outlined && 'm3e-select--outlined', disabled && 'm3e-select--disabled', error && 'm3e-select--error']"
    v-bind="$attrs"
  >
    <span v-if="label" class="m3e-select__label">{{ label }}</span>
    <select
      class="m3e-select__input"
      :value="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <slot />
    </select>
    <span class="m3e-select__icon">
      <slot name="icon">arrow_drop_down</slot>
    </span>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MSelect",
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number], default: "" },
    label: { type: String, default: null },
    outlined: Boolean,
    disabled: Boolean,
    error: Boolean,
  },
  emits: ["update:modelValue"],
});
</script>
