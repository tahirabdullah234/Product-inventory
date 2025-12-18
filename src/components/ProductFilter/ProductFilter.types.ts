export interface FilterValues {
  search: string;
  category: string[];
  stockStatus: string[];
  dateFrom: string;
  dateTo: string;
}

export interface ProductFilterProps {
  categories: string[];
  onFilterChange: (filters: FilterValues) => void;
  defaultValues?: Partial<FilterValues>;
  showMobileToggle?: boolean;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  date: string;
}

export type StockStatus = "all" | "in-stock" | "low-stock" | "out-of-stock";
