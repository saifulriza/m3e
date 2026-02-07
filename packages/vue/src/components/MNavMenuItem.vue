<template>
  <li
    :class="classes"
    role="treeitem"
    :aria-selected="active"
    :aria-expanded="hasChildren ? expanded : undefined"
    tabindex="0"
    @click.stop="onClick"
    @keydown.enter.prevent="onClick"
    @keydown.space.prevent="onClick"
    @keydown.right.prevent="expand"
    @keydown.left.prevent="collapse"
  >
    <div class="m3e-nav-menu__item-content">
      <span v-if="$slots.icon" class="m3e-nav-menu__icon"><slot name="icon" /></span>
      <span class="m3e-nav-menu__label"><slot /></span>
      <span v-if="hasChildren" class="m3e-nav-menu__expand-icon" :class="{ 'm3e-nav-menu__expand-icon--open': expanded }" aria-hidden="true">
        expand_more
      </span>
    </div>
    <ul v-if="hasChildren && expanded" class="m3e-nav-menu__children" role="group">
      <slot name="children" />
    </ul>
  </li>
</template>

<script>
import { computed, defineComponent, inject, ref, useSlots } from "vue";
import { NAV_MENU_KEY } from "./MNavMenu.vue";

export default defineComponent({
  name: "MNavMenuItem",
  props: {
    value: { type: String, default: null },
    active: { type: Boolean, default: false },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const slots = useSlots();
    const expanded = ref(false);
    const navMenu = inject(NAV_MENU_KEY, null);

    const hasChildren = computed(() => !!slots.children);

    const classes = computed(() => [
      "m3e-nav-menu__item",
      {
        "m3e-nav-menu__item--active": props.active || navMenu?.activeItem.value === props.value,
        "m3e-nav-menu__item--expanded": expanded.value,
      },
    ]);

    const onClick = () => {
      if (hasChildren.value) {
        expanded.value = !expanded.value;
      } else {
        navMenu?.select(props.value);
        emit("click", props.value);
      }
    };

    const expand = () => { if (hasChildren.value) expanded.value = true; };
    const collapse = () => { if (hasChildren.value) expanded.value = false; };

    return { classes, expanded, hasChildren, onClick, expand, collapse };
  },
});
</script>
