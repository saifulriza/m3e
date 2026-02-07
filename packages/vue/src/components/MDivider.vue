<template>
  <hr :class="['m3e-divider', inset && 'm3e-divider--inset']" v-bind="$attrs" />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MDivider",
  inheritAttrs: false,
  props: {
    inset: Boolean,
  },
});
</script>
