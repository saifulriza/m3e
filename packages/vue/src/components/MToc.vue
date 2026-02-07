<template>
  <nav :class="classes" :aria-label="ariaLabel">
    <div v-if="$slots.overline" class="m3e-toc__overline">
      <slot name="overline" />
    </div>
    <div v-if="$slots.title" class="m3e-toc__title">
      <slot name="title" />
    </div>
    <ul class="m3e-toc__list" role="list">
      <li
        v-for="item in items"
        :key="item.id"
        class="m3e-toc__item"
        :class="{
          'm3e-toc__item--active': activeId === item.id,
          [`m3e-toc__item--depth-${item.depth}`]: item.depth > 1,
        }"
        :style="{ paddingLeft: `${(item.depth - 1) * 16}px` }"
      >
        <a
          :href="`#${item.id}`"
          class="m3e-toc__link"
          :aria-current="activeId === item.id ? 'location' : undefined"
          @click.prevent="scrollTo(item.id)"
        >{{ item.text }}</a>
      </li>
    </ul>
    <div class="m3e-toc__indicator" :style="indicatorStyle" aria-hidden="true"></div>
  </nav>
</template>

<script>
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from "vue";

export default defineComponent({
  name: "MToc",
  props: {
    target: { type: String, default: null },
    maxDepth: { type: Number, default: 2 },
    ariaLabel: { type: String, default: "Table of contents" },
    headingSelector: { type: String, default: null },
  },
  emits: ["select"],
  setup(props, { emit }) {
    const items = ref([]);
    const activeId = ref(null);

    const classes = computed(() => [
      "m3e-toc",
      { "m3e-toc--has-active": activeId.value },
    ]);

    const indicatorStyle = computed(() => {
      const idx = items.value.findIndex((i) => i.id === activeId.value);
      if (idx < 0) return { opacity: 0 };
      return { transform: `translateY(${idx * 40}px)`, opacity: 1 };
    });

    const generateToc = () => {
      const container = props.target ? document.getElementById(props.target) : document.body;
      if (!container) return;

      const selector = props.headingSelector ||
        Array.from({ length: props.maxDepth }, (_, i) => `h${i + 1}`).join(", ");
      const headings = container.querySelectorAll(selector);

      items.value = Array.from(headings).map((h) => {
        // Use existing id or generate one from text content
        const id = h.id || h.textContent.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
        if (!h.id) h.id = id;
        const level = parseInt(h.tagName.charAt(1), 10);
        return { id, text: h.textContent.trim(), depth: level };
      });
    };

    const scrollTo = (id) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        activeId.value = id;
        emit("select", id);
      }
    };

    const onScroll = () => {
      const scrollY = window.scrollY + 100;
      let current = null;
      for (const item of items.value) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollY) current = item.id;
      }
      if (current !== activeId.value) activeId.value = current;
    };

    onMounted(() => {
      generateToc();
      window.addEventListener("scroll", onScroll, { passive: true });
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", onScroll);
    });

    return { items, activeId, classes, indicatorStyle, scrollTo };
  },
});
</script>
