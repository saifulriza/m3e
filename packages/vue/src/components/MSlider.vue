<template>
  <div class="m3e-slider" v-bind="$attrs">
    <input
      class="m3e-slider__input"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      :style="trackStyle"
      @input="$emit('update:modelValue', Number($event.target.value))"
    />
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "MSlider",
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props) {
    const trackStyle = computed(() => {
      const pct = ((props.modelValue - props.min) / (props.max - props.min)) * 100;
      return { "--m3e-slider-progress": `${pct}%` };
    });
    return { trackStyle };
  },
});
</script>
