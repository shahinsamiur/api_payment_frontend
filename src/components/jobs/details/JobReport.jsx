import Button from "@/components/libs/Button";
import { useState } from "react";
import { FaFlag } from "react-icons/fa";
import JobReportModal from "../JobReport";

function JobReport({ id }) {
  const [showReportModal, setShowReportModal] = useState(false);
  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setShowReportModal(true)} variant="warning">
          <FaFlag /> Report
        </Button>
      </div>
      {showReportModal && (
        <JobReportModal
          title="Submit a report agains this job"
          open={showReportModal}
          onOpen={setShowReportModal}
          jobId={id}
        />
      )}
    </>
  );
}

export default JobReport;
