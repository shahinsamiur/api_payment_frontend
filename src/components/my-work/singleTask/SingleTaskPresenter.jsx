import Card from "@/components/libs/Card";
import Chip from "@/components/libs/Chip";
import Typography from "@/components/libs/Typography";
import InfoCard from "@/components/my-jobs/job/InfoCard";
import Instructions from "@/components/my-jobs/job/Instructions";
import RequiredProofs from "@/components/my-jobs/job/RequiredProofs";
import TimeLine from "@/components/my-jobs/job/TimeLine";
import { config } from "@/config";
import Image from "next/image";
import React from "react";
import { FaClock, FaDollarSign, FaStar, FaUsers } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const SingleTaskPresenter = ({ data }) => {
  const {
    job,
    answer,
    status,
    rating,
    submitted_at,
    reviewed_at,
    proof_data,
    job_submission_image,
  } = data;

  const steps = JSON.parse(job?.steps || "[]");
  const requiredProofs = JSON.parse(job?.required_proofs || "[]");
  const questions = JSON.parse(job?.question_condition || "[]");
  const parsedAnswer = JSON.parse(answer || "{}");

  return (
    <div>
      <Card>
        <div>
          <Typography variant="h4">{job.title}</Typography>
          <Typography variant="caption" className="font-medium">
            Job Code: {job.job_code}
          </Typography>
          <Chip
            className="rounded-md"
            label={job.status}
            color={
              job.status === "APPROVED"
                ? "success"
                : job.status === "EXPIRED"
                ? "warning"
                : job.status === "REJECTED"
                ? "error"
                : "default"
            }
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <InfoCard
            icon={FaDollarSign}
            label="Payment"
            value={job.pay_per_task}
            color="primary-main"
          />
          <InfoCard
            icon={FaUsers}
            label="Workers"
            value={job.total_workers_required}
            color="info"
          />
          <InfoCard
            icon={FaClock}
            label="Duration"
            value={job.estimated_day}
            color="success"
          />

          <InfoCard
            icon={FaStar}
            label="Rating"
            value={`${rating || 0}/5`}
            color="warning"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <Instructions steps={steps} />

          <Card>
            <div className="flex items-center justify-between flex-wrap">
              <Typography variant="h4" className="mb-4">
                Submission Details
              </Typography>
              <Chip
                icon={
                  status === "SATISFIED" ? (
                    <FaStar />
                  ) : (
                    status === "UNSATISFIED" && <IoClose size={18} />
                  )
                }
                label={status.replace("_", " ")}
                className="rounded-md"
                color={
                  status === "SATISFIED"
                    ? "success"
                    : status === "UNSATISFIED"
                    ? "error"
                    : "warning"
                }
              />
            </div>

            {questions.length > 0 && (
              <div className="mb-6">
                <Typography variant="caption" className="font-medium mb-3">
                  Answers
                </Typography>
                <div className="space-y-3">
                  {questions.map((question) => (
                    <div key={question.id} className="bg-border rounded-lg p-4">
                      <Typography variant="body2" className="mb-2">
                        {question.text}
                      </Typography>
                      <Typography variant="caption" className="font-medium">
                        {parsedAnswer[question.id] || "N/A"}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {proof_data && (
              <div className="mb-6">
                <Typography variant="caption" className="font-medium mb-3">
                  Proof Data
                </Typography>
                <div className="bg-border rounded-lg p-4">
                  <Typography variant="body2">{proof_data}</Typography>
                </div>
              </div>
            )}

            {job_submission_image && job_submission_image.length > 0 && (
              <div>
                <Typography variant="caption" className="font-medium mb-3">
                  Submitted Proof
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  {job_submission_image.map((item, index) => (
                    <div
                      key={index}
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      <div className="aspect-video flex items-center justify-center">
                        <Image
                          height={300}
                          width={300}
                          src={config.fileBaseUrl + item.image_path}
                          objectFit="cover"
                          alt="screenshort"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 bg-border">
                        <Typography variant="body2">
                          Screenshot {index + 1}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <TimeLine
            end_date={job.end_date}
            start_date={job.start_date}
            reviewed_at={reviewed_at}
            submitted_at={submitted_at}
          />
          <RequiredProofs requiredProofs={requiredProofs} />
        </div>
      </div>
    </div>
  );
};

export default SingleTaskPresenter;
