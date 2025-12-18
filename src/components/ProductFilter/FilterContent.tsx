import { useEffect } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import type { FilterValues } from "./ProductFilter.types";
import { STOCK_STATUS } from "./ProductFilter.constants";

interface FilterContentProps {
  categories: string[];
  register: UseFormRegister<FilterValues>;
  setValue: UseFormSetValue<FilterValues>;
  handleSubmit: UseFormHandleSubmit<FilterValues>;
  formValues: FilterValues;
  onFilterChange: (data: FilterValues) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export function FilterContent({
  categories,
  register,
  setValue,
  handleSubmit,
  formValues,
  onFilterChange,
  onClearAll,
  hasActiveFilters,
}: FilterContentProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSubmit(onFilterChange)();
    }, 2500);

    return () => clearTimeout(timer);
  }, [JSON.stringify(formValues), handleSubmit, onFilterChange]);

  const categoryOptions = categories.map((cat) => ({
    label: cat,
    value: cat,
  }));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="search">Search Product</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="search"
            placeholder="Search by name or SKU..."
            className="pl-10"
            {...register("search")}
            onChange={(e) => {
              setValue("search", e.target.value);
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <MultiSelect
          options={categoryOptions}
          selected={formValues.category || []}
          onChange={(selected) => {
            setValue("category", selected);
          }}
          placeholder="Select categories"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="stock">Stock Status</Label>
        <MultiSelect
          options={[...STOCK_STATUS]}
          selected={formValues.stockStatus || []}
          onChange={(selected) => {
            setValue("stockStatus", selected);
          }}
          placeholder="Select status"
        />
      </div>

      <div className="space-y-2">
        <Label>Date Range</Label>
        <div className="flex flex-col gap-2">
          <div className="space-y-1">
            <Label htmlFor="dateFrom" className="text-xs text-gray-500">
              From
            </Label>
            <Input
              id="dateFrom"
              type="date"
              {...register("dateFrom")}
              onChange={(e) => {
                setValue("dateFrom", e.target.value);
              }}
              className="block"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="dateTo" className="text-xs text-gray-500">
              To
            </Label>
            <Input
              id="dateTo"
              type="date"
              {...register("dateTo")}
              onChange={(e) => {
                setValue("dateTo", e.target.value);
              }}
              className="block"
            />
          </div>
        </div>
      </div>
      {hasActiveFilters && (
        <Button
          type="button"
          variant="outline"
          onClick={onClearAll}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );
}

