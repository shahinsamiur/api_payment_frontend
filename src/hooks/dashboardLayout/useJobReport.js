import {
  useReportJobMutation,
  useReportSubmissionMutation,
} from "@/store/features/jobs";
import { useState } from "react";
import { toast } from "react-toastify";

const useJobReport = ({ jobId, submissionId }) => {
  const [error, setError] = useState("");
  const [reportJob, { isLoading }] = useReportJobMutation();
  const [reportSubmission, { isLoading: reportSubmissionLoading }] =
    useReportSubmissionMutation();

  async function handleSubmitReport(e, { value, onOpen }) {
    e.preventDefault();
    try {
      if (!value) {
        setError("Please enter a valid value");
        return;
      }
      setError("");

      if (jobId) {
        const payload = {
          job_id: jobId,
          reason: value,
          type: "job",
        };
        await reportJob(payload).unwrap();
      } else if (submissionId) {
        const payload = {
          job_submission_id: submissionId,
          type: "job_submission",
          reason: value,
        };
        await reportSubmission(payload).unwrap();
      }

      toast.success("Report Submitted");
      onOpen(false);
    } catch (error) {
      toast.error(
        error.data?.message || error.message || "Something went wrong"
      );
      setError(error.data?.message || error.message || "Something went wrong");
    }
  }

  return {
    error,
    isLoading: isLoading || reportSubmissionLoading,
    handleSubmitReport,
  };
};

export default useJobReport;
