import type { Product } from "@/components/ProductFilter/ProductFilter.types";

export const CATEGORIES = ["Electronics", "Furniture", "Accessories", "Clothing", "Books"];

export const SAMPLE_PRODUCTS: Product[] = Array.from({ length: 100 }, (_, i) => {
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  const status = Math.random() > 0.7 ? (Math.random() > 0.5 ? "low-stock" : "out-of-stock") : "in-stock";
  const stock = status === "out-of-stock" ? 0 : status === "low-stock" ? Math.floor(Math.random() * 10) + 1 : Math.floor(Math.random() * 100) + 20;

  return {
    id: i + 1,
    name: `${category} Item ${i + 1}`,
    sku: `${category.slice(0, 2).toUpperCase()}-${(i + 1).toString().padStart(3, "0")}`,
    category,
    stock,
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split("T")[0],
  };
});
