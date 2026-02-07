<template>
  <div ref="anchorRef" class="m3e-menu-anchor" style="position: relative; display: inline-block;">
    <div @click="toggle" @keydown.down.prevent="openMenu" @keydown.enter.prevent="toggle" @keydown.space.prevent="toggle">
      <slot name="activator" :open="modelValue" :toggle="toggle" />
    </div>
    <div
      v-if="modelValue"
      ref="menuRef"
      :class="['m3e-menu', 'm3e-menu--open']"
      role="menu"
      tabindex="-1"
      @keydown="onMenuKeydown"
      v-bind="$attrs"
    >
      <slot :close="close" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "MMenu",
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    closeOnClick: { type: Boolean, default: true },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const anchorRef = ref(null);
    const menuRef = ref(null);

    const toggle = () => emit("update:modelValue", !props.modelValue);
    const openMenu = () => emit("update:modelValue", true);
    const close = () => emit("update:modelValue", false);

    const getMenuItems = () => {
      if (!menuRef.value) return [];
      return Array.from(
        menuRef.value.querySelectorAll('[role="menuitem"], .m3e-menu__item:not([aria-disabled="true"])')
      );
    };

    const onMenuKeydown = (e) => {
      const items = getMenuItems();
      const current = items.indexOf(document.activeElement);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (items.length > 0) {
            items[current < items.length - 1 ? current + 1 : 0].focus();
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (items.length > 0) {
            items[current > 0 ? current - 1 : items.length - 1].focus();
          }
          break;
        case "Home":
          e.preventDefault();
          if (items.length > 0) items[0].focus();
          break;
        case "End":
          e.preventDefault();
          if (items.length > 0) items[items.length - 1].focus();
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "Tab":
          close();
          break;
      }
    };

    const onClickOutside = (e) => {
      if (props.modelValue && props.closeOnClick && anchorRef.value && !anchorRef.value.contains(e.target)) {
        close();
      }
    };

    watch(
      () => props.modelValue,
      async (isOpen) => {
        if (isOpen) {
          await nextTick();
          const items = getMenuItems();
          if (items.length > 0) {
            items[0].focus();
          } else if (menuRef.value) {
            menuRef.value.focus();
          }
        }
      }
    );

    onMounted(() => {
      document.addEventListener("click", onClickOutside);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", onClickOutside);
    });

    return { anchorRef, menuRef, toggle, openMenu, close, onMenuKeydown };
  },
});
</script>
