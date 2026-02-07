<template>
  <button
    :class="['m3e-tab', active && 'm3e-tab--active']"
    role="tab"
    :aria-selected="active"
    :disabled="disabled"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <span v-if="$slots.icon || icon" class="m3e-tab__icon">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <slot />
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MTab",
  inheritAttrs: false,
  props: {
    active: Boolean,
    icon: { type: String, default: null },
    disabled: Boolean,
  },
  emits: ["click"],
});
</script>
