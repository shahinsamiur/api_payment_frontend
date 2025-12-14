import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { FaEdit, FaRocket } from "react-icons/fa";
import { GrResume } from "react-icons/gr";
import { LuEye } from "react-icons/lu";
import { MdDelete, MdPauseCircleFilled } from "react-icons/md";
import { TiPin } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import Chip from "../libs/Chip";
import IconButton from "../libs/IconButton";

const JobListItem = ({
  job,
  onOpenEditWorkerModal,
  onOpenDeleteModal,
  onOpenBoostModal,
  onOpenPinModal,
  setUpdateModalData,
  onPlayPause,
  isPlayAndPauseLoading,
}) => {
  return (
    <tr>
      <td>{job.job_code}</td>
      <td>{job.title}</td>
      <td>
        {job.submission_information.TOTAL_SUBMISSIONS}/
        {job.submission_information.REQUIRED_JOB_WORKER}
      </td>
      <td>
        {(
          job.total_workers_required * parseFloat(job.pay_per_task || 0)
        ).toFixed(4)}
      </td>

      <td>
        {job.start_date
          ? new Date(job.start_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A"}
      </td>
      <td>
        {job.end_date
          ? new Date(job.end_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A"}
      </td>

      <td className={job.status === "APPROVED" ? "text-primary" : ""}>
        <Chip
          label={job.status}
          color={
            job.status === "APPROVED"
              ? "success"
              : job.status === "REJECTED"
              ? "error"
              : /EXPIRED|CLOSED/.test(job.status)
              ? "warning"
              : "default"
          }
        />
      </td>

      <td className="flex justify-end gap-2">
        {job.status === "DRAFT" ? (
          <Link
            href={`/my-jobs/update/${job.slug}`}
            data-tooltip-id="edit-full-job"
            data-tooltip-content="Edit Job"
          >
            <IconButton className="rounded-md">
              <FaEdit />
            </IconButton>
            <Tooltip id="edit-full-job" />
          </Link>
        ) : null}

        {job.status === "APPROVED" && (
          <>
            <IconButton
              onClick={() => {
                onOpenPinModal(true);
                setUpdateModalData(job);
              }}
              className="rounded-md"
              data-tooltip-id="pin-job"
              data-tooltip-content="Pin Job"
            >
              <TiPin
                className={clsx("text-xl", {
                  "animate-pulse !text-warning": job.is_pinned,
                })}
              />
              <Tooltip id="pin-job" />
            </IconButton>

            <IconButton
              onClick={() => {
                onOpenBoostModal(true);
                setUpdateModalData(job);
              }}
              className="rounded-md"
              data-tooltip-id="boost-job"
              data-tooltip-content="Boost Job"
            >
              <FaRocket
                className={clsx("text-md", {
                  "animate-pulse !text-warning": job.is_boosted,
                })}
              />
              <Tooltip id="boost-job" />
            </IconButton>
          </>
        )}

        {/APPROVED|EXPIRED|CLOSED|COMPLETED/.test(job.status) ? (
          <>
            <Link
              href={`/my-jobs/job-review?job_id=${job.id}&job_code=${job.job_code}&job_slug=${job.slug}`}
              data-tooltip-id="view-job"
              data-tooltip-content="View Job"
            >
              <IconButton className="rounded-md">
                <LuEye className="text-md" />
              </IconButton>
              <Tooltip id="view-job" />
            </Link>
          </>
        ) : null}

        {job.status === "APPROVED" && (
          <IconButton
            onClick={() => {
              onOpenEditWorkerModal(true);
              setUpdateModalData(job);
            }}
            data-tooltip-id="edit-job"
            data-tooltip-content="Edit Job"
            className="rounded-md"
          >
            <FaEdit />
            <Tooltip id="edit-job" />
          </IconButton>
        )}

        {/REJECTED|COMPLETED|CLOSED|DRAFT/.test(job.status) ? (
          <IconButton
            onClick={() => onOpenDeleteModal(job.id)}
            data-tooltip-id="delete-job"
            data-tooltip-content="Delete Job"
            className="rounded-md"
            variant="error"
          >
            <MdDelete className=" text-xl" />
            <Tooltip id="delete-job" />
          </IconButton>
        ) : null}

        {/ACTIVE|APPROVED/.test(job.status) && parseInt(job.pause) ? (
          <IconButton
            disabled={isPlayAndPauseLoading}
            onClick={() => onPlayPause(job.id)}
            data-tooltip-id="resume-job"
            data-tooltip-content="Resume Job"
            className="rounded-md"
          >
            <GrResume className="text-lg" />
            <Tooltip id="resume-job" />
          </IconButton>
        ) : /ACTIVE|APPROVED/.test(job.status) && !parseInt(job.pause) ? (
          <IconButton
            disabled={isPlayAndPauseLoading}
            onClick={() => onPlayPause(job.id)}
            data-tooltip-id="pause-job"
            data-tooltip-content="Pause Job"
            className="rounded-md"
            variant="error"
          >
            <MdPauseCircleFilled className="text-xl" />
            <Tooltip id="pause-job" />
          </IconButton>
        ) : null}
      </td>
    </tr>
  );
};

export default JobListItem;
