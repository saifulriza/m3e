<template>
  <div class="m3e-drawer-container" v-bind="$attrs">
    <aside
      ref="drawerRef"
      :class="[
        'm3e-drawer-container__drawer',
        modelValue && 'm3e-drawer-container__drawer--open',
        modal && 'm3e-drawer-container__drawer--over',
        end && 'm3e-drawer-container__drawer--end',
      ]"
      role="navigation"
      :aria-modal="modal && modelValue ? 'true' : undefined"
      :aria-label="ariaLabel"
    >
      <slot name="drawer" />
    </aside>
    <div
      v-if="modal"
      :class="['m3e-drawer-container__scrim', modelValue && 'm3e-drawer-container__scrim--visible']"
      @click="close"
      @keydown.escape="close"
    ></div>
    <main class="m3e-drawer-container__content">
      <slot />
    </main>
  </div>
</template>

<script>
import { defineComponent, ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "MDrawer",
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    modal: Boolean,
    end: Boolean,
    ariaLabel: { type: String, default: "Navigation drawer" },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const drawerRef = ref(null);
    let previousFocus = null;

    const close = () => emit("update:modelValue", false);

    const onKeydown = (e) => {
      if (e.key === "Escape" && props.modelValue && props.modal) {
        close();
      }
    };

    watch(
      () => props.modelValue,
      async (open) => {
        if (open && props.modal) {
          previousFocus = document.activeElement;
          await nextTick();
          if (drawerRef.value) {
            const focusable = drawerRef.value.querySelector(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (focusable) focusable.focus();
          }
        } else if (!open && props.modal && previousFocus) {
          previousFocus.focus();
          previousFocus = null;
        }
      }
    );

    onMounted(() => document.addEventListener("keydown", onKeydown));
    onBeforeUnmount(() => document.removeEventListener("keydown", onKeydown));

    return { drawerRef, close };
  },
});
</script>
