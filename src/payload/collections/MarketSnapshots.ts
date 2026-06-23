import type { CollectionConfig } from "payload";

export const MarketSnapshots: CollectionConfig = {
  slug: "marketSnapshots",
  admin: {
    useAsTitle: "market",
    defaultColumns: ["country", "market", "value", "changePct", "updatedAt"],
    description: "Regional market cards for BriefAsia markets pages.",
  },
  fields: [
    { name: "country", type: "text", required: true },
    { name: "market", type: "text", required: true },
    { name: "value", type: "text", required: true },
    { name: "changePct", type: "number", required: true },
    { name: "summary", type: "textarea", required: true },
    { name: "updatedAt", type: "date", required: true, defaultValue: () => new Date().toISOString() },
  ],
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "editor" || req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "editor" || req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
};
