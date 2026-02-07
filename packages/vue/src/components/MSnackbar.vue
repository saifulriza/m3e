<template>
  <div
    :class="['m3e-snackbar', modelValue && 'm3e-snackbar--open', multiline && 'm3e-snackbar--multiline']"
    role="status"
    aria-live="polite"
    v-bind="$attrs"
  >
    <span class="m3e-snackbar__text">
      <slot>{{ message }}</slot>
    </span>
    <div v-if="$slots.action || action" class="m3e-snackbar__action">
      <slot name="action">
        <button class="m3e-button m3e-button--text" @click="$emit('action')">
          {{ action }}
        </button>
      </slot>
    </div>
    <button
      v-if="closable"
      class="m3e-snackbar__close m3e-icon-button"
      aria-label="Close"
      @click="close"
    >
      <span class="m3e-icon-button__icon">close</span>
    </button>
  </div>
</template>

<script>
import { defineComponent, watch, ref } from "vue";

export default defineComponent({
  name: "MSnackbar",
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    message: { type: String, default: "" },
    action: { type: String, default: null },
    closable: { type: Boolean, default: true },
    duration: { type: Number, default: 5000 },
    multiline: Boolean,
  },
  emits: ["update:modelValue", "action", "close"],
  setup(props, { emit }) {
    const timer = ref(null);

    const close = () => {
      emit("update:modelValue", false);
      emit("close");
    };

    const startTimer = () => {
      if (props.duration > 0) {
        clearTimeout(timer.value);
        timer.value = setTimeout(close, props.duration);
      }
    };

    watch(
      () => props.modelValue,
      (open) => {
        if (open) startTimer();
        else clearTimeout(timer.value);
      }
    );

    return { close };
  },
});
</script>
