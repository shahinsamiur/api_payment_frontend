import {
  useBoostJobMutation,
  useDeleteJobMutation,
  useGetMyJobsQuery,
  usePinJobMutation,
  usePlayAndPauseJobMutation,
  useUpdateDaysAndWorkerMutation,
} from "@/store/features/jobs";
import { useState } from "react";
import { toast } from "react-toastify";

export const useMyJobsData = () => {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetMyJobsQuery({ page, status });
  const [deleteJob, { isLoading: isDeleteLoading }] = useDeleteJobMutation();
  const [playAndPause, { isLoading: isPlayAndPauseLoading }] =
    usePlayAndPauseJobMutation();
  const [pinJob, { isLoading: isPinningJob }] = usePinJobMutation();
  const [boostJob, { isLoading: isBoostingJob }] = useBoostJobMutation();
  const [updateJobs, { isLoading: isUpdatingJob }] =
    useUpdateDaysAndWorkerMutation();

  const handleDelete = async (id) => {
    try {
      await deleteJob({ id, force: false }).unwrap();
      toast.success("Job deleted successfully");
      return true; // Indicate success
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Internal Server Error"
      );
      return false; // Indicate failure
    }
  };

  const handlePlayAndPause = async (id) => {
    try {
      const res = await playAndPause(id);
      toast.success(res.data.message);
      return true; // Indicate success
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Internal Server Error"
      );
      return false; // Indicate failure
    }
  };

  const handlePin = async (e, { minutes, id, cb }) => {
    e.preventDefault();

    try {
      const payload = {
        minutes,
        job_id: id,
      };
      await pinJob(payload).unwrap();
      toast.success("Job Pined successfully");
      cb();
    } catch (err) {
      toast.error(err.data?.message || "Internal server error");
    }
  };

  const handleBoost = async (e, { minutes, jobId, cb }) => {
    e.preventDefault();

    try {
      const payload = {
        minutes,
        job_id: jobId,
      };
      await boostJob(payload).unwrap();
      toast.success("Job Boosted successfully");
      cb();
    } catch (err) {
      toast.error(err.data?.message || "Internal server error");
    }
  };

  const handleUpdateJob = async ({ payload, cb }) => {
    try {
      await updateJobs(payload).unwrap();
      toast.success("Job updated successfully");
      cb();
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  };

  return {
    data,
    isLoading,
    isDeleteLoading,
    isPlayAndPauseLoading,
    status,
    page,
    setStatus,
    setPage,
    handleDelete,
    handlePlayAndPause,
    handlePin,
    isPinningJob,
    handleBoost,
    isBoostingJob,
    handleUpdateJob,
    isUpdatingJob,
  };
};
