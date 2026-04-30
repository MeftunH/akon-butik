import { useCallback } from "react";

type PaginationProps = {
  totalPages?: number; // defaults to 5
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onPageChange?: (page: number) => void;
};

export default function Pagination({
  totalPages = 5,
  onPageChange,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        onPageChange?.(page);
      }
    },
    [setCurrentPage, onPageChange, totalPages]
  );

  if (!totalPages || totalPages < 1) return null;

  return (
    <>
      {/* Previous */}
      <button
        type="button"
        className="pagination-item h6 direct"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="icon icon-caret-left" />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) =>
        pageNum === currentPage ? (
          <span key={pageNum} className="pagination-item h6 active">
            {pageNum}
          </span>
        ) : (
          <button
            type="button"
            key={pageNum}
            className="pagination-item h6"
            onClick={() => goToPage(pageNum)}
          >
            {pageNum}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        className="pagination-item h6 direct"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <i className="icon icon-caret-right" />
      </button>
    </>
  );
}
