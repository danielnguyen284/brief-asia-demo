import type { CollectionConfig } from "payload";

export const Newsletters: CollectionConfig = {
  slug: "newsletters",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "cadence", "vertical", "active"],
    description: "Reader newsletter products and signup surfaces.",
  },
  fields: [
    { name: "name", type: "text", required: true, unique: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "cadence", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "vertical", type: "relationship", relationTo: "pillars" },
    { name: "active", type: "checkbox", defaultValue: true },
    { name: "order", type: "number", defaultValue: 0, required: true },
  ],
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "editor" || req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "editor" || req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
};
