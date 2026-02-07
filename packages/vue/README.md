# @m3e/vue

Vue 3 adapter for Material 3 Expressive — interactive component wrappers for `@m3e/css`.

## Installation

```bash
npm install @m3e/vue @m3e/css
```

## Quick Start

```js
// main.js
import { createApp } from "vue";
import "@m3e/css";           // Import M3E CSS styles
import M3eVue from "@m3e/vue"; // Import Vue plugin
import App from "./App.vue";

const app = createApp(App);
app.use(M3eVue);  // Registers all components globally
app.mount("#app");
```

Or import individual components:

```js
import { MButton, MCheckbox, MDialog } from "@m3e/vue";
```

## Components

### Form Controls

| Component | Props | v-model |
|-----------|-------|---------|
| `MButton` | `variant`, `size`, `square`, `disabled`, `loading`, `icon` | — |
| `MCheckbox` | `label`, `disabled`, `indeterminate`, `error` | `v-model` (Boolean) |
| `MSwitch` | `label`, `disabled` | `v-model` (Boolean) |
| `MRadio` | `value`, `name`, `label`, `disabled` | `v-model` (any) |
| `MTextField` | `label`, `placeholder`, `type`, `outlined`, `error`, `errorMessage`, `supporting`, `maxlength`, `disabled` | `v-model` (String) |
| `MSelect` | `label`, `outlined`, `disabled`, `error` | `v-model` (String\|Number) |
| `MSlider` | `min`, `max`, `step`, `disabled` | `v-model` (Number) |

### Selection & Grouping

| Component | Props | v-model |
|-----------|-------|---------|
| `MChip` | `selected`, `elevated`, `removable`, `disabled` | — (events: `click`, `remove`) |
| `MSegmentedButton` | `options`, `multiple` | `v-model` (any\|Array) |
| `MTabs` | `secondary` | — |
| `MTab` | `active`, `icon`, `disabled` | — (event: `click`) |

### Feedback & Overlays

| Component | Props | v-model |
|-----------|-------|---------|
| `MDialog` | `title`, `fullscreen`, `closeOnScrim`, `closeOnEscape` | `v-model` (Boolean) |
| `MSnackbar` | `message`, `action`, `closable`, `duration`, `multiline` | `v-model` (Boolean) |
| `MExpansionPanel` | `title`, `disabled` | `v-model` (Boolean) |
| `MMenu` | `closeOnClick` | `v-model` (Boolean) |
| `MTooltip` | `text`, `delay` | — |

### Navigation

| Component | Props |
|-----------|-------|
| `MAppBar` | `title`, `variant` |
| `MNavBar` | — |
| `MNavBarItem` | `icon`, `label`, `active`, `href` |
| `MDrawer` | `modal`, `end` — `v-model` (Boolean) |
| `MStepper` | `horizontal` |
| `MStep` | `step`, `label`, `active`, `completed`, `error`, `optional`, `disabled` |

### Display

| Component | Props |
|-----------|-------|
| `MCard` | `variant` (elevated, filled, outlined) |
| `MBadge` | `text`, `dot`, `large` |
| `MAvatar` | `src`, `alt`, `size`, `square` |
| `MDivider` | `inset` |
| `MIconButton` | `icon`, `variant`, `toggle`, `toggled`, `disabled` |
| `MFab` | `icon`, `label`, `size`, `extended`, `color` |
| `MList` | — |
| `MListItem` | `headline`, `supporting`, `trailing` |
| `MToolbar` | `vertical`, `vibrant`, `square` |
| `MProgressIndicator` | `type` (linear, circular), `value`, `indeterminate` |
| `MLoadingIndicator` | `size`, `contained` |

## Usage Examples

### Checkbox with v-model

```vue
<template>
  <MCheckbox v-model="agreed" label="I agree to terms" />
  <p>Agreed: {{ agreed }}</p>
</template>

<script setup>
import { ref } from "vue";
const agreed = ref(false);
</script>
```

### Dialog

```vue
<template>
  <MButton @click="open = true">Open Dialog</MButton>
  <MDialog v-model="open" title="Confirm">
    <p>Are you sure?</p>
    <template #actions="{ close }">
      <MButton variant="text" @click="close">Cancel</MButton>
      <MButton @click="confirm(); close()">OK</MButton>
    </template>
  </MDialog>
</template>

<script setup>
import { ref } from "vue";
const open = ref(false);
const confirm = () => console.log("Confirmed!");
</script>
```

### Tabs

```vue
<template>
  <MTabs>
    <MTab :active="tab === 0" @click="tab = 0">Tab 1</MTab>
    <MTab :active="tab === 1" @click="tab = 1">Tab 2</MTab>
  </MTabs>
  <div v-if="tab === 0">Content 1</div>
  <div v-if="tab === 1">Content 2</div>
</template>

<script setup>
import { ref } from "vue";
const tab = ref(0);
</script>
```

### Drawer

```vue
<template>
  <MDrawer v-model="drawerOpen" modal>
    <template #drawer>
      <nav>Navigation items</nav>
    </template>
    <main>Main content</main>
  </MDrawer>
</template>

<script setup>
import { ref } from "vue";
const drawerOpen = ref(false);
</script>
```

## License

MIT
