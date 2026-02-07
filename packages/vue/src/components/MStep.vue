<template>
  <div
    :class="[
      'm3e-stepper__step',
      active && 'm3e-stepper__step--active',
      completed && 'm3e-stepper__step--completed',
      error && 'm3e-stepper__step--error',
      disabled && 'm3e-stepper__step--disabled',
    ]"
    :aria-current="active ? 'step' : undefined"
  >
    <button
      class="m3e-stepper__header"
      :disabled="disabled"
      :aria-label="`Step ${step}: ${label}`"
      @click="$emit('click')"
    >
      <span class="m3e-stepper__icon" aria-hidden="true">
        <slot name="icon">{{ completed ? '✓' : step }}</slot>
      </span>
      <span class="m3e-stepper__label">
        <slot name="label">{{ label }}</slot>
        <span v-if="optional" class="m3e-stepper__label-optional">Optional</span>
      </span>
    </button>
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
