<template>
  <div
    class="m3e-stepper"
    :class="[horizontal && 'm3e-stepper--horizontal']"
    role="group"
    :aria-label="ariaLabel"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MStepper",
  inheritAttrs: false,
  props: {
    horizontal: Boolean,
    ariaLabel: { type: String, default: "Progress steps" },
  },
});
</script>
