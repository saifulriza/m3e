<template>
  <nav :class="classes" role="tree" :aria-label="ariaLabel">
    <slot />
  </nav>
</template>

<script>
import { computed, defineComponent, provide, ref } from "vue";

export const NAV_MENU_KEY = Symbol("m3e-nav-menu");

export default defineComponent({
  name: "MNavMenu",
  props: {
    ariaLabel: {
      type: String,
      default: "Navigation menu",
    },
  },
  emits: ["select"],
  setup(props, { emit }) {
    const activeItem = ref(null);

    const classes = computed(() => ["m3e-nav-menu"]);

    const select = (value) => {
      activeItem.value = value;
      emit("select", value);
    };

    provide(NAV_MENU_KEY, { activeItem, select });

    return { classes };
  },
});
</script>
