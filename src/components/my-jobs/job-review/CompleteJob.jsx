import Button from "@/components/libs/Button";
import Modal from "@/components/libs/Modal";
import Typography from "@/components/libs/Typography";
import { useMakeJobCompletedMutation } from "@/store/features/jobs";
import { useState } from "react";
import { toast } from "react-toastify";

const CompleteJob = ({ jobData }) => {
  const [showCompleteJobModal, setShowCompleteJobModal] = useState(false);
  const [completeJob, { isLoading: completeJobLoading }] =
    useMakeJobCompletedMutation();

  async function handleJobComplete() {
    try {
      await completeJob({ id: jobData.id, status: "COMPLETED" }).unwrap();
      toast.success("Job Completed Successfully");
      setShowCompleteJobModal(false);
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  }

  const underRaview = parseInt(jobData?.remaining_review || "0");
  const satisfiedCount = parseInt(jobData?.total_satisfied_count || "0");
  const workedCount = parseInt(jobData?.total_worker_required || "0");
  const refundCount = workedCount - satisfiedCount;
  const refundAmount = refundCount * parseFloat(jobData?.pay_per_task || "0");
  const isAvailableToComplete = /EXPIRED|APPROVED/.test(jobData?.job_status);

  if (!jobData || !isAvailableToComplete) return null;
  return (
    <>
      <Button
        onClick={() => setShowCompleteJobModal(true)}
        className="bg-success hover:bg-success/70"
      >
        Complete Job
      </Button>

      <Modal
        open={showCompleteJobModal}
        setOpen={setShowCompleteJobModal}
        title="Complete this job"
        className="w-full max-w-lg"
      >
        <Typography variant="body1" color="warning">
          {underRaview > 0
            ? "You have some submissions under review. You cannot complete this job until all submissions are reviewed."
            : `Once completed, you will not be able to make any further changes to this job.
             `}
        </Typography>
        {!underRaview && refundAmount ? (
          <Typography variant="body2" className="mt-4">
            You will be refunded ${refundAmount.toFixed(4)} for the
            {refundCount} tasks that were not satisfied/unsubmitted.
          </Typography>
        ) : null}

        <div className="flex justify-end items-center gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowCompleteJobModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contain"
            onClick={handleJobComplete}
            loading={completeJobLoading}
            disabled={underRaview > 0}
          >
            Yes, Complete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CompleteJob;
