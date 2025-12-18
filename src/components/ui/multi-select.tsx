import * as React from "react";
import { X, Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type Option = {
    label: string;
    value: string;
};

interface MultiSelectProps {
    options: Option[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select options...",
    className,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter((item) => item !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    const handleRemove = (value: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(selected.filter((item) => item !== value));
    };

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            <div
                className={cn(
                    "flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
                    open && "ring-2 ring-ring ring-offset-2"
                )}
                onClick={() => setOpen(!open)}
            >
                <div className="flex flex-wrap gap-1">
                    {selected.length > 0 ? (
                        selected.map((value) => {
                            const option = options.find((o) => o.value === value);
                            return (
                                <Badge key={value} variant="secondary" className="mr-1">
                                    {option?.label || value}
                                    <button
                                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleRemove(value, e as any);
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onClick={(e) => handleRemove(value, e)}
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </Badge>
                            );
                        })
                    ) : (
                        <span className="text-muted-foreground">{placeholder}</span>
                    )}
                </div>
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </div>

            {open && (
                <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
                    <div className="max-h-60 overflow-auto p-1">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={cn(
                                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer",
                                    selected.includes(option.value) && "bg-accent text-accent-foreground"
                                )}
                                onClick={() => handleSelect(option.value)}
                            >
                                <div
                                    className={cn(
                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                        selected.includes(option.value)
                                            ? "bg-primary text-primary-foreground"
                                            : "opacity-50 [&_svg]:invisible"
                                    )}
                                >
                                    <Check className={cn("h-4 w-4")} />
                                </div>
                                <span>{option.label}</span>
                            </div>
                        ))}
                        {options.length === 0 && (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                No options found.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
