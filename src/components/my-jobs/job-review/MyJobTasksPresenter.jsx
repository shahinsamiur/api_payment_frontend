"use client";

import Card from "@/components/libs/Card";
import Pagination from "@/components/libs/Pagination";
import useJobReview from "@/hooks/dashboardLayout/useJobReview";
import { useState } from "react";
import JobReportView from "./JobReportView";
import JobReviewHeader from "./JobReviewHeader";
import JobSubmissionTable from "./JobSubmissionTable";

export default function MyJobTasksPresenter() {
  const { jobSubmissions, page, setPage } = useJobReview();
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleClerSelectedId = () => {
    setSelectedTaskIds([]);
    setIsAllSelected(false);
  };

  const handleSingleSelect = (id) => {
    if (selectedTaskIds.includes(id)) {
      setSelectedTaskIds((prev) =>
        prev.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedTaskIds((prev) => [...prev, id]);
    }
  };

  const handleToggleSelectAll = () => {
    if (!jobSubmissions?.data?.length) return;
    if (isAllSelected) {
      setSelectedTaskIds([]);
      setIsAllSelected(false);
    } else {
      const allIds = jobSubmissions?.data
        .filter((item) => item.status === "UNDER_REVIEW")
        .map((item) => item.id);
      setSelectedTaskIds(allIds);
      setIsAllSelected(true);
    }
  };

  return (
    <div className="space-y-4 lg:space-y-5">
      <JobReportView />
      <Card>
        <JobReviewHeader
          onClerSelectedId={handleClerSelectedId}
          selectedTaskIds={selectedTaskIds}
        />
        <JobSubmissionTable
          isAllSelected={isAllSelected}
          onSingleSelect={handleSingleSelect}
          onToggleSelectAll={handleToggleSelectAll}
          selectedTaskIds={selectedTaskIds}
        />

        <Pagination
          currentPage={page}
          totalPages={jobSubmissions?.last_page || 1}
          onPageChange={(value) => setPage(value)}
        />
      </Card>
    </div>
  );
}
