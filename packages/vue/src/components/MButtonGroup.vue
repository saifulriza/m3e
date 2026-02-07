<template>
  <div :class="classes" role="group" :aria-label="ariaLabel">
    <slot />
  </div>
</template>

<script>
import { computed, defineComponent, provide, ref, readonly } from "vue";

export const BUTTON_GROUP_KEY = Symbol("m3e-button-group");

export default defineComponent({
  name: "MButtonGroup",
  props: {
    variant: {
      type: String,
      default: "standard",
      validator: (v) => ["standard", "connected"].includes(v),
    },
    size: {
      type: String,
      default: "medium",
      validator: (v) => ["extra-small", "small", "medium", "large", "extra-large"].includes(v),
    },
    multi: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Array],
      default: null,
    },
    ariaLabel: {
      type: String,
      default: "Button group",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const classes = computed(() => [
      "m3e-button-group",
      `m3e-button-group--${props.variant}`,
      `m3e-button-group--${props.size}`,
      { "m3e-button-group--multi": props.multi },
    ]);

    const selected = computed(() => {
      if (props.multi) return Array.isArray(props.modelValue) ? props.modelValue : [];
      return props.modelValue;
    });

    const toggle = (value) => {
      if (props.multi) {
        const current = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
        const idx = current.indexOf(value);
        if (idx >= 0) current.splice(idx, 1);
        else current.push(value);
        emit("update:modelValue", current);
      } else {
        emit("update:modelValue", props.modelValue === value ? null : value);
      }
    };

    const isSelected = (value) => {
      if (props.multi) return Array.isArray(props.modelValue) && props.modelValue.includes(value);
      return props.modelValue === value;
    };

    provide(BUTTON_GROUP_KEY, { selected: readonly(selected), toggle, isSelected });

    return { classes };
  },
});
</script>
