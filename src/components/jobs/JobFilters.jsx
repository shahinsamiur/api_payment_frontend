"use client";
import SelectCategoryModel from "@/components/jobs/SelectCategoryModel";
import SelectCountryModal from "@/components/jobs/SelectCountryModal";
import Button from "@/components/libs/Button";
import DropdownMenus from "@/components/libs/DropdownMenus";
import useResponsive from "@/hooks/useResponsive";
import { useState } from "react";

export default function JobFilters({
  countries,
  catagories,
  filter,
  setFilter,
  sortOption,
  setSortOption,
}) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  const isMobile = useResponsive("down", "md");

  const currentSelectedCategoryId = filter.job_category_id;
  const currentSelectedCountryIds = filter.country_ids;

  const selectedCategoryName = catagories?.find(
    (cat) => cat.id === currentSelectedCategoryId
  )?.category_name;

  const categoryBtnLabel = isMobile ? "Category" : "Select Category";
  const countryBtnLabel = isMobile ? "Location" : "Select Location";

  const displayCategoryLabel = selectedCategoryName || categoryBtnLabel;
  const displayCountryLabel =
    currentSelectedCountryIds && currentSelectedCountryIds.length > 0
      ? `${currentSelectedCountryIds.length} Country Selected`
      : countryBtnLabel;

  const handleApplyCategoryFilter = (selectedId) => {
    setFilter((prev) => ({ ...prev, job_category_id: selectedId }));
  };

  const handleApplyCountryFilter = (selectedIds) => {
    if (!selectedIds.length) {
      selectedIds = null;
    }
    setFilter((prev) => ({
      ...prev,
      country_ids: selectedIds,
    }));
  };

  const sortOptions = [
    {
      label: isMobile ? "Recent" : "Recent Job",
      value: "recent",
    },
    {
      label: isMobile ? "Highest" : "Highest Paying",
      value: "highest",
    },
  ];

  return (
    <section className="flex flex-wrap justify-between items-center gap-2 md:gap-5 mb-5">
      <div className="flex flex-wrap items-center gap-2 md:gap-5">
        <Button
          variant="contain"
          onClick={() => setIsCategoryModalOpen(true)}
          size={isMobile ? "sm" : "md"}
        >
          {displayCategoryLabel}
        </Button>
        <Button
          variant="contain"
          onClick={() => setIsCountryModalOpen(true)}
          size={isMobile ? "sm" : "md"}
        >
          {displayCountryLabel}
        </Button>
      </div>
      <DropdownMenus
        placeholder="Sort"
        size={isMobile ? "sm" : "md"}
        options={sortOptions}
        selected={sortOption}
        setSelected={setSortOption}
      />

      {isCategoryModalOpen && (
        <SelectCategoryModel
          open={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          data={catagories}
          selected={currentSelectedCategoryId}
          applyFilter={handleApplyCategoryFilter}
        />
      )}
      {isCountryModalOpen && (
        <SelectCountryModal
          open={isCountryModalOpen}
          onClose={() => setIsCountryModalOpen(false)}
          data={countries}
          applyFilter={handleApplyCountryFilter}
        />
      )}
    </section>
  );
}
