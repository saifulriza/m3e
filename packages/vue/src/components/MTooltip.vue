<template>
  <div class="m3e-tooltip-wrapper" style="position: relative; display: inline-block;">
    <div
      @mouseenter="show"
      @mouseleave="hide"
      @focusin="show"
      @focusout="hide"
    >
      <slot />
    </div>
    <div
      v-if="visible"
      class="m3e-tooltip m3e-tooltip--visible"
      role="tooltip"
    >
      <slot name="content">{{ text }}</slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "MTooltip",
  props: {
    text: { type: String, default: "" },
    delay: { type: Number, default: 300 },
  },
  setup(props) {
    const visible = ref(false);
    const timer = ref(null);

    const show = () => {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => { visible.value = true; }, props.delay);
    };
    const hide = () => {
      clearTimeout(timer.value);
      timer.value = null;
      visible.value = false;
    };

    onBeforeUnmount(() => {
      clearTimeout(timer.value);
    });

    return { visible, show, hide };
  },
});
</script>
