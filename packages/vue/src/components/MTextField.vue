<template>
  <div
    :class="[
      'm3e-form-field',
      outlined && 'm3e-form-field--outlined',
      error && 'm3e-form-field--error',
      disabled && 'm3e-form-field--disabled',
    ]"
    v-bind="$attrs"
  >
    <div class="m3e-form-field__container">
      <span v-if="$slots.prefix" class="m3e-form-field__prefix">
        <slot name="prefix" />
      </span>
      <label v-if="label" class="m3e-form-field__label">{{ label }}</label>
      <input
        class="m3e-form-field__input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <span v-if="$slots.suffix" class="m3e-form-field__suffix">
        <slot name="suffix" />
      </span>
    </div>
    <div v-if="supporting || error || ($slots.supporting)" class="m3e-form-field__supporting">
      <slot name="supporting">
        <span v-if="errorMessage && error">{{ errorMessage }}</span>
        <span v-else-if="supporting">{{ supporting }}</span>
      </slot>
      <span v-if="maxlength" class="m3e-form-field__counter">
        {{ (modelValue || '').length }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MTextField",
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: "" },
    label: { type: String, default: null },
    placeholder: { type: String, default: null },
    type: { type: String, default: "text" },
    supporting: { type: String, default: null },
    errorMessage: { type: String, default: null },
    maxlength: { type: Number, default: null },
    outlined: Boolean,
    error: Boolean,
    disabled: Boolean,
  },
  emits: ["update:modelValue", "focus", "blur"],
});
</script>
