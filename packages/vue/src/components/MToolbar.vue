<template>
  <div :class="['m3e-toolbar', vertical && 'm3e-toolbar--vertical', vibrant && 'm3e-toolbar--vibrant', square && 'm3e-toolbar--square']" role="toolbar" :aria-label="ariaLabel" :aria-orientation="vertical ? 'vertical' : 'horizontal'" v-bind="$attrs">
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
    ariaLabel: { type: String, default: null },
  },
});
</script>
