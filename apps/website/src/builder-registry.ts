import { Builder } from "@builder.io/react";

Builder.register("model", {
  name: "product",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "richText", required: true },
    {
      name: "imageList",
      type: "list",
      required: true,
      subFields: [
        {
          name: "image",
          type: "file",
          required: true,
          allowedFileTypes: ["jpeg", "png", "webp"],
          friendlyName: "Image item",
        },
        {
          name: "alt",
          type: "text",
          friendlyName: "Image item alt",
        },
      ],
    },
    { name: "price", type: "number", required: true },
    {
      name: "stripePriceId",
      type: "text",
      required: true,
      helperText: "e.g., price_1K...",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      helperText: "URL-friendly identifier",
    },
  ],
});
