<template>
  <div class="m3e-menu-anchor" style="position: relative; display: inline-block;">
    <div @click="toggle">
      <slot name="activator" :open="modelValue" :toggle="toggle" />
    </div>
    <div
      v-if="modelValue"
      :class="['m3e-menu', 'm3e-menu--open']"
      role="menu"
      v-bind="$attrs"
    >
      <slot :close="close" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "MMenu",
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    closeOnClick: { type: Boolean, default: true },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const toggle = () => emit("update:modelValue", !props.modelValue);
    const close = () => emit("update:modelValue", false);

    const onClickOutside = (e) => {
      if (props.modelValue && props.closeOnClick) {
        close();
      }
    };

    onMounted(() => {
      document.addEventListener("click", onClickOutside, { capture: true });
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", onClickOutside, { capture: true });
    });

    return { toggle, close };
  },
});
</script>
