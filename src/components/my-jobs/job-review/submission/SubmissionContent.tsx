"use client";

import LoadingIndicator from "@/components/common/LoadingIndicator";
import ZoomedImage from "@/components/common/ZoomedImage";
import JobReport from "@/components/jobs/JobReport";
import Button from "@/components/libs/Button";
import Card from "@/components/libs/Card";
import IconButton from "@/components/libs/IconButton";
import Typography from "@/components/libs/Typography";
import useJobReview from "@/hooks/dashboardLayout/useJobReview";
import { useGetSingleTaskByIdQuery } from "@/store/features/jobSubmission";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck, FaFlag, FaSmile, FaTimes } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import GiveTipsModal from "./GiveTipsModal";
import RateUser from "./RateUser";

export default function SubmissionContent({ id }: { id: string }) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const { satisfySingle, unSatisfySingle } = useJobReview();
  const [isSubmitting, setIsSubmitting] = useState("");
  const router = useRouter();

  const { data, isLoading } = useGetSingleTaskByIdQuery(id);

  enum Satisfaction {
    Satisfied = "Satisfied",
    UnSatisfied = "UnSatisfied",
  }

  const handleTaskReview = async (type: Satisfaction) => {
    try {
      setIsSubmitting(type);
      if (type === Satisfaction.Satisfied) {
        await satisfySingle({ job_submission_id: id });
      } else {
        await unSatisfySingle({ job_submission_id: id });
      }

      toast.success("Task Reviewed Successfully");
      router.push(`/my-jobs/job-review?job_id=${data?.data?.job_id}`);
    } catch (err) {
      toast.error("Failed to Review Task");
    } finally {
      setIsSubmitting("");
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingIndicator />
      </div>
    );
  } else if (!data) {
    return (
      <div className="h-full flex justify-center items-center">
        <Typography variant="caption" align="center">
          No data found
        </Typography>
      </div>
    );
  }

  const task = data?.data;

  return (
    <div>
      <Card>
        <Typography variant="h4" align="center" color="primary">
          Review the submission
        </Typography>

        <div>
          <Typography variant="h6">Proof Images</Typography>
          <hr className="mt-1 mb-3" />
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {task.job_submission_image?.map((item: any) => (
              <ZoomedImage
                key={item.id}
                img={item.image_path}
                style={{ borderRadius: 5 }}
                height="auto"
                width="auto"
              />
            ))}
          </div>
        </div>

        <div>
          <Typography variant="h6">Proof Text</Typography>
          <hr className="mt-1 mb-3" />
          <div className="bg-border rounded-md">
            <Typography className="px-4 py-4">{task.proof_data}</Typography>
          </div>
        </div>

        <RateUser taskId={id} />

        <div>
          <Typography variant="h6">Verification Question</Typography>
          <hr className="mt-1 mb-3" />
          <div className="space-y-5">
            {task.job.question_condition &&
              JSON.parse(task.job.question_condition || []).map(
                (question: any) => (
                  <div
                    className="rounded-md bg-border px-3 py-3"
                    key={question.id}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Typography variant="body2">
                        Q{question.id}. {question.text}?
                      </Typography>
                      <div
                        className="pt-3"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={
                          question.condition?.value ==
                          JSON.parse(task.answer)[question.id]
                            ? "Right"
                            : "Wrong"
                        }
                      >
                        <IconButton
                          size="sm"
                          className="rounded-md"
                          variant={
                            question.condition?.value ==
                            JSON.parse(task.answer)[question.id]
                              ? "default"
                              : "error"
                          }
                        >
                          {question.condition?.value ==
                          JSON.parse(task.answer)[question.id] ? (
                            <FaCheck />
                          ) : (
                            <FaTimes />
                          )}
                        </IconButton>

                        <Tooltip id="my-tooltip" />
                      </div>
                    </div>

                    <div className="flex justify-between gap-5">
                      <div className="grow py-2 px-3 border border-border rounded-md">
                        <Typography variant="caption" className="font-medium">
                          Actual Answer:
                        </Typography>
                        <Typography variant="body2">
                          {question.condition?.value}
                        </Typography>
                      </div>

                      <div className="grow py-2 px-3 border border-border rounded-md">
                        <Typography variant="caption" className="font-medium">
                          User Answer:
                        </Typography>
                        <Typography variant="body2">
                          {JSON.parse(task.answer)[question.id]}
                        </Typography>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>

        {task.status === "UNDER_REVIEW" ? (
          <>
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <div className="flex items-center justify-center flex-wrap gap-3">
                <Button
                  onClick={() => handleTaskReview(Satisfaction.Satisfied)}
                  variant="success"
                  loading={isSubmitting === Satisfaction.Satisfied}
                >
                  <FaCheck /> Satisfied
                </Button>
                <Button
                  onClick={() => handleTaskReview(Satisfaction.UnSatisfied)}
                  variant="error"
                  loading={isSubmitting === Satisfaction.UnSatisfied}
                >
                  <IoClose />
                  Unsatisfied
                </Button>
              </div>
              <div className="flex items-center justify-center flex-wrap gap-3">
                <Button
                  variant="success"
                  onClick={() => setShowTipsModal(true)}
                >
                  <FaSmile /> Give Tips
                </Button>
                <Button
                  onClick={() => setShowReportModal(true)}
                  variant="warning"
                >
                  <FaFlag /> Report this proof
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Typography variant="body2">{task.status}</Typography>
        )}
      </Card>

      {showReportModal && (
        <JobReport
          title="Submit a report agains this worker"
          open={showReportModal}
          onOpen={setShowReportModal}
          submissionId={task.id}
          jobId={null}
        />
      )}

      {showTipsModal && (
        <GiveTipsModal
          open={showTipsModal}
          onClose={() => setShowTipsModal(false)}
          taskId={task.id}
        />
      )}
    </div>
  );
}
