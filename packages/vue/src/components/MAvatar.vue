<template>
  <div :class="['m3e-avatar', size && `m3e-avatar--${size}`, square && 'm3e-avatar--square']" v-bind="$attrs">
    <img v-if="src" :src="src" :alt="alt" class="m3e-avatar__image" />
    <slot v-else />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MAvatar",
  inheritAttrs: false,
  props: {
    src: { type: String, default: null },
    alt: { type: String, default: "" },
    size: {
      type: String,
      default: null,
      validator: (v) => [null, "small", "large"].includes(v),
    },
    square: Boolean,
  },
});
</script>
