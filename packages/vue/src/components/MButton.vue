<template>
  <button
    :class="classes"
    :disabled="disabled || loading"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="m3e-button__icon m3e-loading-indicator m3e-loading-indicator--small">
      <span class="m3e-loading-indicator__spinner"></span>
    </span>
    <span v-else-if="$slots.icon || icon" class="m3e-button__icon">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <slot />
  </button>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "MButton",
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: "filled",
      validator: (v) =>
        ["filled", "tonal", "elevated", "outlined", "text"].includes(v),
    },
    size: {
      type: String,
      default: null,
      validator: (v) =>
        [null, "extra-small", "small", "medium", "large", "extra-large"].includes(v),
    },
    square: Boolean,
    disabled: Boolean,
    loading: Boolean,
    icon: { type: String, default: null },
  },
  emits: ["click"],
  setup(props) {
    const classes = computed(() => [
      "m3e-button",
      `m3e-button--${props.variant}`,
      props.size && `m3e-button--${props.size}`,
      props.square && "m3e-button--square",
    ]);
    return { classes };
  },
});
</script>
