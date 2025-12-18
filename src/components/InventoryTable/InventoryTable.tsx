import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/components/ProductFilter/ProductFilter.types";

interface InventoryTableProps {
    products: Product[];
}

export function InventoryTable({ products }: InventoryTableProps) {
    const getStockBadgeVariant = (stock: number) => {
        if (stock === 0) return "destructive";
        if (stock <= 10) return "outline";
        return "secondary";
    };

    const getStockStatus = (stock: number) => {
        if (stock === 0) return "Out of Stock";
        if (stock <= 10) return "Low Stock";
        return "In Stock";
    };

    return (
        <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[100px] text-xs uppercase text-muted-foreground font-semibold">
                            SKU
                        </TableHead>
                        <TableHead className="text-xs uppercase text-muted-foreground font-semibold">
                            Name
                        </TableHead>
                        <TableHead className="text-xs uppercase text-muted-foreground font-semibold">
                            Category
                        </TableHead>
                        <TableHead className="pl-6 text-xs uppercase text-muted-foreground font-semibold">
                            Status
                        </TableHead>
                        <TableHead className="text-xs uppercase text-muted-foreground font-semibold">
                            Units
                        </TableHead>
                        <TableHead className="text-right text-xs uppercase text-muted-foreground font-semibold">
                            Added Date
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow
                            key={product.id}
                            className="group hover:bg-muted/50 transition-colors"
                        >
                            <TableCell className="font-medium">{product.sku}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell className="pl-6">
                                <div className="flex items-center gap-3">
                                    <Badge
                                        variant={getStockBadgeVariant(product.stock)}
                                        className="whitespace-nowrap"
                                    >
                                        {getStockStatus(product.stock)}
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-sm font-medium">{product.stock}</span>
                            </TableCell>
                            <TableCell className="text-right">{product.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
