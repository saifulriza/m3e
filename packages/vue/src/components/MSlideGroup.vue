<template>
  <div :class="classes" role="group" :aria-label="ariaLabel" :aria-orientation="vertical ? 'vertical' : 'horizontal'">
    <button
      v-if="showPrev"
      class="m3e-slide-group__button m3e-slide-group__button--prev"
      :disabled="disabled"
      :aria-label="previousPageLabel"
      @click="pageStart"
    >
      <slot name="prev-icon">{{ vertical ? 'expand_less' : 'chevron_left' }}</slot>
    </button>
    <div
      ref="containerRef"
      class="m3e-slide-group__content"
      :aria-orientation="vertical ? 'vertical' : 'horizontal'"
      @scroll="onScroll"
    >
      <slot />
    </div>
    <button
      v-if="showNext"
      class="m3e-slide-group__button m3e-slide-group__button--next"
      :disabled="disabled"
      :aria-label="nextPageLabel"
      @click="pageEnd"
    >
      <slot name="next-icon">{{ vertical ? 'expand_more' : 'chevron_right' }}</slot>
    </button>
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from "vue";

export default defineComponent({
  name: "MSlideGroup",
  props: {
    vertical: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    threshold: { type: Number, default: 0 },
    previousPageLabel: { type: String, default: "Previous" },
    nextPageLabel: { type: String, default: "Next" },
    ariaLabel: { type: String, default: "Scrollable content" },
  },
  setup(props) {
    const containerRef = ref(null);
    const showPrev = ref(false);
    const showNext = ref(false);

    const classes = computed(() => [
      "m3e-slide-group",
      {
        "m3e-slide-group--vertical": props.vertical,
        "m3e-slide-group--disabled": props.disabled,
      },
    ]);

    const updatePaging = () => {
      const el = containerRef.value;
      if (!el) return;
      if (props.vertical) {
        showPrev.value = el.scrollTop > props.threshold;
        showNext.value = el.scrollTop + el.clientHeight < el.scrollHeight - props.threshold;
      } else {
        showPrev.value = el.scrollLeft > props.threshold;
        showNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - props.threshold;
      }
    };

    const pageStart = () => {
      const el = containerRef.value;
      if (!el) return;
      if (props.vertical) el.scrollBy({ top: -el.clientHeight, behavior: "smooth" });
      else el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
    };

    const pageEnd = () => {
      const el = containerRef.value;
      if (!el) return;
      if (props.vertical) el.scrollBy({ top: el.clientHeight, behavior: "smooth" });
      else el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
    };

    const onScroll = () => updatePaging();

    let resizeObserver;
    onMounted(() => {
      updatePaging();
      resizeObserver = new ResizeObserver(updatePaging);
      if (containerRef.value) resizeObserver.observe(containerRef.value);
    });
    onBeforeUnmount(() => resizeObserver?.disconnect());

    return { containerRef, classes, showPrev, showNext, pageStart, pageEnd, onScroll };
  },
});
</script>
