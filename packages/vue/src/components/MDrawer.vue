<template>
  <div class="m3e-drawer-container" v-bind="$attrs">
    <aside
      :class="[
        'm3e-drawer-container__drawer',
        modelValue && 'm3e-drawer-container__drawer--open',
        modal && 'm3e-drawer-container__drawer--over',
        end && 'm3e-drawer-container__drawer--end',
      ]"
    >
      <slot name="drawer" />
    </aside>
    <div
      v-if="modal"
      :class="['m3e-drawer-container__scrim', modelValue && 'm3e-drawer-container__scrim--visible']"
      @click="close"
    ></div>
    <main class="m3e-drawer-container__content">
      <slot />
    </main>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MDrawer",
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    modal: Boolean,
    end: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const close = () => emit("update:modelValue", false);
    return { close };
  },
});
</script>
