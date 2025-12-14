"use client";
import Card from "@/components/libs/Card";
import Pagination from "@/components/libs/Pagination";
import useResponsive from "@/hooks/useResponsive";
import {
  useFindJobsQuery,
  useGetCatagoryQuery,
  useGetCountriesQuery,
} from "@/store/features/jobs";
import { useEffect, useState } from "react";
import JobFilters from "@/components/jobs/JobFilters";
import JobsList from "@/components/jobs/JobsList";
export default function FindJobs() {
  const [filter, setFilter] = useState({
    job_category_id: null,
    country_ids: null,
    recent: true,
    highest_paying: false,
    page: 1,
  });
  const [sortOption, setSortOption] = useState("recent");
  const { data: countriesData } = useGetCountriesQuery();
  const { data: catagoriesData } = useGetCatagoryQuery();
  const isMobile = useResponsive("down", "md");
  useEffect(() => {
    if (sortOption === "recent") {
      setFilter((prev) => ({ ...prev, recent: true, highest_paying: false }));
    } else if (sortOption === "highest") {
      setFilter((prev) => ({
        ...prev,
        recent: false,
        highest_paying: true,
      }));
    }
  }, [sortOption]);
  const { data: jobsData, isLoading: jobsLoading } = useFindJobsQuery(filter);
  const countries = countriesData?.data;
  const catagories = catagoriesData?.data;
  return (
    <section>
      <Card>
        <JobFilters
          countries={countries}
          catagories={catagories}
          isMobile={isMobile}
          filter={filter}
          setFilter={setFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        <JobsList jobsData={jobsData} jobsLoading={jobsLoading} />
        <Pagination
          currentPage={filter.page}
          totalPages={jobsData?.data.last_page || 1}
          onPageChange={(value) =>
            setFilter((prev) => ({ ...prev, page: value }))
          }
        />
      </Card>
    </section>
  );
}
