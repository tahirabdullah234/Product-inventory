import { useState, useMemo, useCallback } from "react";
import type {
  FilterValues,
  Product,
} from "@/components/ProductFilter/ProductFilter.types";
import {
  filterProducts,
  DEFAULT_FILTER_VALUES,
} from "@/components/ProductFilter";

export function useProductFilter(products: Product[]) {
  const [filters, setFilters] = useState<FilterValues>(DEFAULT_FILTER_VALUES);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  const handleFilterChange = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
  }, []);

  return {
    filters,
    filteredProducts,
    handleFilterChange,
  };
}
