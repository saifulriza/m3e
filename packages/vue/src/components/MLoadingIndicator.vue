<template>
  <div
    :class="['m3e-loading-indicator', size && `m3e-loading-indicator--${size}`, contained && 'm3e-loading-indicator--contained']"
    role="status"
    aria-live="polite"
    :aria-label="ariaLabel"
    v-bind="$attrs"
  >
    <div class="m3e-loading-indicator__spinner" aria-hidden="true"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MLoadingIndicator",
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: null,
      validator: (v) => [null, "small", "large"].includes(v),
    },
    contained: Boolean,
    ariaLabel: { type: String, default: "Loading" },
  },
});
</script>
