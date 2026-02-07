<template>
  <div class="m3e-stepper" :class="[horizontal && 'm3e-stepper--horizontal']" v-bind="$attrs">
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
  },
});
</script>
