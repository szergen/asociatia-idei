import { Builder } from "@builder.io/react";

Builder.register("model", {
  name: "product",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "richText", required: true },
    {
      name: "image",
      type: "file",
      required: true,
      allowedFileTypes: ["jpeg", "png", "webp"],
    },
    {
      name: "gallery",
      type: "list",
      subFields: [{ name: "image", type: "file" }],
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
