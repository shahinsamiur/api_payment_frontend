import {
  useGetTaskSubmissionByJobQuery,
  useSatisfyMultipleTaskMutation,
  useSatisfySingleTaskMutation,
  useUnSatisfyMultipleTaskMutation,
  useUnsatisfySingleTaskMutation,
} from "@/store/features/jobSubmission";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const useJobReview = () => {
  const [isSingleUnsatisfying, setIsSingleUnsatisfying] = useState(-1);
  const [isSinglesatisfying, setIsSingleSatisfying] = useState(-1);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const params = useSearchParams();
  const jobId = params.get("job_id");
  const jobSlug = params.get("job_slug");

  const { data, isLoading } = useGetTaskSubmissionByJobQuery(
    { id: jobId, page, status },
    { skip: !jobId }
  );
  const jobSubmissions = data?.data?.submitted_tasks;
  const basicJobInfo = data?.data?.job || {};

  const [unSatisfySingle] = useUnsatisfySingleTaskMutation();
  const [satisfySingle] = useSatisfySingleTaskMutation();
  const [satisfyMultiple, { isLoading: isMultipleSatisfing }] =
    useSatisfyMultipleTaskMutation();
  const [unStisfyMultiple, { isLoading: isMultipleUnsatisfing }] =
    useUnSatisfyMultipleTaskMutation();

  const handleSatisfySignle = async (id) => {
    try {
      setIsSingleSatisfying(id);
      await satisfySingle({ job_submission_id: id }).unwrap();
      toast.success("Successfully satisfied");
    } catch (error) {
      toast.error(error.data?.message);
    } finally {
      setIsSingleSatisfying(-1);
    }
  };

  const handleUnSatisfySingle = async (id) => {
    try {
      setIsSingleUnsatisfying(id);
      await unSatisfySingle({ job_submission_id: id }).unwrap();
      toast.success("Successfully unsatisfied");
    } catch (error) {
      toast.error(error.data?.message);
    } finally {
      setIsSingleUnsatisfying(-1);
    }
  };

  const handleMultipleSatisfy = async (taskIds, cb) => {
    try {
      if (!taskIds.length) {
        throw { message: "No Proofs Selected To Marked Satisfied" };
      }
      await satisfyMultiple({ job_submission_ids: taskIds });
      toast.success("Successfully satisfied all");
      cb();
    } catch (error) {
      toast.error(error.data?.message || error?.message);
    }
  };

  const handleMultipleUnsatisfy = async (taskIds, cb) => {
    try {
      if (!taskIds.length) {
        throw { message: "No Proofs Selected To Marked Unsatisfied" };
      }
      await unStisfyMultiple({
        job_submission_ids: taskIds,
        rejection_reason: "froad",
      });
      toast.success("Successfully unsatisfied all");
      cb();
    } catch (error) {
      toast.error(error.data?.message || error?.message);
    }
  };

  return {
    handleSatisfySignle,
    handleUnSatisfySingle,
    isMultipleSatisfing,
    isMultipleUnsatisfing,
    handleMultipleSatisfy,
    handleMultipleUnsatisfy,
    isSinglesatisfying,
    isSingleUnsatisfying,
    data,
    isLoading,
    jobSubmissions,
    basicJobInfo,
    setPage,
    page,
    status,
    setStatus,
    jobId,
    satisfySingle,
    unSatisfySingle,
    jobSlug,
  };
};

export default useJobReview;
