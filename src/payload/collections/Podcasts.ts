import type { CollectionConfig } from "payload";

export const Podcasts: CollectionConfig = {
  slug: "podcasts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["show", "episode", "title", "publishedAt"],
    description: "BriefAsia podcast shows and episodes.",
  },
  fields: [
    { name: "show", type: "text", required: true },
    { name: "episode", type: "text" },
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "textarea", required: true },
    { name: "duration", type: "text", required: true },
    { name: "host", type: "text", required: true },
    { name: "publishedAt", type: "date", required: true, defaultValue: () => new Date().toISOString() },
  ],
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "editor" || req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "editor" || req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
};
