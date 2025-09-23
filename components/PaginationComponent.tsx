"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PaginationProps = {
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  limitOptions?: number[];
};

export function PaginationComponent({
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  limitOptions = [10, 20, 50, 100], // default options
}: PaginationProps) {
  const maxRange = 3; // how many pages to show before/after ellipsis

  if (totalPages <= 1) return null; // hide if only 1 page

  return (
    <div className="w-full flex items-center justify-between flex-wrap gap-4 mt-6">
      {/* Pagination buttons */}
      <div>
        <Pagination className="w-fit justify-start">
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, page - 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {/* First */}
            <PaginationItem>
              <PaginationLink
                isActive={page === 1}
                onClick={() => onPageChange(1)}
                className="border-none bg-[#222222] text-[#cccccc] hover:bg-[#333333]"
              // style={{
              //   border: "none",
              //   background: "#222222",
              //   color: "#cccccc",
              //   "&:hover": {
              //     background: "#333333",
              //   },
              // }}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {/* Ellipsis before */}
            {page > maxRange + 2 && (
              <PaginationItem>
                <PaginationEllipsis className="pointer-events-none opacity-50" />
              </PaginationItem>
            )}

            {/* Middle pages */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p !== 1 &&
                  p !== totalPages &&
                  p >= page - maxRange &&
                  p <= page + maxRange
              )
              .map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={page === p}
                    onClick={() => onPageChange(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {/* Ellipsis after */}
            {page < totalPages - (maxRange + 1) && (
              <PaginationItem>
                <PaginationEllipsis className="pointer-events-none opacity-50" />
              </PaginationItem>
            )}

            {/* Last */}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  isActive={page === totalPages}
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                className={page === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Page size selector */}
      <div className="flex items-center gap-2">
        {/* <span className="text-sm text-muted-foreground">Errands per page:</span> */}

        <Select
          value={String(limit)}
          onValueChange={(val) => {
            onLimitChange(Number(val));
            onPageChange(1); // reset to first page when limit changes
          }}
        >
          <SelectTrigger className="w-[100px] h-9 border-none" style={{ background: "#222222" }}>
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent className="border-none">
            {limitOptions.map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
