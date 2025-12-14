import Button from "@/components/libs/Button";
import { useState } from "react";
import ExtendDeadlineModal from "../ExtendDeadlineModal";

const ExtendDeadline = ({ jobData }) => {
  const [showExtendModal, setShowExtendDeadlineModal] = useState(false);

  const requiredWorker = jobData?.total_worker_required;
  const totalSatified = parseInt(jobData?.total_satisfied_count || "0");

  if (jobData?.job_status === "EXPIRED" && requiredWorker !== totalSatified) {
    return (
      <>
        <Button onClick={() => setShowExtendDeadlineModal(true)}>
          Extend Deadline
        </Button>

        {showExtendModal && (
          <ExtendDeadlineModal
            open={showExtendModal}
            setOpen={setShowExtendDeadlineModal}
            jobId={jobData.id}
          />
        )}
      </>
    );
  } else return null;
};

export default ExtendDeadline;
