<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="['m3e-nav-bar__item', active && 'm3e-nav-bar__item--active']"
    :href="href"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <span class="m3e-nav-bar__icon">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <span class="m3e-nav-bar__label">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MNavBarItem",
  inheritAttrs: false,
  props: {
    icon: { type: String, default: null },
    label: { type: String, default: null },
    active: Boolean,
    href: { type: String, default: null },
  },
  emits: ["click"],
});
</script>
