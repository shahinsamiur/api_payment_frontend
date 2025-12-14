"use client";

import Chip from "@/components/libs/Chip";
import IconButton from "@/components/libs/IconButton";
import Typography from "@/components/libs/Typography";
import useJobReview from "@/hooks/dashboardLayout/useJobReview";
import Link from "next/link";
import React from "react";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";

export default function JobSubmissionRow(props) {
  const { item, selectedTaskIds, onSingleSelect } = props;

  const {
    handleUnSatisfySingle,
    handleSatisfySignle,
    isSingleUnsatisfying,
    isSinglesatisfying,
  } = useJobReview();

  return (
    <tr>
      <td>
        <div className="flex justify-start">
          {item.status === "UNDER_REVIEW" ? (
            <input
              type="checkbox"
              className="!size-5 rounded-sm cursor-pointer accent-success"
              onChange={() => onSingleSelect(item.id)}
              checked={selectedTaskIds.includes(item.id)}
            />
          ) : (
            <div
              className={`!size-5 rounded flex items-center justify-center ${
                item.status === "SATISFIED" ? "bg-success" : "bg-error"
              } text-white cursor-not-allowed p-1`}
            >
              {item.status === "SATISFIED" ? (
                <FaCheck className="text-xl" />
              ) : (
                <FaTimes className="text-xl" />
              )}
            </div>
          )}
        </div>
      </td>
      <td>{item.id}</td>
      <td>
        {new Date(item.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </td>
      <td>{item.proof_data}</td>
      <td>
        <Chip
          label={item.status.replace("_", " ")}
          color={
            item.status === "SATISFIED"
              ? "success"
              : item.status === "UNDER_REVIEW"
              ? "warning"
              : "error"
          }
        />
      </td>
      <td>
        {item.status === "UNDER_REVIEW" ? (
          <div className="flex items-center justify-end gap-2">
            <Link href={`/my-jobs/job-review/${item.id}`}>
              <IconButton size="sm" className="rounded-md">
                <FaEye />
              </IconButton>
            </Link>
            <IconButton
              size="sm"
              onClick={() => handleSatisfySignle(item.id)}
              loading={isSinglesatisfying === item.id}
              className="rounded-md"
            >
              <FaCheck />
            </IconButton>
            <IconButton
              size="sm"
              variant="error"
              onClick={() => handleUnSatisfySingle(item.id)}
              loading={isSingleUnsatisfying === item.id}
              className="rounded-md"
            >
              <FaTimes />
            </IconButton>
          </div>
        ) : (
          <Typography variant="body2" align="right">
            N/A
          </Typography>
        )}
      </td>
    </tr>
  );
}
