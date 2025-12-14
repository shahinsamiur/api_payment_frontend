"use client";
import useResponsive from "@/hooks/useResponsive";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import IconButton from "./IconButton";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isMobile = useResponsive("down", "md");

  if (totalPages < 2) return null;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const renderPageButton = (page) => {
    if (page === "...") {
      return (
        <span
          key={page + Math.random()}
          className="px-2 text-border text-3xl mt-auto"
        >
          ••••
        </span>
      );
    }

    const isActive = page === currentPage;
    const baseStyles =
      "size-7 md:size-10 flex items-center justify-center border border-border text-sm font-bold mx-1 rounded-sm";
    const activeStyles = "bg-border/50 dark:bg-border";
    const defaultStyles = "dark:text-white border border-border";

    let className = `${baseStyles} ${defaultStyles}`;
    if (isActive) className = `${baseStyles} ${activeStyles}`;
    else if (page < currentPage) className = `${baseStyles} `;

    return (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={className}
      >
        {page}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-between py-2 dark:text-white rounded">
      <div className="flex items-center">
        {getPages().map(renderPageButton)}
      </div>

      <div className="flex gap-2">
        <IconButton
          size={isMobile ? "sm" : "md"}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </IconButton>

        <IconButton
          size={isMobile ? "sm" : "md"}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </IconButton>
      </div>
    </div>
  );
};

export default Pagination;
