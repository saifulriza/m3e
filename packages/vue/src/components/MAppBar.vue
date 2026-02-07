<template>
  <header :class="['m3e-app-bar', variant && `m3e-app-bar--${variant}`]" role="banner" v-bind="$attrs">
    <div v-if="$slots.leading" class="m3e-app-bar__leading">
      <slot name="leading" />
    </div>
    <div class="m3e-app-bar__title">
      <slot>{{ title }}</slot>
    </div>
    <div v-if="$slots.trailing" class="m3e-app-bar__actions">
      <slot name="trailing" />
    </div>
  </header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MAppBar",
  inheritAttrs: false,
  props: {
    title: { type: String, default: "" },
    variant: {
      type: String,
      default: null,
      validator: (v) => [null, "center", "medium", "large"].includes(v),
    },
  },
});
</script>
