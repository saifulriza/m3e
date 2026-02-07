<template>
  <div :class="classes">
    <button
      class="m3e-fab-menu__trigger"
      :aria-expanded="open"
      aria-haspopup="menu"
      :aria-label="ariaLabel"
      @click="toggle"
      @keydown.escape="close"
    >
      <slot name="trigger">
        <span class="m3e-fab-menu__icon">
          <slot name="icon">add</slot>
        </span>
      </slot>
    </button>
    <Transition name="m3e-fab-menu">
      <div v-show="open" class="m3e-fab-menu__actions" role="menu" ref="actionsRef">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

export default defineComponent({
  name: "MFabMenu",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
      validator: (v) => ["primary", "secondary", "tertiary"].includes(v),
    },
    ariaLabel: {
      type: String,
      default: "Actions menu",
    },
  },
  emits: ["update:open"],
  setup(props, { emit }) {
    const actionsRef = ref(null);

    const classes = computed(() => [
      "m3e-fab-menu",
      `m3e-fab-menu--${props.variant}`,
      { "m3e-fab-menu--open": props.open },
    ]);

    const toggle = () => emit("update:open", !props.open);
    const close = () => emit("update:open", false);

    const onClickOutside = (e) => {
      if (props.open && !e.target.closest(".m3e-fab-menu")) close();
    };

    onMounted(() => document.addEventListener("click", onClickOutside));
    onBeforeUnmount(() => document.removeEventListener("click", onClickOutside));

    // Focus first action when menu opens
    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        nextTick(() => {
          const first = actionsRef.value?.querySelector("button, [tabindex]");
          first?.focus();
        });
      }
    });

    return { classes, actionsRef, toggle, close };
  },
});
</script>
