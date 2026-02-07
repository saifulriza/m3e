<template>
  <div :class="['m3e-card', `m3e-card--${variant}`]" v-bind="$attrs">
    <div v-if="$slots.media" class="m3e-card__media">
      <slot name="media" />
    </div>
    <div v-if="$slots.default" class="m3e-card__content">
      <slot />
    </div>
    <div v-if="$slots.actions" class="m3e-card__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MCard",
  inheritAttrs: false,
  props: {
    variant: {
      type: String,
      default: "elevated",
      validator: (v) => ["elevated", "filled", "outlined"].includes(v),
    },
  },
});
</script>
