<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "MShape",
  props: {
    name: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const classes = computed(() => [
      "m3e-shape",
      { [`m3e-shape--${props.name}`]: props.name },
    ]);

    return { classes };
  },
});
</script>
