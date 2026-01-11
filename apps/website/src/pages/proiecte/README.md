# Projects (Proiecte) Pages

This directory contains the projects listing and individual project pages, integrated with Builder.io.

## Overview

The projects section uses Builder.io's **"project-page"** page type to manage both:

- The list of all projects (`/proiecte`)
- Individual project pages (`/proiecte/[slug]`)

## Architecture

### 1. Projects List Page (`index.tsx`)

**URL:** `/proiecte`

Displays a grid of project cards fetched from Builder.io "project-page" pages.

**How it works:**

- Fetches all "project-page" pages from Builder.io at build time via `getStaticProps`
- Stores them as `initialProjects` for SSG (Static Site Generation)
- Also uses `useBuilderList` hook for client-side updates
- Passes project data to `ProjectCard` component for rendering

**Key Features:**

- Server-side rendering with ISR (Incremental Static Regeneration)
- Revalidates every 60 seconds
- Loading skeleton during data fetch
- Error handling with user-friendly messages
- Fallback content for header section

### 2. Individual Project Page (`[slug].tsx`)

**URL:** `/proiecte/[slug]` (e.g., `/proiecte/capacitate-build`)

Renders full Builder.io pages for each project.

**How it works:**

- Dynamic route that matches any slug after `/proiecte/`
- Fetches the specific "project-page" from Builder.io using the URL path
- Renders the full Builder.io page content
- Supports Builder.io's visual editor and preview mode

**Key Features:**

- Static generation with `getStaticPaths` and `getStaticProps`
- Fallback: "blocking" - generates pages on-demand if not pre-built
- Wraps content in `Layout` component (unless `useLayout: false` is set in Builder.io)
- SEO-friendly with meta tags from Builder.io data

## Builder.io Configuration

### Creating a Project Page

1. **Go to Builder.io Dashboard**
2. **Select "project-page" model**
3. **Create New Page**
4. **Set Required Fields:**
   - **URL Path:** `/proiecte/your-slug` (e.g., `/proiecte/green-initiative`)
   - **slug:** `your-slug` (used for routing)
   - **title:** Project title (used in cards and SEO)
   - **description:** Project description (used in cards)
   - **image:** Featured image URL
   - **status:** `active` or `completed`
   - **tags:** Array of tags with `tagName` field

### Field Mapping

The "project-page" fields should match the `ProjectCard` interface:

```typescript
interface ProjectData {
  image?: string; // Featured image
  title: string; // Project title
  status?: "active" | "completed";
  description: string; // Short description
  tags?: ProjectTag[]; // Array of { tagName: string }
  slug?: string; // URL slug (e.g., "green-initiative")
}
```

### URL Structure

Builder.io pages must follow this URL pattern:

- **Correct:** `/proiecte/project-slug`
- **Correct:** Use the `slug` field for cleaner URLs

The system will:

1. Try to use `data.slug` first
2. Fall back to extracting slug from `data.url`

## Static Generation

### Build Time

1. `getStaticPaths` fetches all published "project-page" pages
2. Generates static HTML for each project page
3. List page fetches all projects for the grid

### Runtime

- **ISR (Incremental Static Regeneration):** Pages revalidate every 60 seconds
- **Fallback: "blocking":** New project pages are generated on first request
- **Preview Mode:** Supports Builder.io's preview for unpublished content

## Data Flow

```
Builder.io "project-page"
         ↓
  getStaticProps / useBuilderList
         ↓
    ProjectCard Component
         ↓
  Rendered in /proiecte grid
         ↓
  Click card → /proiecte/[slug]
         ↓
  Full Builder.io page render
```

## File Structure

```
proiecte/
├── index.tsx          # Projects list page
├── [slug].tsx         # Dynamic individual project page
└── README.md          # This file
```

## Example Usage

### Creating a New Project in Builder.io

1. **URL Path:** `/proiecte/community-garden`
2. **Fields:**
   ```json
   {
     "slug": "community-garden",
     "title": "Grădina Comunitară",
     "description": "Un proiect pentru crearea unui spațiu verde...",
     "image": "https://cdn.builder.io/api/v1/image/...",
     "status": "active",
     "tags": [{ "tagName": "Mediu" }, { "tagName": "Comunitate" }]
   }
   ```
3. **Design the page** using Builder.io's visual editor
4. **Publish**
5. The project will automatically appear in `/proiecte` and be accessible at `/proiecte/community-garden`

## Troubleshooting

### Project doesn't appear in the list

- Check if the page is published in Builder.io
- Verify the model name is "project-page"
- Check if all required fields are filled
- Wait for ISR revalidation (60 seconds) or rebuild the site

### Individual project page shows 404

- Verify the slug matches the URL path
- Check if the page is published
- Ensure URL path starts with `/proiecte/`
- Try accessing via direct URL after waiting for fallback generation

### Cards show missing data

- Check if all required fields (title, description) are set in Builder.io
- Verify the data structure matches the `ProjectCard` interface
- Check browser console for data structure in debug logs

## Related Components

- **`ProjectCard`**: `/components/ProjectCard/ProjectCard.tsx`
- **`Layout`**: `/components/Layout/Layout.tsx`
- **`BuilderPage`**: `/builder/components/BuilderPage.tsx`
- **`BuilderData`**: `/builder/components/BuilderData.tsx`

## Best Practices

1. **Always set a slug field** in Builder.io for clean URLs
2. **Use descriptive slugs** (e.g., `sustainable-energy` not `project1`)
3. **Fill all required fields** for proper card display
4. **Optimize images** before uploading to Builder.io
5. **Use the preview mode** to test before publishing
6. **Keep descriptions concise** (3-4 lines) for card display
7. **Tag consistently** using a predefined set of tags
