<template>
  <div class="m3e-radio-group" role="radiogroup" v-bind="$attrs">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MRadioGroup",
  inheritAttrs: false,
});
</script>
