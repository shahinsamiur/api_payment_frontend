"use client";
import Button from "@/components/libs/Button";
import IconButton from "@/components/libs/IconButton";
import { useGetBlogCategoriesQuery } from "@/store/features/blogs";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import OutlinedInput from "../libs/OutlinedInput";

const BlogSearchAndFilter = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [hideCategory, setHideCategory] = useState(false);
  const { data: categories, isLoading: loadingCategory } =
    useGetBlogCategoriesQuery();

  return (
    <>
      <div className="flex items-center gap-3 mt-6 lg:mt-10">
        <div className="relative w-full max-w-lg">
          <OutlinedInput
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            endIcon={<FaSearch />}
          />
        </div>
        <IconButton
          className="rounded-md"
          onClick={() => setHideCategory((prev) => !prev)}
        >
          {hideCategory ? <FaChevronDown /> : <FaChevronUp />}
        </IconButton>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          hideCategory ? "max-h-0" : "max-h-screen"
        }`}
      >
        <div className="flex flex-wrap gap-2 mb-8">
          {categories?.data?.length ? (
            <Button
              variant={selectedCategory ? "outline" : "contain"}
              onClick={() => setSelectedCategory("")}
            >
              All
            </Button>
          ) : null}
          {loadingCategory
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item}>
                  <div className="h-9 bg-card animate-pulse w-24 rounded-2xl" />
                </div>
              ))
            : categories?.data?.map((category) => (
                <Button
                  variant={
                    category.id === selectedCategory ? "contain" : "outline"
                  }
                  onClick={() =>
                    setSelectedCategory((prev) => {
                      if (prev === category.id) {
                        return null;
                      }
                      return category.id;
                    })
                  }
                  key={category.id}
                >
                  {category.category_name}
                </Button>
              ))}
        </div>
      </div>
    </>
  );
};

export default BlogSearchAndFilter;
