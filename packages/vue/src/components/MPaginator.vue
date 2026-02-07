<template>
  <div :class="classes" role="navigation" :aria-label="ariaLabel">
    <div v-if="!hidePageSize" class="m3e-paginator__page-size">
      <label :for="pageSizeId" class="m3e-paginator__label">{{ pageSizeLabel }}</label>
      <select :id="pageSizeId" class="m3e-paginator__select" :value="pageSize" :disabled="disabled" @change="onPageSizeChange" :aria-label="pageSizeLabel">
        <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size === 'all' ? 'All' : size }}</option>
      </select>
    </div>

    <div class="m3e-paginator__range" aria-live="polite">
      {{ rangeLabel }}
    </div>

    <div class="m3e-paginator__actions">
      <button
        v-if="showFirstLastButtons"
        class="m3e-paginator__button m3e-paginator__button--first"
        :disabled="disabled || !hasPreviousPage"
        :aria-label="firstPageLabel"
        @click="goFirst"
      >first_page</button>
      <button
        class="m3e-paginator__button m3e-paginator__button--prev"
        :disabled="disabled || !hasPreviousPage"
        :aria-label="previousPageAriaLabel"
        @click="goPrevious"
      >chevron_left</button>
      <button
        class="m3e-paginator__button m3e-paginator__button--next"
        :disabled="disabled || !hasNextPage"
        :aria-label="nextPageAriaLabel"
        @click="goNext"
      >chevron_right</button>
      <button
        v-if="showFirstLastButtons"
        class="m3e-paginator__button m3e-paginator__button--last"
        :disabled="disabled || !hasNextPage"
        :aria-label="lastPageLabel"
        @click="goLast"
      >last_page</button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";

let paginatorId = 0;

export default defineComponent({
  name: "MPaginator",
  props: {
    pageIndex: { type: Number, default: 0 },
    length: { type: Number, required: true },
    pageSize: { type: [Number, String], default: 50 },
    pageSizes: { type: Array, default: () => [10, 25, 50, 100] },
    disabled: { type: Boolean, default: false },
    hidePageSize: { type: Boolean, default: false },
    showFirstLastButtons: { type: Boolean, default: false },
    pageSizeLabel: { type: String, default: "Items per page:" },
    firstPageLabel: { type: String, default: "First page" },
    lastPageLabel: { type: String, default: "Last page" },
    previousPageAriaLabel: { type: String, default: "Previous page" },
    nextPageAriaLabel: { type: String, default: "Next page" },
    ariaLabel: { type: String, default: "Pagination" },
  },
  emits: ["update:pageIndex", "update:pageSize", "page"],
  setup(props, { emit }) {
    const uid = ++paginatorId;
    const pageSizeId = `m3e-paginator-size-${uid}`;

    const classes = computed(() => [
      "m3e-paginator",
      { "m3e-paginator--disabled": props.disabled },
    ]);

    const effectivePageSize = computed(() => (props.pageSize === "all" ? props.length : Number(props.pageSize)));
    const pageCount = computed(() => Math.ceil(props.length / effectivePageSize.value) || 1);
    const hasPreviousPage = computed(() => props.pageIndex > 0);
    const hasNextPage = computed(() => props.pageIndex < pageCount.value - 1);

    const pageSizeOptions = computed(() => props.pageSizes);

    const rangeLabel = computed(() => {
      const start = props.pageIndex * effectivePageSize.value + 1;
      const end = Math.min((props.pageIndex + 1) * effectivePageSize.value, props.length);
      return `${start} – ${end} of ${props.length}`;
    });

    const emitPage = (newIndex) => {
      emit("update:pageIndex", newIndex);
      emit("page", { pageIndex: newIndex, pageSize: props.pageSize, length: props.length });
    };

    const goFirst = () => emitPage(0);
    const goPrevious = () => { if (hasPreviousPage.value) emitPage(props.pageIndex - 1); };
    const goNext = () => { if (hasNextPage.value) emitPage(props.pageIndex + 1); };
    const goLast = () => emitPage(pageCount.value - 1);

    const onPageSizeChange = (e) => {
      const val = e.target.value === "all" ? "all" : Number(e.target.value);
      emit("update:pageSize", val);
      emit("update:pageIndex", 0);
      emit("page", { pageIndex: 0, pageSize: val, length: props.length });
    };

    return {
      pageSizeId, classes, pageSizeOptions, rangeLabel,
      hasPreviousPage, hasNextPage, goFirst, goPrevious, goNext, goLast, onPageSizeChange,
    };
  },
});
</script>
