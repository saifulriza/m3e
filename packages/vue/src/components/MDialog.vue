<template>
  <Teleport to="body">
    <div v-if="modelValue" class="m3e-dialog__scrim" @click="closeOnScrim && close()">
      <div
        ref="dialogRef"
        :class="['m3e-dialog', fullscreen && 'm3e-dialog--fullscreen']"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
        @click.stop
        @keydown="onKeydown"
        v-bind="$attrs"
      >
        <div v-if="$slots.header || title" class="m3e-dialog__header">
          <slot name="header">
            <h2 :id="titleId" class="m3e-dialog__title">{{ title }}</h2>
          </slot>
        </div>
        <div class="m3e-dialog__content">
          <slot />
        </div>
        <div v-if="$slots.actions" class="m3e-dialog__actions">
          <slot name="actions" :close="close" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { defineComponent, ref, watch, nextTick, onBeforeUnmount } from "vue";

let dialogIdCounter = 0;

export default defineComponent({
  name: "MDialog",
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: null },
    fullscreen: Boolean,
    closeOnScrim: { type: Boolean, default: true },
    closeOnEscape: { type: Boolean, default: true },
  },
  emits: ["update:modelValue", "close"],
  setup(props, { emit }) {
    const dialogRef = ref(null);
    const titleId = `m3e-dialog-title-${++dialogIdCounter}`;
    let previousFocus = null;

    const close = () => {
      emit("update:modelValue", false);
      emit("close");
    };

    const getFocusableElements = () => {
      if (!dialogRef.value) return [];
      return Array.from(
        dialogRef.value.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    const onKeydown = (e) => {
      if (props.closeOnEscape && e.key === "Escape") {
        close();
        return;
      }

      if (e.key === "Tab") {
        const focusable = getFocusableElements();
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    watch(
      () => props.modelValue,
      async (open) => {
        if (open) {
          previousFocus = document.activeElement;
          document.body.style.overflow = "hidden";
          await nextTick();
          const focusable = getFocusableElements();
          if (focusable.length > 0) {
            focusable[0].focus();
          } else if (dialogRef.value) {
            dialogRef.value.setAttribute("tabindex", "-1");
            dialogRef.value.focus();
          }
        } else {
          document.body.style.overflow = "";
          if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus();
          }
          previousFocus = null;
        }
      }
    );

    onBeforeUnmount(() => {
      document.body.style.overflow = "";
    });

    return { dialogRef, titleId, close, onKeydown };
  },
});
</script>
