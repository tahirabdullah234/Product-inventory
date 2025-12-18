export const STOCK_STATUS = [
  { value: "in-stock", label: "In Stock" },
  { value: "low-stock", label: "Low Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
] as const;

export const DEFAULT_FILTER_VALUES = {
  search: "",
  category: [],
  stockStatus: [],
  dateFrom: "",
  dateTo: "",
};
