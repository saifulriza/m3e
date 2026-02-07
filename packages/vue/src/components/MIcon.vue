<template>
  <span :class="classes" role="img" :aria-label="ariaLabel" :aria-hidden="!ariaLabel ? 'true' : undefined">{{ name }}</span>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "MIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: "outlined",
      validator: (v) => ["outlined", "rounded", "sharp"].includes(v),
    },
    filled: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: String,
      default: null,
      validator: (v) => v === null || ["low", "medium", "high"].includes(v),
    },
    weight: {
      type: Number,
      default: null,
    },
    opticalSize: {
      type: Number,
      default: null,
    },
    ariaLabel: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const classes = computed(() => [
      "m3e-icon",
      `m3e-icon--${props.variant}`,
      {
        "m3e-icon--filled": props.filled,
        [`m3e-icon--grade-${props.grade}`]: props.grade,
      },
    ]);

    return { classes };
  },
});
</script>
