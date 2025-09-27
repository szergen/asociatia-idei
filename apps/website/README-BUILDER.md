# Builder.io Integration Guide

This website is integrated with Builder.io for content management. Here's how to set it up and use it.

## Setup

### 1. Environment Variables

Create a `.env.local` file in the website root with:

```bash
NEXT_PUBLIC_BUILDER_PUBLIC_KEY=your_builder_io_public_key_here
BUILDER_PUBLIC_KEY=your_builder_io_public_key_here
```

### 2. Builder.io Account Setup

1. Create an account at [builder.io](https://builder.io)
2. Create a new space for your website
3. Get your public API key from the account settings
4. Add the API key to your environment variables

## Builder.io Models

The website uses several Builder.io models:

### 1. Page Model (`page`)

- **Purpose**: Full pages that are completely managed by Builder.io
- **URL**: `/[...page]` (dynamic routing)
- **Features**: Complete control over page layout and content
- **Use case**: Landing pages, marketing pages, special event pages

### 2. Section Model (`section`)

- **Purpose**: Reusable page sections that can be embedded in existing pages
- **Features**: Can be inserted into any page as a component
- **Use case**: Hero sections, testimonials, feature highlights

### 3. Symbol Model (`symbol`)

- **Purpose**: Small reusable components
- **Features**: Can be embedded anywhere in the site
- **Use case**: CTAs, banners, small content blocks

### 4. Data Model (`data`)

- **Purpose**: Headless content management
- **Features**: Structured data without visual editing
- **Use case**: Team members, projects, testimonials, site settings

## Page Types Examples

### Full Builder.io Pages

Access: `yoursite.com/any-custom-url`

- Complete control over the entire page
- Can include or exclude site header/footer
- Perfect for landing pages and marketing content

### Section-Based Pages

Access: Built into existing pages (like homepage)

- Mix of hardcoded content and Builder.io sections
- Maintains consistent site structure
- Perfect for enhancing existing pages

### Headless Data Pages

Access: `yoursite.com/exemple/headless-data`

- Fetches structured data from Builder.io
- Renders with custom React components
- Perfect for dynamic content like team listings, projects

## Content Types

### Site Settings

```json
{
  "type": "site-settings",
  "siteName": "Asociația IDEI",
  "contactEmail": "contact@asociatia-idei.ro",
  "themeColor": "#2563eb",
  "maintenanceMode": false
}
```

### Project

```json
{
  "type": "project",
  "title": "Project Name",
  "description": "Project description...",
  "status": "active",
  "tags": ["education", "community"]
}
```

### Team Member

```json
{
  "type": "team-member",
  "name": "John Doe",
  "position": "Director",
  "bio": "Bio text...",
  "photo": "image-url"
}
```

### Testimonial

```json
{
  "type": "testimonial",
  "content": "Great experience...",
  "author": {
    "name": "Jane Smith",
    "position": "Community Member"
  },
  "rating": 5
}
```

## How to Use

### Creating a New Full Page

1. Go to Builder.io dashboard
2. Create new content in "page" model
3. Set the URL path (e.g., `/about-us`)
4. Design your page using the visual editor
5. Publish the page

### Adding a Section to Homepage

1. Go to Builder.io dashboard
2. Create new content in "section" model
3. Name it (e.g., "homepage-hero")
4. Design your section
5. The homepage will automatically fetch and display it

### Adding Structured Data

1. Go to Builder.io dashboard
2. Create new content in "data" model
3. Set the type (e.g., "team-member")
4. Fill in the structured fields
5. The relevant pages will automatically fetch and display the data

### Creating Reusable Symbols

1. Go to Builder.io dashboard
2. Create new content in "symbol" model
3. Name it (e.g., "homepage-cta")
4. Design your symbol
5. Use `<BuilderSymbol name="homepage-cta" />` in your code

## Development

### Testing Builder.io Content Locally

1. Set up your environment variables
2. Run `npm run dev`
3. Visit different page types:
   - Homepage: `http://localhost:3000`
   - Dynamic pages: `http://localhost:3000/your-builder-page`
   - Headless example: `http://localhost:3000/exemple/headless-data`

### Preview Mode

Enable Next.js preview mode to see unpublished Builder.io content:
`http://localhost:3000/api/preview?secret=your-preview-secret&model=page&url=/your-page`

## Components Reference

### BuilderPage

```tsx
import { BuilderPage } from "../builder";
<BuilderPage page={page} model="page" />;
```

### BuilderSection

```tsx
import { BuilderSection } from '../builder';
<BuilderSection content={sectionContent} />
<BuilderSection name="section-name" />
```

### BuilderSymbol

```tsx
import { BuilderSymbol } from "../builder";
<BuilderSymbol name="symbol-name" data={{ customProp: "value" }} />;
```

### BuilderData

```tsx
import { BuilderData } from "../builder";
<BuilderData model="data" query={{ "data.type": "testimonial" }}>
  {(data) => <div>{data.content}</div>}
</BuilderData>;
```

### Hooks

```tsx
import { useBuilderData, useBuilderList } from "../builder";

// Single item
const { data, loading, error } = useBuilderData("data", {
  "data.type": "site-settings",
});

// Multiple items
const {
  data: projects,
  loading,
  error,
} = useBuilderList("data", {
  query: { "data.type": "project" },
});
```

## Best Practices

1. **Use appropriate models**:

   - `page` for complete custom pages
   - `section` for reusable page sections
   - `symbol` for small components
   - `data` for structured content

2. **Naming conventions**:

   - Use kebab-case for URLs and names
   - Prefix sections with page name (e.g., "homepage-hero")
   - Use descriptive names for symbols

3. **Performance**:

   - Use static generation with revalidation
   - Implement proper loading states
   - Cache Builder.io responses when possible

4. **Content Strategy**:
   - Plan your content models before implementation
   - Use consistent field names across models
   - Document your content types for editors

## Troubleshooting

### Common Issues

1. **Missing API Key**: Ensure `NEXT_PUBLIC_BUILDER_PUBLIC_KEY` is set
2. **Content Not Loading**: Check the model name and query parameters
3. **404 Errors**: Verify the URL path in Builder.io matches your route
4. **Styling Issues**: Ensure Tailwind CSS classes are available

### Debug Mode

Add this to see Builder.io debug information:

```tsx
import { builder } from "@builder.io/react";
builder.debug = true;
```
