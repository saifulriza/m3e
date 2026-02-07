<template>
  <label class="m3e-radio">
    <input
      class="m3e-radio__input"
      type="radio"
      :checked="modelValue === value"
      :value="value"
      :name="name"
      :disabled="disabled"
      v-bind="$attrs"
      @change="$emit('update:modelValue', value)"
    />
    <span class="m3e-radio__indicator"></span>
    <span v-if="$slots.default || label" class="m3e-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MRadio",
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number, Boolean], default: null },
    value: { type: [String, Number, Boolean], required: true },
    name: { type: String, default: null },
    label: { type: String, default: null },
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
});
</script>
