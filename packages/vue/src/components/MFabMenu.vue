<template>
  <div class="m3e-fab-menu-wrapper" ref="wrapperRef">
    <slot name="trigger">
      <button
        class="m3e-fab m3e-fab--large"
        :aria-expanded="String(open)"
        aria-haspopup="menu"
        :aria-label="ariaLabel"
        ref="triggerRef"
        @click.stop="toggle"
        @keydown="handleTriggerKeyDown"
      >
        <span class="m3e-fab__icon">
          <slot name="icon">add</slot>
        </span>
      </button>
    </slot>
    <div
      :class="menuClasses"
      role="menu"
      :aria-label="ariaLabel"
      ref="menuRef"
      @keydown="handleMenuKeyDown"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch, provide, onMounted, onBeforeUnmount, nextTick } from "vue";

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
    const menuRef = ref(null);
    const triggerRef = ref(null);
    const wrapperRef = ref(null);
    const animated = ref(false);

    const menuClasses = computed(() => [
      "m3e-fab-menu",
      `m3e-fab-menu--${props.variant}`,
      {
        "m3e-fab-menu--open": props.open,
        "m3e-fab-menu--animated": animated.value,
      },
    ]);

    const toggle = () => emit("update:open", !props.open);

    const close = (restoreFocus = false) => {
      emit("update:open", false);
      if (restoreFocus) {
        nextTick(() => triggerRef.value?.focus());
      }
    };

    // Provide close function to child MFabMenuItem components
    provide("fabMenuClose", close);

    // Get focusable menu items
    const getItems = () => {
      if (!menuRef.value) return [];
      return [...menuRef.value.querySelectorAll(
        ".m3e-fab-menu-item:not(:disabled):not(.m3e-fab-menu-item--disabled)"
      )];
    };

    // Roving tabindex: directly set tabIndex on DOM elements for keyboard navigation
    // (standard ARIA pattern; direct DOM is needed for cross-component focus control)
    const focusItem = (index) => {
      const items = getItems();
      if (items.length === 0) return;
      const idx = ((index % items.length) + items.length) % items.length;
      items.forEach((el, i) => { el.tabIndex = i === idx ? 0 : -1; });
      items[idx].focus();
    };

    // Keyboard navigation inside menu (Arrow Up/Down, Home/End, Escape, Tab)
    const handleMenuKeyDown = (e) => {
      const items = getItems();
      const current = items.indexOf(document.activeElement);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusItem(current + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          focusItem(current - 1);
          break;
        case "Home":
          e.preventDefault();
          focusItem(0);
          break;
        case "End":
          e.preventDefault();
          focusItem(items.length - 1);
          break;
        case "Escape":
          e.preventDefault();
          close(true);
          break;
        case "Tab":
          close();
          break;
      }
    };

    // Keyboard on trigger (ArrowUp opens and focuses last, ArrowDown opens and focuses first)
    const handleTriggerKeyDown = (e) => {
      if (e.key === "ArrowUp" && !props.open) {
        e.preventDefault();
        emit("update:open", true);
        nextTick(() => {
          const items = getItems();
          if (items.length) focusItem(items.length - 1);
        });
      } else if (e.key === "ArrowDown" && !props.open) {
        e.preventDefault();
        emit("update:open", true);
        nextTick(() => focusItem(0));
      } else if (e.key === "Escape" && props.open) {
        e.preventDefault();
        close(true);
      }
    };

    // Click outside to close
    const onClickOutside = (e) => {
      if (props.open && wrapperRef.value && !wrapperRef.value.contains(e.target)) {
        close();
      }
    };

    // Focus first item when menu opens
    watch(() => props.open, (isOpen) => {
      if (isOpen) {
        nextTick(() => focusItem(0));
      }
    });

    // Enable animation after mount
    onMounted(() => {
      requestAnimationFrame(() => { animated.value = true; });
      document.addEventListener("click", onClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", onClickOutside);
    });

    return {
      menuClasses, menuRef, triggerRef, wrapperRef,
      toggle, close, handleMenuKeyDown, handleTriggerKeyDown,
    };
  },
});
</script>
