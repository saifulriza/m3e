<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="itemClasses"
    :href="href || undefined"
    :target="href ? target : undefined"
    :rel="href ? rel : undefined"
    :disabled="!href && disabled"
    :tabindex="disabled ? -1 : tabindex"
    :role="role"
    :aria-disabled="disabled || undefined"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <span class="m3e-fab-menu-item__wrapper">
      <span v-if="$slots.icon || icon" class="m3e-fab-menu-item__icon" aria-hidden="true">
        <slot name="icon">{{ icon }}</slot>
      </span>
      <span class="m3e-fab-menu-item__label">
        <slot>{{ label }}</slot>
      </span>
    </span>
  </component>
</template>

<script>
import { computed, defineComponent, inject } from "vue";

export default defineComponent({
  name: "MFabMenuItem",
  props: {
    label: { type: String, default: "" },
    icon: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    href: { type: String, default: "" },
    target: { type: String, default: "" },
    rel: { type: String, default: "" },
    tabindex: { type: Number, default: -1 },
    role: { type: String, default: "menuitem" },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const closeMenu = inject("fabMenuClose", null);

    const itemClasses = computed(() => [
      "m3e-fab-menu-item",
      { "m3e-fab-menu-item--disabled": props.disabled },
    ]);

    const handleClick = (e) => {
      if (props.disabled) {
        e.preventDefault();
        return;
      }
      emit("click", e);
      if (!e.defaultPrevented && closeMenu) {
        closeMenu(true);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (!props.disabled) {
          e.preventDefault();
          emit("click", e);
          if (closeMenu) closeMenu(true);
        }
      }
    };

    return { itemClasses, handleClick, handleKeyDown };
  },
});
</script>
