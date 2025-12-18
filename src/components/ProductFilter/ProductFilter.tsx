import { useState } from "react";
import { useForm } from "react-hook-form";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterContent } from "./FilterContent";
import type { ProductFilterProps, FilterValues } from "./ProductFilter.types";
import { DEFAULT_FILTER_VALUES } from "./ProductFilter.constants";
import {
  countActiveFilters,
  hasActiveFilters as checkActiveFilters,
} from "./ProductFilter.utils";

export function ProductFilter({
  categories,
  onFilterChange,
  defaultValues = {},
  showMobileToggle = true,
}: ProductFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, watch, reset, setValue } =
    useForm<FilterValues>({
      defaultValues: {
        ...DEFAULT_FILTER_VALUES,
        ...defaultValues,
      },
    });

  const formValues = watch();

  const handleFilterChange = (data: FilterValues) => {
    onFilterChange(data);
  };

  const handleClearAll = () => {
    reset(DEFAULT_FILTER_VALUES);
    onFilterChange(DEFAULT_FILTER_VALUES);
  };

  const hasFilters = checkActiveFilters(formValues);
  const activeFilterCount = countActiveFilters(formValues);

  return (
    <>
      <div className="hidden lg:block bg-white text-gray-900 p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          {hasFilters && (
            <span className="text-sm text-blue-600 font-medium">
              {activeFilterCount} active
            </span>
          )}
        </div>
        <FilterContent
          categories={categories}
          register={register}
          setValue={setValue}
          handleSubmit={handleSubmit}
          formValues={formValues}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          hasActiveFilters={hasFilters}
        />
      </div>
      {showMobileToggle && (
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasFilters && (
                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full sm:w-96 overflow-y-auto lg:hidden"
            >
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Refine your product search with filters
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent
                  categories={categories}
                  register={register}
                  setValue={setValue}
                  handleSubmit={handleSubmit}
                  formValues={formValues}
                  onFilterChange={handleFilterChange}
                  onClearAll={handleClearAll}
                  hasActiveFilters={hasFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </>
  );
}
