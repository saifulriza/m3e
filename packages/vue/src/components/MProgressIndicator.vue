<template>
  <div
    :class="['m3e-progress-indicator', `m3e-progress-indicator--${type}`]"
    role="progressbar"
    :aria-valuenow="indeterminate ? undefined : value"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-label="ariaLabel"
    v-bind="$attrs"
  >
    <div
      v-if="type === 'linear'"
      class="m3e-progress-indicator__bar"
      :class="[indeterminate && 'm3e-progress-indicator__bar--indeterminate']"
      :style="!indeterminate ? { width: `${value}%` } : {}"
    ></div>
    <svg v-else-if="type === 'circular'" class="m3e-progress-indicator__circle" viewBox="0 0 48 48" aria-hidden="true">
      <circle
        class="m3e-progress-indicator__track"
        cx="24" cy="24" r="20"
        fill="none"
        stroke-width="4"
      />
      <circle
        class="m3e-progress-indicator__indicator"
        cx="24" cy="24" r="20"
        fill="none"
        stroke-width="4"
        :stroke-dasharray="indeterminate ? '80 126' : `${(value / 100) * 126} 126`"
        :class="[indeterminate && 'm3e-progress-indicator__indicator--indeterminate']"
      />
    </svg>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MProgressIndicator",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "linear",
      validator: (v) => ["linear", "circular"].includes(v),
    },
    value: { type: Number, default: 0 },
    indeterminate: Boolean,
    ariaLabel: { type: String, default: "Progress" },
  },
});
</script>
