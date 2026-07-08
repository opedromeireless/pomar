export type Category = {
  id: string;
  slug: string;
  name: string;
  dbValue: "Verduras" | "Frutas" | "Flores";
};

export const categories: Category[] = [
  { id: "verduras", slug: "verduras", name: "Verduras", dbValue: "Verduras" },
  { id: "frutas", slug: "frutas", name: "Frutas", dbValue: "Frutas" },
  { id: "flores", slug: "flores", name: "Flores", dbValue: "Flores" },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
