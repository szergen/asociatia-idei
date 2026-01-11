import { builder } from "@builder.io/react";

// Define Builder.io models and their schemas
export const builderModels = {
  // Full page model
  page: {
    name: "page",
    fields: [
      {
        name: "title",
        type: "string",
        required: true,
        defaultValue: "New Page",
      },
      {
        name: "description",
        type: "longText",
        defaultValue: "Page description for SEO",
      },
      {
        name: "url",
        type: "string",
        required: true,
        helperText: "URL path for this page (e.g., /about-us)",
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
        helperText: "Featured image for social sharing",
      },
      {
        name: "useLayout",
        type: "boolean",
        defaultValue: true,
        helperText: "Whether to include header and footer",
      },
      {
        name: "published",
        type: "boolean",
        defaultValue: false,
      },
    ],
  },

  // Section model for reusable page sections
  section: {
    name: "section",
    fields: [
      {
        name: "name",
        type: "string",
        required: true,
        helperText: "Unique identifier for this section",
      },
      {
        name: "title",
        type: "string",
        defaultValue: "Section Title",
      },
      {
        name: "description",
        type: "longText",
        defaultValue: "Section description",
      },
      {
        name: "published",
        type: "boolean",
        defaultValue: true,
      },
    ],
  },

  // Symbol model for small reusable components
  symbol: {
    name: "symbol",
    fields: [
      {
        name: "name",
        type: "string",
        required: true,
        helperText: "Unique identifier for this symbol",
      },
      {
        name: "category",
        type: "string",
        enum: ["header", "footer", "cta", "testimonial", "form", "other"],
        defaultValue: "other",
      },
    ],
  },

  // Data model for headless content
  data: {
    name: "data",
    fields: [
      {
        name: "type",
        type: "string",
        required: true,
        enum: [
          "site-settings",
          "testimonial",
          "team-member",
          "project",
          "event",
          "blog-post",
          "faq",
          "contact-info",
        ],
        helperText: "Type of data entry",
      },
      {
        name: "title",
        type: "string",
        required: true,
      },
      {
        name: "slug",
        type: "string",
        helperText: "URL-friendly identifier",
      },
      {
        name: "published",
        type: "boolean",
        defaultValue: true,
      },
      {
        name: "publishDate",
        type: "date",
        defaultValue: new Date().toISOString(),
      },
      {
        name: "featured",
        type: "boolean",
        defaultValue: false,
      },
      {
        name: "tags",
        type: "list",
        subFields: [
          {
            name: "tag",
            type: "string",
          },
        ],
      },
    ],
  },
};

// Custom components that can be used in Builder.io
export const customComponents = [
  {
    name: "HeroSection",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "Welcome to Our Website",
      },
      {
        name: "subtitle",
        type: "longText",
        defaultValue: "This is a subtitle that provides more context",
      },
      {
        name: "backgroundImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
      },
      {
        name: "ctaText",
        type: "string",
        defaultValue: "Get Started",
      },
      {
        name: "ctaLink",
        type: "url",
        defaultValue: "/contact",
      },
    ],
  },
  {
    name: "TestimonialCard",
    inputs: [
      {
        name: "quote",
        type: "longText",
        required: true,
      },
      {
        name: "author",
        type: "object",
        subFields: [
          {
            name: "name",
            type: "string",
            required: true,
          },
          {
            name: "position",
            type: "string",
          },
          {
            name: "company",
            type: "string",
          },
          {
            name: "photo",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
          },
        ],
      },
      {
        name: "rating",
        type: "number",
        min: 1,
        max: 5,
        defaultValue: 5,
      },
    ],
  },
  {
    name: "ProjectCard",
    inputs: [
      {
        name: "title",
        type: "string",
        required: true,
      },
      {
        name: "description",
        type: "longText",
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
      },
      {
        name: "status",
        type: "string",
        enum: ["active", "completed", "upcoming"],
        defaultValue: "active",
      },
      {
        name: "link",
        type: "url",
      },
      {
        name: "tags",
        type: "list",
        subFields: [
          {
            name: "tag",
            type: "string",
          },
        ],
      },
    ],
  },
  {
    name: "ContactForm",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "Get in Touch",
      },
      {
        name: "description",
        type: "longText",
        defaultValue: "We'd love to hear from you!",
      },
      {
        name: "fields",
        type: "list",
        subFields: [
          {
            name: "name",
            type: "string",
            required: true,
          },
          {
            name: "type",
            type: "string",
            enum: ["text", "email", "tel", "textarea"],
            defaultValue: "text",
          },
          {
            name: "required",
            type: "boolean",
            defaultValue: false,
          },
          {
            name: "placeholder",
            type: "string",
          },
        ],
        defaultValue: [
          {
            name: "name",
            type: "text",
            required: true,
            placeholder: "Your Name",
          },
          {
            name: "email",
            type: "email",
            required: true,
            placeholder: "Your Email",
          },
          {
            name: "message",
            type: "textarea",
            required: true,
            placeholder: "Your Message",
          },
        ],
      },
    ],
  },
];

// Initialize models in Builder.io (this would typically be run once during setup)
export const initializeBuilderModels = () => {
  // Note: In a real application, you would register these models
  // through the Builder.io dashboard or API, not in the frontend code
  console.log("Builder.io models defined:", Object.keys(builderModels));
};

// Data schemas for different content types
export const dataSchemas = {
  "site-settings": {
    siteName: "string",
    tagline: "string",
    logo: "file",
    contactEmail: "email",
    contactPhone: "string",
    address: "object",
    socialMedia: "object",
    themeColor: "color",
    maintenanceMode: "boolean",
  },

  testimonial: {
    content: "longText",
    author: "object",
    rating: "number",
    featured: "boolean",
  },

  "team-member": {
    name: "string",
    position: "string",
    bio: "longText",
    photo: "file",
    email: "email",
    socialLinks: "object",
  },

  project: {
    title: "string",
    description: "longText",
    image: "file",
    status: "string",
    startDate: "date",
    endDate: "date",
    budget: "number",
    partners: "list",
    gallery: "list",
  },

  event: {
    title: "string",
    description: "longText",
    date: "date",
    time: "string",
    location: "object",
    image: "file",
    registrationLink: "url",
    capacity: "number",
    price: "number",
  },
};
