import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { ProductFilter } from "@/components/ProductFilter";
import { InventoryTable } from "@/components/InventoryTable/InventoryTable";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useProductFilter } from "@/hooks/useProductFilter";
import type { FilterValues } from "@/components/ProductFilter/ProductFilter.types";
import { SAMPLE_PRODUCTS, CATEGORIES } from "@/data/sampleProducts";

export function ProductInventory() {
  const { filters, filteredProducts, handleFilterChange } =
    useProductFilter(SAMPLE_PRODUCTS);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleFilterChangeWrapper = useCallback(
    (newFilters: FilterValues) => {
      if (JSON.stringify(newFilters) === JSON.stringify(filters)) {
        return;
      }

      handleFilterChange(newFilters);
      setCurrentPage(1);
    },
    [handleFilterChange, filters]
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            Product Inventory
          </h1>
          <p className="text-gray-500 mt-2 text-sm lg:text-lg">
            Manage your catalog, track stock, and update your inventory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">

          <div className="lg:col-span-1 w-full">
            <ProductFilter
              categories={CATEGORIES}
              onFilterChange={handleFilterChangeWrapper}
              defaultValues={filters}
              showMobileToggle={true}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border shadow-sm p-6 space-y-6">

              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Products ({filteredProducts.length})
                </h2>
              </div>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">
                    No products found
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Try adjusting your filters
                  </p>
                </div>
              ) : (
                <>
                  <InventoryTable products={paginatedProducts} />

                  {totalPages > 1 && (
                    <Pagination>
                      <PaginationContent className="flex-col gap-4 sm:flex-row sm:gap-1 w-full sm:justify-end">
                        <PaginationItem className="w-full sm:w-auto">
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage((p) => Math.max(1, p - 1));
                            }}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50 w-full justify-center sm:w-auto"
                                : "w-full justify-center sm:w-auto"
                            }
                          />
                        </PaginationItem>

                        <PaginationItem>
                          <ul className="flex flex-wrap justify-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                              .slice(
                                Math.max(0, currentPage - 2),
                                Math.min(totalPages, currentPage + 1)
                              )
                              .map((page) => (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setCurrentPage(page);
                                    }}
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              ))}
                            {totalPages > 5 && currentPage < totalPages - 2 && (
                              <PaginationItem className="hidden sm:inline-block">
                                <PaginationEllipsis />
                              </PaginationItem>
                            )}
                          </ul>
                        </PaginationItem>

                        <PaginationItem className="w-full sm:w-auto">
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage((p) =>
                                Math.min(totalPages, p + 1)
                              );
                            }}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50 w-full justify-center sm:w-auto"
                                : "w-full justify-center sm:w-auto"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
