<template>
  <nav :class="classes" role="navigation" :aria-label="ariaLabel">
    <div class="m3e-nav-rail__header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="m3e-nav-rail__items" role="list">
      <slot />
    </div>
    <div class="m3e-nav-rail__footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </nav>
</template>

<script>
import { computed, defineComponent, provide, ref } from "vue";

export const NAV_RAIL_KEY = Symbol("m3e-nav-rail");

export default defineComponent({
  name: "MNavRail",
  props: {
    mode: {
      type: String,
      default: "auto",
      validator: (v) => ["auto", "compact", "expanded"].includes(v),
    },
    modelValue: {
      type: String,
      default: null,
    },
    ariaLabel: {
      type: String,
      default: "Navigation rail",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const classes = computed(() => [
      "m3e-nav-rail",
      `m3e-nav-rail--${props.mode}`,
    ]);

    const select = (value) => emit("update:modelValue", value);

    provide(NAV_RAIL_KEY, {
      activeValue: computed(() => props.modelValue),
      select,
    });

    return { classes };
  },
});
</script>
