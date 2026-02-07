<template>
  <Teleport to="body">
    <div v-if="modelValue" class="m3e-dialog__scrim" @click="closeOnScrim && close()">
      <div
        :class="['m3e-dialog', fullscreen && 'm3e-dialog--fullscreen']"
        role="dialog"
        aria-modal="true"
        @click.stop
        v-bind="$attrs"
      >
        <div v-if="$slots.header || title" class="m3e-dialog__header">
          <slot name="header">
            <h2 class="m3e-dialog__title">{{ title }}</h2>
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
import { defineComponent, watch, onMounted, onBeforeUnmount } from "vue";

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
    const close = () => {
      emit("update:modelValue", false);
      emit("close");
    };

    const onKeydown = (e) => {
      if (props.closeOnEscape && e.key === "Escape" && props.modelValue) {
        close();
      }
    };

    onMounted(() => document.addEventListener("keydown", onKeydown));
    onBeforeUnmount(() => document.removeEventListener("keydown", onKeydown));

    watch(
      () => props.modelValue,
      (open) => {
        if (open) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      }
    );

    return { close };
  },
});
</script>
