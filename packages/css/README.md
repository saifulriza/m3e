# @m3e/css

A **framework-agnostic CSS library** for [Material 3 Expressive](https://m3.material.io/) — works with React, Vue, Angular, Svelte, or plain HTML.

## Installation

```bash
npm install @m3e/css
```

## Quick Start

Import the full CSS bundle (tokens + all components):

```js
// In your main entry file (e.g., main.js, app.js)
import "@m3e/css";
```

Or link directly in HTML:

```html
<link rel="stylesheet" href="node_modules/@m3e/css/dist/m3e.css" />
```

## Usage with Frameworks

### React

```jsx
import "@m3e/css";

function App() {
  return (
    <div>
      <button className="m3e-button m3e-button--filled">Filled Button</button>
      <button className="m3e-button m3e-button--outlined">Outlined</button>
    </div>
  );
}
```

### Vue

```vue
<script setup>
import "@m3e/css";
</script>

<template>
  <button class="m3e-button m3e-button--tonal">Tonal Button</button>
  <div class="m3e-card m3e-card--elevated">
    <div class="m3e-card__content">Card Content</div>
  </div>
</template>
```

### Angular

```typescript
// In angular.json → styles array:
// "node_modules/@m3e/css/dist/m3e.css"

// Or in styles.css:
@import "@m3e/css";
```

```html
<button class="m3e-button m3e-button--filled m3e-button--large">Large</button>
```

### Svelte

```svelte
<script>
  import "@m3e/css";
</script>

<button class="m3e-button m3e-button--elevated">Elevated</button>
```

### Plain HTML

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@m3e/css/dist/m3e.css" />

<button class="m3e-button m3e-button--filled">Click Me</button>
```

## Selective Imports

Import only what you need for smaller bundle sizes:

```js
import "@m3e/css/tokens";      // Design tokens only
import "@m3e/css/button";      // Button component
import "@m3e/css/card";        // Card component
import "@m3e/css/checkbox";    // Checkbox component
```

## Components

### Button

```html
<!-- Variants -->
<button class="m3e-button">Text (default)</button>
<button class="m3e-button m3e-button--filled">Filled</button>
<button class="m3e-button m3e-button--tonal">Tonal</button>
<button class="m3e-button m3e-button--elevated">Elevated</button>
<button class="m3e-button m3e-button--outlined">Outlined</button>

<!-- Sizes -->
<button class="m3e-button m3e-button--filled m3e-button--extra-small">XS</button>
<button class="m3e-button m3e-button--filled m3e-button--small">Small</button>
<button class="m3e-button m3e-button--filled m3e-button--medium">Medium</button>
<button class="m3e-button m3e-button--filled m3e-button--large">Large</button>
<button class="m3e-button m3e-button--filled m3e-button--extra-large">XL</button>

<!-- Shape -->
<button class="m3e-button m3e-button--filled m3e-button--square">Square</button>

<!-- With Icon -->
<button class="m3e-button m3e-button--tonal">
  <span class="m3e-button__icon material-symbols-outlined">send</span>
  Send
</button>

<!-- Disabled -->
<button class="m3e-button m3e-button--filled" disabled>Disabled</button>
```

### Card

```html
<div class="m3e-card m3e-card--filled">
  <div class="m3e-card__content">Filled card</div>
</div>

<div class="m3e-card m3e-card--elevated">
  <div class="m3e-card__header">Header</div>
  <div class="m3e-card__content">Elevated card</div>
  <div class="m3e-card__actions">
    <button class="m3e-button">Action</button>
  </div>
</div>

<div class="m3e-card m3e-card--outlined">
  <div class="m3e-card__content">Outlined card</div>
</div>
```

### Checkbox

```html
<label class="m3e-checkbox">
  <input type="checkbox" class="m3e-checkbox__input" />
  <span class="m3e-checkbox__indicator"></span>
  <span class="m3e-checkbox__label">Accept terms</span>
</label>
```

### Switch

```html
<label class="m3e-switch">
  <input type="checkbox" class="m3e-switch__input" role="switch" />
  <span class="m3e-switch__track">
    <span class="m3e-switch__thumb"></span>
  </span>
  <span class="m3e-switch__label">Dark mode</span>
</label>
```

### Radio

```html
<label class="m3e-radio">
  <input type="radio" class="m3e-radio__input" name="option" />
  <span class="m3e-radio__indicator"></span>
  <span class="m3e-radio__label">Option A</span>
</label>
```

### Dialog

```html
<dialog class="m3e-dialog" id="my-dialog">
  <div class="m3e-dialog__header">
    <h2 class="m3e-dialog__title">Confirm</h2>
  </div>
  <div class="m3e-dialog__content">Are you sure?</div>
  <div class="m3e-dialog__actions">
    <button class="m3e-button" onclick="this.closest('dialog').close()">Cancel</button>
    <button class="m3e-button m3e-button--filled">Confirm</button>
  </div>
</dialog>
```

### FAB (Floating Action Button)

```html
<button class="m3e-fab">
  <span class="m3e-fab__icon material-symbols-outlined">add</span>
</button>

<button class="m3e-fab m3e-fab--extended">
  <span class="m3e-fab__icon material-symbols-outlined">edit</span>
  <span class="m3e-fab__label">Compose</span>
</button>
```

### Chips

```html
<button class="m3e-chip">Chip</button>
<button class="m3e-chip m3e-chip--selected">Selected</button>
<button class="m3e-chip m3e-chip--elevated">Elevated</button>
```

### Tabs

```html
<div class="m3e-tabs">
  <button class="m3e-tab m3e-tab--active">Tab 1</button>
  <button class="m3e-tab">Tab 2</button>
  <button class="m3e-tab">Tab 3</button>
</div>
```

### List

```html
<ul class="m3e-list">
  <li class="m3e-list-item m3e-list-item--interactive">
    <span class="m3e-list-item__text">
      <span class="m3e-list-item__headline">Item Title</span>
      <span class="m3e-list-item__supporting">Supporting text</span>
    </span>
  </li>
</ul>
```

### Navigation Bar

```html
<nav class="m3e-nav-bar">
  <a class="m3e-nav-bar__item m3e-nav-bar__item--active" href="#">
    <span class="m3e-nav-bar__icon material-symbols-outlined">home</span>
    <span class="m3e-nav-bar__label">Home</span>
  </a>
  <a class="m3e-nav-bar__item" href="#">
    <span class="m3e-nav-bar__icon material-symbols-outlined">search</span>
    <span class="m3e-nav-bar__label">Search</span>
  </a>
</nav>
```

### App Bar

```html
<header class="m3e-app-bar">
  <button class="m3e-icon-button">
    <span class="material-symbols-outlined">menu</span>
  </button>
  <span class="m3e-app-bar__title">My App</span>
  <div class="m3e-app-bar__actions">
    <button class="m3e-icon-button">
      <span class="material-symbols-outlined">search</span>
    </button>
  </div>
</header>
```

### Snackbar

```html
<div class="m3e-snackbar m3e-snackbar--visible">
  <span class="m3e-snackbar__text">File deleted</span>
  <button class="m3e-snackbar__action">Undo</button>
</div>
```

### Tooltip

```html
<div class="m3e-tooltip-container">
  <button class="m3e-icon-button">★</button>
  <div class="m3e-tooltip" role="tooltip">Add to favorites</div>
</div>
```

## Typography Utilities

```html
<h1 class="m3e-display-large">Display Large</h1>
<h2 class="m3e-headline-medium">Headline Medium</h2>
<h3 class="m3e-title-small">Title Small</h3>
<p class="m3e-body-large">Body text</p>
<span class="m3e-label-small">Label</span>
```

## Elevation Utilities

```html
<div class="m3e-elevation-1">Level 1</div>
<div class="m3e-elevation-3">Level 3</div>
<div class="m3e-elevation-5">Level 5</div>
```

## Color & Surface Utilities

```html
<span class="m3e-text-primary">Primary text</span>
<div class="m3e-surface-container">Surface container</div>
```

## Shape Utilities

```html
<div class="m3e-shape-medium">Medium corners</div>
<div class="m3e-shape-full">Fully rounded</div>
```

## Theming

Override design tokens with CSS custom properties:

```css
:root {
  /* Change primary color */
  --md-sys-color-primary: #006A6A;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #6FF7F6;

  /* Adjust shape */
  --md-sys-shape-corner-medium: 1rem;

  /* Change motion */
  --md-sys-motion-duration-short-4: 300ms;
}
```

## Dark Theme

```css
@media (prefers-color-scheme: dark) {
  :root {
    --md-sys-color-primary: #D0BCFF;
    --md-sys-color-on-primary: #381E72;
    --md-sys-color-surface: #141218;
    --md-sys-color-on-surface: #E6E0E9;
    /* ... override all color tokens for dark mode */
  }
}
```

## Accessibility

All components include:

- **`forced-colors` media query** support for Windows High Contrast Mode.
- **`prefers-reduced-motion`** support to disable animations.
- **Focus-visible** styles for keyboard navigation.
- Semantic HTML patterns recommended in usage examples.

## Browser Support

M3E CSS uses modern CSS features:

- CSS Custom Properties (CSS Variables)
- `color-mix()` function
- `focus-visible` pseudo-class
- CSS Nesting is **not** used for maximum compatibility

## License

MIT
