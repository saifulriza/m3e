<template>
  <a
    :class="classes"
    role="listitem"
    :aria-current="isActive ? 'page' : undefined"
    :tabindex="0"
    @click="onClick"
    @keydown.enter.prevent="onClick"
    @keydown.space.prevent="onClick"
  >
    <span v-if="$slots.icon" class="m3e-nav-rail__item-icon"><slot name="icon" /></span>
    <span class="m3e-nav-rail__item-label"><slot /></span>
  </a>
</template>

<script>
import { computed, defineComponent, inject } from "vue";
import { NAV_RAIL_KEY } from "./MNavRail.vue";

export default defineComponent({
  name: "MNavRailItem",
  props: {
    value: { type: String, required: true },
    active: { type: Boolean, default: false },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const navRail = inject(NAV_RAIL_KEY, null);

    const isActive = computed(() => props.active || navRail?.activeValue.value === props.value);

    const classes = computed(() => [
      "m3e-nav-rail__item",
      { "m3e-nav-rail__item--active": isActive.value },
    ]);

    const onClick = () => {
      navRail?.select(props.value);
      emit("click", props.value);
    };

    return { classes, isActive, onClick };
  },
});
</script>
