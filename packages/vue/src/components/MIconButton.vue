<template>
  <button
    :class="[
      'm3e-icon-button',
      variant && `m3e-icon-button--${variant}`,
      toggle && 'm3e-icon-button--toggle',
      toggled && 'm3e-icon-button--toggled',
    ]"
    :disabled="disabled"
    :aria-pressed="toggle ? toggled : undefined"
    :aria-label="ariaLabel"
    v-bind="$attrs"
    @click="onClick"
  >
    <span class="m3e-icon-button__icon">
      <slot>{{ icon }}</slot>
    </span>
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MIconButton",
  inheritAttrs: false,
  props: {
    icon: { type: String, default: null },
    ariaLabel: { type: String, default: null },
    variant: {
      type: String,
      default: null,
      validator: (v) => [null, "filled", "tonal", "outlined"].includes(v),
    },
    toggle: Boolean,
    toggled: Boolean,
    disabled: Boolean,
  },
  emits: ["click", "update:toggled"],
  setup(props, { emit }) {
    const onClick = (e) => {
      if (props.toggle) {
        emit("update:toggled", !props.toggled);
      }
      emit("click", e);
    };
    return { onClick };
  },
});
</script>
