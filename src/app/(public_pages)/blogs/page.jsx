"use client";
import BlogList from "@/components/blogs/BlogList";
import BlogSearchAndFilter from "@/components/blogs/BlogSearchAndFilter";
import ScrollToTopButton from "@/components/blogs/ScrollToTopButton";
import Pagination from "@/components/libs/Pagination";
import { useDebouncer } from "@/hooks/useDebouncer";
import { useGetBlogsQuery } from "@/store/features/blogs";
import { useState } from "react";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const searchValue = useDebouncer(search);
  const { data: blogs, isLoading } = useGetBlogsQuery({
    page,
    job_category_id: selectedCategory,
    search: searchValue,
  });

  return (
    <section className="container mx-auto px-4 py-10 space-y-4 relative">
      <BlogSearchAndFilter
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <BlogList blogs={blogs} isLoading={isLoading} />

      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={blogs?.data?.last_page || 1}
      />

      <ScrollToTopButton />
    </section>
  );
};

export default Page;
