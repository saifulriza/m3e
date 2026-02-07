<template>
  <div :class="classes" role="combobox" aria-haspopup="listbox" :aria-expanded="open" :aria-owns="listId">
    <div class="m3e-autocomplete__field" @click="openMenu">
      <label v-if="label" :for="inputId" class="m3e-autocomplete__label" :class="{ 'm3e-autocomplete__label--active': open || modelValue }">{{ label }}</label>
      <input
        :id="inputId"
        ref="inputRef"
        class="m3e-autocomplete__input"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-autocomplete="autoActivate ? 'both' : 'list'"
        :aria-controls="listId"
        :aria-activedescendant="activeDescendant"
        autocomplete="off"
        @input="onInput"
        @focus="openMenu"
        @keydown="onKeydown"
      />
      <span v-if="modelValue && clearable" class="m3e-autocomplete__clear" role="button" aria-label="Clear" tabindex="-1" @click.stop="onClear">✕</span>
    </div>
    <ul
      v-show="open"
      :id="listId"
      ref="listRef"
      class="m3e-autocomplete__options"
      role="listbox"
      :aria-label="label || 'Suggestions'"
    >
      <li
        v-for="(option, idx) in filteredOptions"
        :key="option.value ?? option"
        :id="`${listId}-option-${idx}`"
        class="m3e-autocomplete__option"
        :class="{
          'm3e-autocomplete__option--active': idx === activeIndex,
          'm3e-autocomplete__option--selected': isSelected(option),
        }"
        role="option"
        :aria-selected="isSelected(option)"
        @click="selectOption(option)"
        @mouseenter="activeIndex = idx"
      >
        <slot name="option" :option="option">{{ optionLabel(option) }}</slot>
      </li>
      <li v-if="filteredOptions.length === 0" class="m3e-autocomplete__no-results" role="presentation">
        <slot name="no-results">No results found</slot>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

let autocompleteId = 0;

export default defineComponent({
  name: "MAutocomplete",
  props: {
    modelValue: { type: String, default: "" },
    options: { type: Array, default: () => [] },
    label: { type: String, default: null },
    placeholder: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    autoActivate: { type: Boolean, default: false },
    hideSelectionIndicator: { type: Boolean, default: false },
    variant: { type: String, default: "filled", validator: (v) => ["filled", "outlined"].includes(v) },
    optionLabelKey: { type: String, default: "label" },
    optionValueKey: { type: String, default: "value" },
    filterFn: { type: Function, default: null },
  },
  emits: ["update:modelValue", "select", "clear"],
  setup(props, { emit }) {
    const uid = ++autocompleteId;
    const inputId = `m3e-autocomplete-input-${uid}`;
    const listId = `m3e-autocomplete-list-${uid}`;
    const inputRef = ref(null);
    const listRef = ref(null);
    const open = ref(false);
    const activeIndex = ref(-1);
    const activeDescendant = computed(() =>
      activeIndex.value >= 0 ? `${listId}-option-${activeIndex.value}` : undefined
    );

    const classes = computed(() => [
      "m3e-autocomplete",
      `m3e-autocomplete--${props.variant}`,
      {
        "m3e-autocomplete--open": open.value,
        "m3e-autocomplete--disabled": props.disabled,
      },
    ]);

    const optionLabel = (opt) => (typeof opt === "string" ? opt : opt[props.optionLabelKey] || opt);
    const optionValue = (opt) => (typeof opt === "string" ? opt : opt[props.optionValueKey] || opt);
    const isSelected = (opt) => optionValue(opt) === props.modelValue;

    const filteredOptions = computed(() => {
      if (!props.modelValue) return props.options;
      if (props.filterFn) return props.filterFn(props.options, props.modelValue);
      const query = props.modelValue.toLowerCase();
      return props.options.filter((opt) => optionLabel(opt).toLowerCase().includes(query));
    });

    const openMenu = () => {
      if (props.disabled) return;
      open.value = true;
      activeIndex.value = props.autoActivate ? 0 : -1;
    };

    const closeMenu = () => {
      open.value = false;
      activeIndex.value = -1;
    };

    const selectOption = (option) => {
      emit("update:modelValue", optionLabel(option));
      emit("select", option);
      closeMenu();
    };

    const onClear = () => {
      emit("update:modelValue", "");
      emit("clear");
      nextTick(() => inputRef.value?.focus());
    };

    const onInput = (e) => {
      emit("update:modelValue", e.target.value);
      open.value = true;
      activeIndex.value = props.autoActivate ? 0 : -1;
    };

    const onKeydown = (e) => {
      const count = filteredOptions.value.length;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open.value) openMenu();
          else activeIndex.value = (activeIndex.value + 1) % count;
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open.value) openMenu();
          else activeIndex.value = (activeIndex.value - 1 + count) % count;
          break;
        case "Enter":
          e.preventDefault();
          if (open.value && activeIndex.value >= 0) selectOption(filteredOptions.value[activeIndex.value]);
          break;
        case "Escape":
          e.preventDefault();
          closeMenu();
          break;
        case "Home":
          if (open.value) { e.preventDefault(); activeIndex.value = 0; }
          break;
        case "End":
          if (open.value) { e.preventDefault(); activeIndex.value = count - 1; }
          break;
      }
    };

    const onClickOutside = (e) => {
      if (!inputRef.value?.closest(".m3e-autocomplete")?.contains(e.target)) closeMenu();
    };

    onMounted(() => document.addEventListener("click", onClickOutside));
    onBeforeUnmount(() => document.removeEventListener("click", onClickOutside));

    watch(activeIndex, (idx) => {
      if (idx >= 0 && listRef.value) {
        const el = listRef.value.children[idx];
        el?.scrollIntoView?.({ block: "nearest" });
      }
    });

    return {
      inputId, listId, inputRef, listRef, open, activeIndex, activeDescendant,
      classes, filteredOptions, optionLabel, isSelected,
      openMenu, selectOption, onClear, onInput, onKeydown,
    };
  },
});
</script>
