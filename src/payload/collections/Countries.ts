import type { CollectionConfig } from "payload";

export const Countries: CollectionConfig = {
  slug: "countries",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "region", "slug", "order"],
    description: "BriefAsia country coverage hubs and article geography.",
  },
  fields: [
    { name: "name", type: "text", required: true, unique: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "region",
      type: "select",
      required: true,
      options: [
        { label: "Southeast Asia", value: "southeast-asia" },
        { label: "East Asia", value: "east-asia" },
        { label: "South Asia", value: "south-asia" },
      ],
    },
    { name: "description", type: "textarea" },
    { name: "order", type: "number", defaultValue: 0, required: true },
  ],
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "editor" || req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "editor" || req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
};
