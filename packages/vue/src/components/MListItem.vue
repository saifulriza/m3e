<template>
  <li
    :class="['m3e-list__item', interactive && 'm3e-list__item--interactive']"
    :tabindex="interactive ? 0 : undefined"
    :role="interactive ? 'option' : undefined"
    :aria-selected="interactive && selected ? 'true' : undefined"
    v-bind="$attrs"
    @click="$emit('click', $event)"
    @keydown.enter="$emit('click', $event)"
    @keydown.space.prevent="$emit('click', $event)"
  >
    <span v-if="$slots.leading" class="m3e-list__item-leading">
      <slot name="leading" />
    </span>
    <span class="m3e-list__item-content">
      <span class="m3e-list__item-headline">
        <slot>{{ headline }}</slot>
      </span>
      <span v-if="supporting" class="m3e-list__item-supporting">{{ supporting }}</span>
    </span>
    <span v-if="$slots.trailing || trailing" class="m3e-list__item-trailing">
      <slot name="trailing">{{ trailing }}</slot>
    </span>
  </li>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MListItem",
  inheritAttrs: false,
  props: {
    headline: { type: String, default: "" },
    supporting: { type: String, default: null },
    trailing: { type: String, default: null },
    interactive: Boolean,
    selected: Boolean,
  },
  emits: ["click"],
});
</script>
