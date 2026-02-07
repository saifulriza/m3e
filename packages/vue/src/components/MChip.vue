<template>
  <button
    :class="[
      'm3e-chip',
      selected && 'm3e-chip--selected',
      elevated && 'm3e-chip--elevated',
    ]"
    :disabled="disabled"
    v-bind="$attrs"
    @click="onClick"
  >
    <span v-if="$slots.icon" class="m3e-chip__icon">
      <slot name="icon" />
    </span>
    <slot />
    <span
      v-if="removable"
      class="m3e-chip__remove"
      role="button"
      aria-label="Remove"
      @click.stop="$emit('remove')"
    >&times;</span>
  </button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MChip",
  inheritAttrs: false,
  props: {
    selected: Boolean,
    elevated: Boolean,
    removable: Boolean,
    disabled: Boolean,
  },
  emits: ["click", "remove"],
  setup(props, { emit }) {
    const onClick = (e) => emit("click", e);
    return { onClick };
  },
});
</script>
