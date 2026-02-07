<template>
  <nav class="m3e-nav-bar" v-bind="$attrs">
    <slot />
  </nav>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MNavBar",
  inheritAttrs: false,
});
</script>
