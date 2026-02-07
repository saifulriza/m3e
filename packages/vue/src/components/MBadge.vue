<template>
  <div :class="classes" v-bind="$attrs">
    <slot>{{ text }}</slot>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "MBadge",
  inheritAttrs: false,
  props: {
    text: { type: [String, Number], default: null },
    dot: Boolean,
    large: Boolean,
  },
  setup(props) {
    const classes = computed(() => [
      "m3e-badge",
      props.dot && "m3e-badge--dot",
      props.large && "m3e-badge--large",
    ]);
    return { classes };
  },
});
</script>
