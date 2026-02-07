<template>
  <div :class="['m3e-segmented-button']" role="group" :aria-label="ariaLabel" v-bind="$attrs">
    <button
      v-for="(option, i) in options"
      :key="option.value ?? i"
      :class="[
        'm3e-segmented-button__segment',
        isSelected(option.value) && 'm3e-segmented-button__segment--selected',
      ]"
      :disabled="option.disabled"
      :aria-pressed="isSelected(option.value)"
      @click="select(option.value)"
    >
      <span v-if="option.icon" class="m3e-segmented-button__segment__icon">{{ option.icon }}</span>
      <span class="m3e-segmented-button__label">{{ option.label }}</span>
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MSegmentedButton",
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number, Array], default: null },
    options: {
      type: Array,
      required: true,
      // [{value, label, icon?, disabled?}]
    },
    multiple: Boolean,
    ariaLabel: { type: String, default: null },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isSelected = (value) => {
      if (props.multiple && Array.isArray(props.modelValue)) {
        return props.modelValue.includes(value);
      }
      return props.modelValue === value;
    };

    const select = (value) => {
      if (props.multiple) {
        const arr = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
        const idx = arr.indexOf(value);
        if (idx >= 0) arr.splice(idx, 1);
        else arr.push(value);
        emit("update:modelValue", arr);
      } else {
        emit("update:modelValue", value);
      }
    };

    return { isSelected, select };
  },
});
</script>
