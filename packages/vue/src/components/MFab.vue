<template>
  <button
    :class="[
      'm3e-fab',
      size && `m3e-fab--${size}`,
      extended && 'm3e-fab--extended',
      color && `m3e-fab--${color}`,
    ]"
    :aria-label="ariaLabel || (extended ? undefined : label || icon)"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <span class="m3e-fab__icon">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <span v-if="extended && ($slots.default || label)" class="m3e-fab__label">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MFab",
  inheritAttrs: false,
  props: {
    icon: { type: String, default: "add" },
    label: { type: String, default: null },
    ariaLabel: { type: String, default: null },
    size: {
      type: String,
      default: null,
      validator: (v) => [null, "small", "large"].includes(v),
    },
    extended: Boolean,
    color: {
      type: String,
      default: null,
      validator: (v) => [null, "surface", "secondary", "tertiary"].includes(v),
    },
  },
  emits: ["click"],
});
</script>
