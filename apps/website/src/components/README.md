# Components

This directory contains all reusable React components for the website. Each component is organized in its own folder with the following structure:

## Folder Structure

```
components/
├── ComponentName/
│   ├── ComponentName.tsx          # Component implementation
│   ├── ComponentName.styles.ts    # Tailwind CSS class strings
│   ├── ComponentName.module.scss  # Custom SASS/CSS Module styles
│   └── index.ts                   # Barrel export for easy importing
└── index.ts                       # Central barrel export for all components
```

## Available Components

### Header

Navigation header with logo, menu links, and CTA button.

**Usage:**

```tsx
import { Header } from "@/components";
// or
import Header from "@/components/Header";

<Header className="custom-class" />;
```

### Footer

Site footer with social links, quick links, and contact information.

**Usage:**

```tsx
import { Footer } from "@/components";
// or
import Footer from "@/components/Footer";

<Footer className="custom-class" />;
```

### Layout

Main layout wrapper that includes Header and Footer.

**Usage:**

```tsx
import { Layout } from "@/components";
// or
import Layout from "@/components/Layout";

<Layout showHeader={true} showFooter={true}>
  {children}
</Layout>;
```

### ProjectCard

Card component for displaying project information.

**Usage:**

```tsx
import { ProjectCard } from "@/components";
// or
import ProjectCard from "@/components/ProjectCard";

<ProjectCard project={projectData} />;
```

## Styling

Each component uses a **dual styling approach** combining Tailwind CSS and SASS Modules:

### 1. Tailwind Classes (`.styles.ts`)

For utility-first styling, each component has a `.styles.ts` file exporting Tailwind class strings:

```tsx
// ComponentName.styles.ts
export const componentStyles = {
  container: "bg-white shadow-lg rounded-lg",
  title: "text-2xl font-bold text-gray-900",
};
```

### 2. SASS Modules (`.module.scss`)

For custom styles, complex selectors, animations, and styles that can't be achieved with Tailwind:

```scss
// ComponentName.module.scss
.container {
  // Custom styles here

  &:hover {
    // Complex hover effects
  }
}

@media (max-width: 768px) {
  .container {
    // Responsive custom styles
  }
}
```

### 3. Using Both Together

```tsx
// ComponentName.tsx
import React from "react";
import { componentStyles } from "./ComponentName.styles";
import styles from "./ComponentName.module.scss";

const ComponentName = () => (
  <div className={`${componentStyles.container} ${styles.container}`}>
    <h1 className={componentStyles.title}>Title</h1>
  </div>
);
```

### Benefits of This Approach

- **Tailwind for utilities**: Quick, consistent spacing, colors, and layouts
- **SASS for custom**: Complex animations, transitions, and unique styles
- **Type safety**: TypeScript support for both approaches
- **Scoped styles**: CSS Modules prevent style conflicts
- **Best of both worlds**: Combine utility-first with custom styling

### When to Use Each

**Use Tailwind (`.styles.ts`) for:**

- Spacing (padding, margin)
- Colors from your design system
- Typography scales
- Flexbox/Grid layouts
- Common utilities

**Use SASS Modules (`.module.scss`) for:**

- Custom animations and keyframes
- Complex pseudo-selectors
- Advanced hover/focus effects
- Component-specific responsive breakpoints
- Styles that need CSS variables
- Complex nested selectors

## Importing Components

You can import components in two ways:

### 1. From the central barrel export (Recommended)

```tsx
import { Header, Footer, Layout, ProjectCard } from "@/components";
```

### 2. Direct import from component folder

```tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
```

Both methods work identically thanks to the barrel exports.

## Adding New Components

To add a new component:

1. Create a new folder: `components/NewComponent/`
2. Create the component file: `NewComponent.tsx`
3. Create the Tailwind styles file: `NewComponent.styles.ts`
4. Create the SASS module file: `NewComponent.module.scss`
5. Create the barrel export: `index.ts`
6. Add the export to the central `components/index.ts`

**Template for new component:**

```tsx
// NewComponent.styles.ts
export const newComponentStyles = {
  container: "bg-white rounded-lg p-4",
  title: "text-2xl font-bold",
  // Add more Tailwind classes
};
```

```scss
// NewComponent.module.scss
.container {
  // Add custom styles
  transition: all 0.3s ease;

  &:hover {
    // Custom hover effects
  }
}

.title {
  // Custom title styles
}

// Add media queries, animations, etc.
```

```tsx
// NewComponent.tsx
import React from "react";
import { newComponentStyles } from "./NewComponent.styles";
import styles from "./NewComponent.module.scss";

interface NewComponentProps {
  // Define props
}

const NewComponent: React.FC<NewComponentProps> = (props) => {
  return (
    <div className={`${newComponentStyles.container} ${styles.container}`}>
      <h2 className={`${newComponentStyles.title} ${styles.title}`}>
        {/* Component content */}
      </h2>
    </div>
  );
};

export default NewComponent;
```

```ts
// index.ts
export { default } from "./NewComponent";
export { default as NewComponent } from "./NewComponent";
export * from "./NewComponent.styles";
```

Then add to `components/index.ts`:

```tsx
export { default as NewComponent } from "./NewComponent";
export * from "./NewComponent/NewComponent.styles";
```
