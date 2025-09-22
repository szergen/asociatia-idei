# Shared UI Components

Reusable React components shared between the Asociatia IDEI website and e-learning platform.

## 🎨 Features

- **Consistent Design**: Unified design system across applications
- **TypeScript Support**: Full type safety and IntelliSense
- **Tailwind CSS**: Utility-first styling approach
- **Tree Shaking**: Only import what you need
- **Platform Agnostic**: Works with Next.js and OpenEDX

## 📦 Installation

This package is part of the mono-repo and automatically available to workspace applications:

```json
{
  "dependencies": {
    "@asociatia-idei/shared-ui": "*"
  }
}
```

## 🏗️ Development Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development**:

   ```bash
   npm run dev
   ```

3. **Build package**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Card.tsx
│   └── index.ts
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.ts
│   └── index.ts
├── styles/              # SASS styles
│   ├── components/
│   ├── utilities/
│   └── main.scss
└── index.ts            # Main entry point
```

## 🧩 Available Components

### Button

A versatile button component with multiple variants and sizes.

```typescript
import { Button } from "@asociatia-idei/shared-ui";

<Button variant="primary" size="lg" onClick={() => console.log("Clicked!")}>
  Click me
</Button>;
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `onClick`: () => void
- `type`: 'button' | 'submit' | 'reset'

### Header

Navigation header component with logo and menu items.

```typescript
import { Header } from "@asociatia-idei/shared-ui";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
];

<Header logo="/logo.png" navigation={navigation} />;
```

**Props:**

- `logo`: string (optional)
- `navigation`: NavigationItem[]
- `className`: string (optional)

### Footer

Footer component with links and social media.

```typescript
import { Footer } from "@asociatia-idei/shared-ui";

<Footer links={footerLinks} social={socialLinks} />;
```

### Card

Flexible card component for content display.

```typescript
import { Card } from "@asociatia-idei/shared-ui";

<Card>
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here.</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>;
```

## 🪝 Available Hooks

### useLocalStorage

Hook for managing localStorage with TypeScript support.

```typescript
import { useLocalStorage } from "@asociatia-idei/shared-ui";

const [user, setUser] = useLocalStorage<User>("user", null);
```

## 🎨 Styling

### Tailwind CSS Classes

Components use Tailwind CSS classes and can be customized:

```typescript
<Button className="custom-class bg-red-500">Custom Button</Button>
```

### SASS Customization

Override component styles:

```scss
// In your application
@import "@asociatia-idei/shared-ui/dist/styles/main.scss";

.custom-button {
  @extend .btn;
  background-color: #custom-color;
}
```

### CSS Custom Properties

Use CSS variables for theming:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --font-family: "Your Font";
}
```

## 🔧 Usage in Applications

### Next.js Website

```typescript
// pages/_app.tsx
import "@asociatia-idei/shared-ui/dist/styles/main.css";
import { Button, Header } from "@asociatia-idei/shared-ui";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header navigation={nav} />
      <Component {...pageProps} />
    </>
  );
}
```

### OpenEDX Theme

```javascript
// theme/lms/static/js/components.js
import { Button } from "@asociatia-idei/shared-ui";

// Use in OpenEDX templates
window.SharedUI = { Button };
```

```html
<!-- In Django templates -->
<div id="custom-button"></div>
<script>
  ReactDOM.render(
    React.createElement(SharedUI.Button, {
      variant: "primary",
      children: "Enroll Now",
    }),
    document.getElementById("custom-button")
  );
</script>
```

## 🔧 Development

### Adding New Components

1. **Create component**:

   ```typescript
   // src/components/NewComponent.tsx
   import React from "react";

   export interface NewComponentProps {
     children: React.ReactNode;
     variant?: "default" | "special";
   }

   const NewComponent: React.FC<NewComponentProps> = ({
     children,
     variant = "default",
   }) => {
     return (
       <div className={`new-component new-component--${variant}`}>
         {children}
       </div>
     );
   };

   export default NewComponent;
   ```

2. **Add styles**:

   ```scss
   // src/styles/components/_new-component.scss
   .new-component {
     // Base styles

     &--default {
       // Default variant
     }

     &--special {
       // Special variant
     }
   }
   ```

3. **Export component**:

   ```typescript
   // src/components/index.ts
   export { default as NewComponent } from "./NewComponent";
   export type { NewComponentProps } from "./NewComponent";
   ```

4. **Update main export**:
   ```typescript
   // src/index.ts
   export { NewComponent } from "./components";
   export type { NewComponentProps } from "./components";
   ```

### Testing Components

```bash
# Run tests
npm test

# Test with Storybook (if configured)
npm run storybook
```

### Building for Production

```bash
# Build TypeScript
npm run build

# Build CSS
npm run build:css

# Clean dist folder
npm run clean
```

## 🎯 Design Principles

- **Consistency**: Same look and feel across applications
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized bundle size
- **Flexibility**: Customizable and extensible
- **Type Safety**: Full TypeScript support

## 📚 Storybook Documentation

If Storybook is set up:

```bash
npm run storybook
```

View component documentation at http://localhost:6006

## 🐛 Troubleshooting

### Build Issues

1. **TypeScript errors**:

   ```bash
   npm run type-check
   ```

2. **Missing dependencies**:

   ```bash
   npm install
   ```

3. **Style not applying**:
   ```bash
   npm run build:css
   ```

### Integration Issues

1. **Components not updating in apps**:

   ```bash
   npm run build
   # Restart app development server
   ```

2. **Style conflicts**:
   - Check CSS import order
   - Verify Tailwind configuration

## 📞 Support

- Main repository [documentation](../../docs/)
- Component API documentation
- Contact: contact@asociatia-idei.eu
