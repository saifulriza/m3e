<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "MHeading",
  props: {
    variant: {
      type: String,
      default: "headline",
      validator: (v) => ["display", "headline", "title", "label"].includes(v),
    },
    size: {
      type: String,
      default: "medium",
      validator: (v) => ["large", "medium", "small"].includes(v),
    },
    level: {
      type: Number,
      default: null,
      validator: (v) => v === null || (v >= 1 && v <= 6),
    },
    emphasized: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const tag = computed(() => {
      if (props.level) return `h${props.level}`;
      const defaults = { display: "h1", headline: "h2", title: "h3", label: "h4" };
      return defaults[props.variant] || "h2";
    });

    const classes = computed(() => [
      "m3e-heading",
      `m3e-heading--${props.variant}-${props.size}`,
      { "m3e-heading--emphasized": props.emphasized },
    ]);

    return { tag, classes };
  },
});
</script>
