# Theme Development Guide

Complete guide for developing and customizing the Asociatia IDEI OpenEDX theme.

## Table of Contents

1. [Architecture](#architecture)
2. [File Structure](#file-structure)
3. [Development Workflow](#development-workflow)
4. [Customizing Components](#customizing-components)
5. [Styling Guide](#styling-guide)
6. [Template Development](#template-development)
7. [Best Practices](#best-practices)

## Architecture

The theme integrates with OpenEDX while maintaining consistency with the main Asociatia IDEI website.

### Design Philosophy

- **Consistency**: Match the main website's header, footer, and overall design
- **Responsiveness**: Mobile-first approach with Tailwind CSS utilities
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized assets and lazy loading

### Tech Stack

- **SCSS**: Styling with variables and mixins
- **Mako Templates**: OpenEDX template engine
- **Tailwind CSS**: Utility classes (via CDN)
- **JavaScript**: Minimal, vanilla JS for interactions

## File Structure

```
theme/
├── package.json              # Theme build configuration
├── theme.json                # Theme metadata
├── lms.scss                  # LMS main stylesheet
├── cms.scss                  # CMS main stylesheet
├── _variables.scss           # Global SCSS variables
├── components/               # Component styles
│   ├── _header.scss
│   ├── _footer.scss
│   ├── _buttons.scss
│   └── _forms.scss
├── layouts/                  # Layout styles
│   ├── _course.scss
│   └── _dashboard.scss
├── lms/                      # LMS (Student) theme
│   ├── templates/            # Mako templates
│   │   ├── header.html
│   │   ├── footer.html
│   │   └── main.html
│   └── static/               # Static assets
│       ├── css/              # Compiled CSS (generated)
│       ├── js/               # JavaScript files
│       └── images/           # Images and icons
└── cms/                      # CMS (Instructor) theme
    ├── templates/
    │   ├── header.html
    │   └── footer.html
    └── static/
        └── css/
```

## Development Workflow

### 1. Setup Development Environment

```bash
# Install dependencies
cd theme
npm install

# Start watching for changes
npm run watch
```

### 2. Make Changes

Edit files in the `theme/` directory:

```bash
# Styles
theme/_variables.scss
theme/components/_header.scss
theme/components/_footer.scss

# Templates
theme/lms/templates/header.html
theme/lms/templates/footer.html
```

### 3. See Changes

Changes to SCSS are automatically compiled. For templates:

```bash
# Restart OpenEDX services
tutor local restart lms cms

# Or using make
make update-theme
```

### 4. Test

- Test on different screen sizes
- Test with different user roles (student, instructor, admin)
- Test course pages, dashboard, and other key areas

## Customizing Components

### Header

The header component matches the main website design.

#### SCSS (`components/_header.scss`)

```scss
.idei-header {
  background-color: $background;
  box-shadow: $shadow;

  &__logo {
    font-size: 1.5rem;
    color: $primary-color;
    // ... more styles
  }

  &__nav-link {
    color: $text-color;
    &:hover {
      color: $primary-color;
    }
  }
}
```

#### Template (`lms/templates/header.html`)

```html
<header class="idei-header">
  <div class="idei-header__container">
    <!-- Header content -->
  </div>
</header>
```

#### Customization Examples

**Change logo:**

```html
<!-- In header.html -->
<a href="${marketing_link('ROOT')}" class="idei-header__logo">
  <img src="${static.url('images/logo.png')}" alt="Asociația IDEI" />
</a>
```

**Add navigation item:**

```html
<nav class="idei-header__nav">
  <!-- Existing items -->
  <a href="/new-page" class="idei-header__nav-link">New Page</a>
</nav>
```

### Footer

#### Customization Examples

**Update contact information:**

```html
<!-- In footer.html -->
<div class="idei-footer__contact-item">
  <svg class="idei-footer__contact-icon">...</svg>
  <span>your-email@example.com</span>
</div>
```

**Add social media link:**

```html
<a href="https://facebook.com/your-page" class="idei-footer__social-link">
  <svg><!-- Facebook icon --></svg>
</a>
```

### Buttons

Custom button styles in `components/_buttons.scss`:

```scss
.btn-idei {
  &--primary {
    background-color: $primary-color;
    color: white;
  }

  &--secondary {
    background-color: $secondary-color;
  }
}
```

Usage in templates:

```html
<button class="btn-idei btn-idei--primary">Enroll Now</button>
```

### Forms

Form styles in `components/_forms.scss`:

```scss
.form-idei {
  &__input {
    border: 1px solid $border-color;
    border-radius: $border-radius;
    padding: $spacing-sm $spacing-md;
  }
}
```

## Styling Guide

### Using SCSS Variables

All colors, spacing, and other design tokens are in `_variables.scss`:

```scss
// Colors
$primary-color: #2563eb;
$text-color: #374151;
$background: #ffffff;

// Spacing
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;

// Typography
$font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
$font-weight-medium: 500;
$font-weight-bold: 700;
```

**Example usage:**

```scss
.my-component {
  color: $primary-color;
  padding: $spacing-md;
  font-family: $font-family;
  font-weight: $font-weight-bold;
}
```

### BEM Naming Convention

We use BEM (Block Element Modifier) for CSS classes:

```scss
// Block
.idei-header {
}

// Element
.idei-header__logo {
}
.idei-header__nav {
}
.idei-header__nav-link {
}

// Modifier
.idei-header__nav-link--active {
}
```

### Responsive Design

Use SCSS breakpoints:

```scss
.my-component {
  display: block;

  @media (min-width: $breakpoint-md) {
    display: flex;
  }

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Using Tailwind Classes

Tailwind CSS is available via CDN in templates:

```html
<div class="flex items-center justify-between">
  <div class="hidden md:flex space-x-4">
    <!-- Content -->
  </div>
</div>
```

## Template Development

### Mako Template Basics

OpenEDX uses Mako templates. Key concepts:

**Variables:**

```html
${user.username} ${settings.PLATFORM_NAME} ${page_title}
```

**Conditionals:**

```html
% if user.is_authenticated:
<p>Welcome, ${user.username}!</p>
% else:
<p>Please log in</p>
% endif
```

**Loops:**

```html
% for course in courses:
<div>${course.display_name}</div>
% endfor
```

**Includes:**

```html
<%include file="header.html" />
```

### Common Template Variables

```python
user                    # Current user object
user.username          # Username
user.email             # Email
user.is_authenticated  # Boolean
user.is_staff          # Boolean
settings               # Django settings
PLATFORM_NAME          # Platform name
page_title             # Current page title
```

### URL Generation

```html
<!-- Reverse URL lookup -->
<a href="${reverse('dashboard')}">Dashboard</a>
<a href="${reverse('signin_user')}">Login</a>
<a href="${reverse('logout')}">Logout</a>

<!-- Marketing pages -->
<a href="${marketing_link('ROOT')}">Home</a>

<!-- Static files -->
<link rel="stylesheet" href="${static.url('css/lms.css')}" />
<img src="${static.url('images/logo.png')}" />
```

### Creating New Templates

1. Create template file in `lms/templates/` or `cms/templates/`
2. Override default OpenEDX template by using the same path
3. Use Mako inheritance for partial overrides

Example - Override course page:

```html
## File: lms/templates/courseware/course.html
<%inherit file="/main.html" />

<%block name="title">
    ${course.display_name} | ${settings.PLATFORM_NAME}
</%block>

<%block name="content">
    <div class="course-wrapper">
        <!-- Custom course content -->
    </div>
</%block>
```

## Best Practices

### Performance

1. **Optimize images**: Use compressed images and appropriate formats
2. **Minimize CSS**: The build process automatically minifies
3. **Lazy load**: Load non-critical resources lazily
4. **Cache static assets**: Use versioned URLs

### Accessibility

1. **Semantic HTML**: Use appropriate HTML elements
2. **ARIA labels**: Add labels for screen readers
3. **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
4. **Color contrast**: Maintain WCAG AA contrast ratios

Example:

```html
<button class="idei-header__mobile-toggle" aria-label="Toggle menu">
  <svg aria-hidden="true">...</svg>
</button>
```

### Responsive Design

1. **Mobile-first**: Start with mobile styles, add desktop enhancements
2. **Test on real devices**: Use physical devices when possible
3. **Touch targets**: Ensure buttons are at least 44x44px
4. **Flexible layouts**: Use flexbox and grid for responsive layouts

### Code Organization

1. **One component per file**: Keep SCSS files focused
2. **Reusable variables**: Define colors, spacing, etc. in `_variables.scss`
3. **Document complex code**: Add comments for non-obvious code
4. **Version control**: Commit working versions regularly

### Testing Checklist

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile (iOS and Android)
- [ ] Test with different user roles
- [ ] Test course pages, dashboard, profile
- [ ] Test forms (login, registration)
- [ ] Check accessibility with screen reader
- [ ] Validate HTML/CSS
- [ ] Check browser console for errors

## Common Customizations

### Change Primary Color

```scss
// In _variables.scss
$primary-color: #your-color;
$primary-hover: #your-hover-color;
```

### Add Custom Font

```scss
// In _variables.scss
@import url("https://fonts.googleapis.com/css2?family=Your+Font&display=swap");

$font-family: "Your Font", -apple-system, BlinkMacSystemFont, sans-serif;
```

### Customize Course Cards

```scss
// In layouts/_course.scss
.course-card {
  border-radius: $border-radius-lg;
  box-shadow: $shadow;
  transition: $transition-base;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
}
```

### Add Custom JavaScript

```javascript
// In lms/static/js/custom.js
(function () {
  "use strict";

  // Your custom JavaScript
  console.log("Custom JS loaded");
})();
```

Include in template:

```html
<script src="${static.url('js/custom.js')}"></script>
```

## Troubleshooting

### Styles Not Updating

```bash
# Rebuild theme
cd theme && npm run build && cd ..

# Clear browser cache
# Restart services
tutor local restart lms cms
```

### SCSS Compilation Errors

Check the console output when running `npm run watch`. Common issues:

- Missing semicolons
- Incorrect variable names
- Invalid nesting

### Template Errors

Check Tutor logs:

```bash
tutor local logs -f lms
```

Common issues:

- Syntax errors in Mako code
- Missing imports
- Undefined variables

## Resources

- **OpenEDX Theming**: https://docs.openedx.org/en/latest/site_ops/how-tos/theming.html
- **Mako Templates**: https://docs.makotemplates.org/
- **SCSS Guide**: https://sass-lang.com/guide
- **Tailwind CSS**: https://tailwindcss.com/docs
- **BEM Methodology**: http://getbem.com/

## Support

For questions or issues:

- Check the [SETUP-GUIDE.md](./SETUP-GUIDE.md)
- Review Tutor documentation
- Contact: contact@asociatia-idei.eu
