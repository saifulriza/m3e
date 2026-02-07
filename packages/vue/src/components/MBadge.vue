<template>
  <div :class="classes" :aria-label="badgeAriaLabel" v-bind="$attrs">
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
    const badgeAriaLabel = computed(() => {
      if (props.dot) return "New notification";
      if (props.text != null) return `${props.text} notifications`;
      return undefined;
    });
    return { classes, badgeAriaLabel };
  },
});
</script>
