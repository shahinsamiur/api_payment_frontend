"use client";

import JobReport from "@/components/jobs/JobReport";
import MyWorksContent from "@/components/my-work/MyWorksContent";
import { useState } from "react";

export default function MyWorksPage() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportJobsId, setReportJobsId] = useState(null);

  return (
    <div>
      <MyWorksContent
        setShowReportModal={setShowReportModal}
        setReportJobsId={setReportJobsId}
      />

      {showReportModal && (
        <JobReport
          title="Submit a report agains this job"
          open={showReportModal}
          onOpen={setShowReportModal}
          jobId={reportJobsId}
        />
      )}
    </div>
  );
}
