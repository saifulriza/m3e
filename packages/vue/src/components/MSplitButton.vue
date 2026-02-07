<template>
  <div :class="classes" role="group" :aria-label="ariaLabel">
    <div class="m3e-split-button__primary">
      <slot name="leading-button">
        <button class="m3e-split-button__action" @click="$emit('click', $event)">
          <slot />
        </button>
      </slot>
    </div>
    <button
      class="m3e-split-button__toggle"
      :aria-expanded="open"
      aria-haspopup="menu"
      :aria-label="toggleLabel"
      @click="toggleMenu"
      @keydown.escape="close"
    >
      <slot name="toggle-icon">arrow_drop_down</slot>
    </button>
    <Transition name="m3e-split-button">
      <div v-show="open" class="m3e-split-button__menu" role="menu" ref="menuRef">
        <slot name="menu" />
      </div>
    </Transition>
  </div>
</template>

<script>
import { computed, defineComponent, ref, onMounted, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "MSplitButton",
  props: {
    variant: {
      type: String,
      default: "filled",
      validator: (v) => ["filled", "elevated", "tonal", "outlined"].includes(v),
    },
    size: {
      type: String,
      default: "medium",
      validator: (v) => ["extra-small", "small", "medium", "large", "extra-large"].includes(v),
    },
    open: { type: Boolean, default: false },
    toggleLabel: { type: String, default: "More options" },
    ariaLabel: { type: String, default: "Split button" },
  },
  emits: ["update:open", "click"],
  setup(props, { emit }) {
    const menuRef = ref(null);

    const classes = computed(() => [
      "m3e-split-button",
      `m3e-split-button--${props.variant}`,
      `m3e-split-button--${props.size}`,
      { "m3e-split-button--open": props.open },
    ]);

    const toggleMenu = () => emit("update:open", !props.open);
    const close = () => emit("update:open", false);

    const onClickOutside = (e) => {
      if (props.open && !e.target.closest(".m3e-split-button")) close();
    };

    onMounted(() => document.addEventListener("click", onClickOutside));
    onBeforeUnmount(() => document.removeEventListener("click", onClickOutside));

    return { classes, menuRef, toggleMenu, close };
  },
});
</script>
