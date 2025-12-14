"use client";

import Button from "@/components/libs/Button";
import DropdownMenus from "@/components/libs/DropdownMenus";
import Typography from "@/components/libs/Typography";
import useJobReview from "@/hooks/dashboardLayout/useJobReview";
import useResponsive from "@/hooks/useResponsive";
import Link from "next/link";
import React from "react";
import { MdVisibility } from "react-icons/md";
import CompleteJob from "./CompleteJob";
import ExtendDeadline from "./ExtendDeadline";

export default function JobReviewHeader({ onClerSelectedId, selectedTaskIds }) {
  const isMd = useResponsive("down", "md");
  const {
    handleMultipleSatisfy,
    handleMultipleUnsatisfy,
    isMultipleSatisfing,
    isMultipleUnsatisfing,
    basicJobInfo,
    status,
    setStatus,
    jobSlug,
  } = useJobReview();

  const statusOptions = [
    { id: 1, label: "All", value: "" },
    { id: 3, label: "CORRECT", value: "correct_submissions" },
    { id: 2, label: "INCORRECT", value: "incorrect_submissions" },
    { id: 4, label: "PENDING", value: "UNDER_REVIEW" },
    { id: 5, label: "SATISFIED", value: "SATISFIED" },
    { id: 6, label: "UNSATISFIED", value: "UNSATISFIED" },
  ];

  return (
    <>
      <Typography variant="h4" align="center" color="primary">
        Submission lists
      </Typography>

      <div className="w-full flex flex-wrap items-center justify-between gap-2">
        {selectedTaskIds.length > 0 ? (
          <div className="flex justify-start  flex-1 gap-2 lg:gap-3">
            <Button
              disabled={selectedTaskIds.length === 0}
              onClick={() =>
                handleMultipleSatisfy(selectedTaskIds, onClerSelectedId)
              }
              loading={isMultipleSatisfing}
            >
              {!isMd ? "Satisfied Marked" : "Satisfied"}
            </Button>
            <Button
              variant="error"
              disabled={selectedTaskIds.length === 0}
              onClick={() =>
                handleMultipleUnsatisfy(selectedTaskIds, onClerSelectedId)
              }
              loading={isMultipleUnsatisfing}
            >
              {!isMd ? "Unsatisfied Marked" : "Unsatisfied"}
            </Button>
          </div>
        ) : (
          <div className="grow" />
        )}

        <div className="flex items-center flex-wrap gap-2">
          <CompleteJob jobData={basicJobInfo} />
          <ExtendDeadline jobData={basicJobInfo} />

          <Link href={`/my-jobs/${jobSlug}`}>
            <Button>
              <MdVisibility />
              View Job
            </Button>
          </Link>
          <DropdownMenus
            selected={status}
            setSelected={setStatus}
            placeholder="All"
            options={statusOptions}
            className="min-w-36"
          />
        </div>
      </div>
    </>
  );
}
