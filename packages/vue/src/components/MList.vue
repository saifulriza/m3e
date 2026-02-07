<template>
  <ul class="m3e-list" v-bind="$attrs">
    <slot />
  </ul>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MList",
  inheritAttrs: false,
});
</script>
