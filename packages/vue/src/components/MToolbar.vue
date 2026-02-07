<template>
  <div :class="['m3e-toolbar', vertical && 'm3e-toolbar--vertical', vibrant && 'm3e-toolbar--vibrant', square && 'm3e-toolbar--square']" v-bind="$attrs">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MToolbar",
  inheritAttrs: false,
  props: {
    vertical: Boolean,
    vibrant: Boolean,
    square: Boolean,
  },
});
</script>
