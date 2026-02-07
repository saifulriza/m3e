<template>
  <div
    :class="[
      'm3e-stepper__step',
      active && 'm3e-stepper__step--active',
      completed && 'm3e-stepper__step--completed',
      error && 'm3e-stepper__step--error',
      disabled && 'm3e-stepper__step--disabled',
    ]"
  >
    <div class="m3e-stepper__header" @click="$emit('click')">
      <span class="m3e-stepper__icon">
        <slot name="icon">{{ completed ? '✓' : step }}</slot>
      </span>
      <span class="m3e-stepper__label">
        <slot name="label">{{ label }}</slot>
        <span v-if="optional" class="m3e-stepper__label-optional">Optional</span>
      </span>
    </div>
    <div v-if="active" class="m3e-stepper__content">
      <slot />
    </div>
    <div v-if="active && $slots.actions" class="m3e-stepper__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MStep",
  props: {
    step: { type: [String, Number], default: "" },
    label: { type: String, default: "" },
    active: Boolean,
    completed: Boolean,
    error: Boolean,
    optional: Boolean,
    disabled: Boolean,
  },
  emits: ["click"],
});
</script>
