<template>
  <div
    :class="classes"
    role="option"
    :aria-selected="selected"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @click="onClick"
    @keydown.enter.prevent="onClick"
    @keydown.space.prevent="onClick"
  >
    <span v-if="!hideSelectionIndicator && selected" class="m3e-option__check" aria-hidden="true">check</span>
    <span class="m3e-option__text">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "MOption",
  props: {
    value: { type: [String, Number, Object], default: null },
    label: { type: String, default: "" },
    selected: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    hideSelectionIndicator: { type: Boolean, default: false },
  },
  emits: ["select"],
  setup(props, { emit }) {
    const classes = computed(() => [
      "m3e-option",
      {
        "m3e-option--selected": props.selected,
        "m3e-option--disabled": props.disabled,
      },
    ]);

    const onClick = () => {
      if (!props.disabled) emit("select", props.value);
    };

    return { classes, onClick };
  },
});
</script>
