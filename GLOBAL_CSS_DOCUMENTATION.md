# 🎨 MediConnect Global CSS System Documentation

## Overview

The MediConnect application uses a comprehensive global CSS system built on top of Tailwind CSS, providing consistent styling, medical-themed components, and accessible design patterns.

## 🎯 Key Features

- **Medical-themed color palette** with primary blues, health greens, and warning/danger reds
- **Comprehensive component library** for buttons, forms, cards, and medical-specific elements
- **Accessibility-first design** with proper focus states and screen reader support
- **Responsive utilities** that work across all device sizes
- **CSS Custom Properties** for easy theming and maintenance

## 🎨 Color System

### Primary Colors (Medical Blue)
```css
--color-primary-50: #eff6ff    /* Very light blue */
--color-primary-500: #3b82f6   /* Main brand color */
--color-primary-600: #2563eb   /* Primary button color */
--color-primary-900: #1e3a8a   /* Dark text */
```

### Health Status Colors
```css
/* Success/Health - Green */
--color-success-500: #10b981
--color-success-600: #059669

/* Warning - Orange */
--color-warning-500: #f59e0b
--color-warning-600: #d97706

/* Danger/Critical - Red */
--color-danger-500: #ef4444
--color-danger-600: #dc2626
```

## 🧩 Component Classes

### Buttons

#### Basic Buttons
```html
<button class="btn-primary">Primary Action</button>
<button class="btn-secondary">Secondary Action</button>
<button class="btn-success">Success Action</button>
<button class="btn-danger">Danger Action</button>
<button class="btn-warning">Warning Action</button>
```

#### Button Sizes
```html
<button class="btn-primary btn-sm">Small Button</button>
<button class="btn-primary">Regular Button</button>
<button class="btn-primary btn-lg">Large Button</button>
```

#### Button Variants
```html
<button class="btn-outline-primary">Outline Button</button>
<button class="btn-ghost">Ghost Button</button>
```

### Form Elements

#### Input Fields
```html
<div class="form-group">
  <label class="form-label form-label-required">Field Name</label>
  <input type="text" class="input-field" placeholder="Placeholder text">
  <span class="form-help">Help text goes here</span>
  <span class="form-error">Error message</span>
</div>
```

#### Input Sizes
```html
<input class="input-field input-field-sm" placeholder="Small input">
<input class="input-field" placeholder="Regular input">
<input class="input-field input-field-lg" placeholder="Large input">
```

### Cards

#### Basic Cards
```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content goes here</p>
  </div>
  <div class="card-footer">
    <button class="btn-primary">Action</button>
  </div>
</div>
```

#### Interactive Cards
```html
<div class="card-hover">Hover effects</div>
<div class="card-clickable">Clickable with transform</div>
<div class="medical-card">Medical-themed with blue accent</div>
```

### Medical-Specific Components

#### Test Result Cards
```html
<div class="test-result-card">
  <div class="flex justify-between items-start mb-2">
    <h5 class="font-medium">Blood Test</h5>
    <span class="health-status-good">Normal</span>
  </div>
  <p class="text-gray-600 text-sm">Results and details</p>
</div>
```

#### Health Status Indicators
```html
<span class="health-status-good">Normal/Good</span>
<span class="health-status-warning">Needs Attention</span>
<span class="health-status-critical">Critical/Urgent</span>
```

#### Appointment Cards
```html
<div class="appointment-card">
  <h5 class="font-medium">Appointment Title</h5>
  <p class="text-gray-600">Doctor name and details</p>
</div>
```

### Badges and Status

#### Status Badges
```html
<span class="badge-primary">Primary Status</span>
<span class="badge-success">Success Status</span>
<span class="badge-warning">Warning Status</span>
<span class="badge-danger">Danger Status</span>
```

### Navigation

#### Navigation Links
```html
<a class="nav-link">Regular Link</a>
<a class="nav-link nav-link-active">Active Link</a>
<button class="nav-button">Navigation Button</button>
```

## 🔧 Utility Classes

### Shadows
```html
<div class="shadow-soft">Soft shadow</div>
<div class="shadow-medium">Medium shadow</div>
<div class="shadow-large">Large shadow</div>
<div class="shadow-extra-large">Extra large shadow</div>
```

### Transitions
```html
<div class="transition-fast">Fast transition (150ms)</div>
<div class="transition-normal">Normal transition (250ms)</div>
<div class="transition-slow">Slow transition (350ms)</div>
```

### Layout Utilities
```html
<div class="container">Max-width container</div>
<div class="container-sm">Small container</div>
<div class="section">Section with padding</div>
<div class="grid-auto-fit">Auto-fitting grid</div>
```

### Loading States
```html
<div class="loading-spinner"></div>
<div class="loading-spinner-lg"></div>
```

## 📱 Responsive Design

### Responsive Text
```html
<h1 class="heading-responsive">Responsive heading</h1>
<p class="text-responsive">Responsive paragraph</p>
```

### Responsive Spacing
```html
<div class="spacing-responsive">
  <!-- Child elements get responsive spacing -->
</div>
```

## ♿ Accessibility Features

### Screen Reader Support
```html
<span class="sr-only">Screen reader only text</span>
<a class="skip-link" href="#main">Skip to main content</a>
```

### Focus Management
All interactive elements have proper focus states with:
- Visible focus indicators
- Appropriate color contrast
- Keyboard navigation support

## 🖨️ Print Styles

```html
<div class="no-print">Hidden in print</div>
<div class="print-only">Only visible in print</div>
```

## 📐 Layout Components

### Section Layout
```html
<section class="section">
  <div class="container">
    <h2>Section Title</h2>
    <div class="grid-auto-fit">
      <!-- Auto-fitting grid items -->
    </div>
  </div>
</section>
```

### Dividers
```html
<div class="divider"></div>
```

## 🎯 Best Practices

### Component Composition
```html
<!-- Good: Combine classes for specific use cases -->
<button class="btn-primary btn-lg">
  Large Primary Button
</button>

<!-- Good: Use semantic HTML with CSS classes -->
<article class="medical-card">
  <header class="card-header">
    <h3 class="text-xl font-semibold">Test Results</h3>
  </header>
  <main class="card-body">
    <p class="text-gray-600">Content here</p>
  </main>
</article>
```

### Color Usage
- Use `primary` colors for main actions and branding
- Use `success` for positive health indicators and completed actions
- Use `warning` for attention-needed but non-critical items
- Use `danger` for critical alerts and destructive actions

### Typography Hierarchy
- Use responsive heading classes for proper scaling
- Maintain consistent spacing with the spacing utilities
- Use color classes for semantic meaning (gray for body text, primary for links)

## 🔧 Customization

### CSS Custom Properties
Override any of the CSS custom properties in your own styles:

```css
:root {
  --color-primary-600: #your-brand-color;
  --font-sans: 'Your Font', sans-serif;
}
```

### Extending Components
Add your own component variations:

```css
.btn-custom {
  @apply btn bg-purple-600 text-white hover:bg-purple-700;
}
```

## 📚 Implementation Examples

See `StyleDemo.jsx` for a comprehensive demonstration of all components and utilities in action.

---

**Note**: This CSS system is designed specifically for medical applications with attention to accessibility, professional appearance, and clear information hierarchy.
