import type { Product, FilterValues } from "./ProductFilter.types";
export function filterProducts(
  products: Product[],
  filters: FilterValues
): Product[] {
  return products.filter((product) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    if (filters.category.length > 0) {
      if (!filters.category.includes(product.category)) return false;
    }
    if (filters.stockStatus.length > 0) {
      const stock = product.stock;
      const matchesStatus = filters.stockStatus.some((status) => {
        switch (status) {
          case "in-stock":
            return stock > 10;
          case "low-stock":
            return stock > 0 && stock <= 10;
          case "out-of-stock":
            return stock === 0;
          default:
            return false;
        }
      });
      if (!matchesStatus) return false;
    }
    if (filters.dateFrom && product.date < filters.dateFrom) return false;
    if (filters.dateTo && product.date > filters.dateTo) return false;

    return true;
  });
}

export function countActiveFilters(filters: FilterValues): number {
  return [
    filters.search,
    filters.category.length > 0 ? "has-category" : "",
    filters.stockStatus.length > 0 ? "has-stock" : "",
    filters.dateFrom,
    filters.dateTo,
  ].filter(Boolean).length;
}


export function hasActiveFilters(filters: FilterValues): boolean {
  return (
    !!filters.search ||
    filters.category.length > 0 ||
    filters.stockStatus.length > 0 ||
    !!filters.dateFrom ||
    !!filters.dateTo
  );
}
