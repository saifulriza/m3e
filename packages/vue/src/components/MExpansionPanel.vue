<template>
  <div
    :class="['m3e-expansion-panel', modelValue && 'm3e-expansion-panel--expanded', disabled && 'm3e-expansion-panel--disabled']"
    v-bind="$attrs"
  >
    <button
      class="m3e-expansion-panel__header"
      :aria-expanded="modelValue"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="m3e-expansion-panel__title">
        <slot name="header">{{ title }}</slot>
      </span>
      <span v-if="$slots.supporting" class="m3e-expansion-panel__supporting">
        <slot name="supporting" />
      </span>
      <span class="m3e-expansion-panel__icon">
        <slot name="icon">expand_more</slot>
      </span>
    </button>
    <div v-if="modelValue" class="m3e-expansion-panel__content">
      <slot />
    </div>
    <div v-if="modelValue && $slots.actions" class="m3e-expansion-panel__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MExpansionPanel",
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: "" },
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const toggle = () => {
      if (!props.disabled) {
        emit("update:modelValue", !props.modelValue);
      }
    };
    return { toggle };
  },
});
</script>
