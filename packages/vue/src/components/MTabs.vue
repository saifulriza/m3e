<template>
  <div :class="['m3e-tabs', secondary && 'm3e-tabs--secondary']" role="tablist" v-bind="$attrs">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MTabs",
  inheritAttrs: false,
  props: {
    secondary: Boolean,
  },
});
</script>
