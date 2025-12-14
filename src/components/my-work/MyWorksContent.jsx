import Pagination from "@/components/libs/Pagination";
import { useGetTasksQuery } from "@/store/features/my-work";
import { useState } from "react";
import Card from "../libs/Card";
import JobListTable from "./JobListTable";
import MyWorkReportView from "./MyWorkReportView";
import MyWorksFilter from "./MyWorksFilter";

export default function MyWorksContent({
  setShowReportModal,
  setReportJobsId,
  Status = "",
}) {
  const [status, setStatus] = useState(Status);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetTasksQuery({ status, page });

  const tasks = data?.data?.task;
  const totalPages = tasks?.last_page || 1;
  const statistics = data?.data?.statistics || {};

  return (
    <div className="space-y-4">
      <MyWorkReportView data={statistics} isLoading={isLoading} />

      <Card className="!space-y-3">
        <MyWorksFilter
          status={status}
          setStatus={setStatus}
          disabled={Status}
        />
        <JobListTable
          tasks={tasks?.data || []}
          isLoading={isLoading}
          setShowReportModal={setShowReportModal}
          setReportJobsId={setReportJobsId}
        />

        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      </Card>
    </div>
  );
}
