"use client";

import LoadingIndicator from "@/components/common/LoadingIndicator";
import Button from "@/components/libs/Button";
import Chip from "@/components/libs/Chip";
import Table from "@/components/libs/Table";
import TableContainer from "@/components/libs/TableContainer";
import TableHead from "@/components/libs/TableHead";
import Typography from "@/components/libs/Typography";
import Link from "next/link";
import { FaFlag } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

export default function JobListTable({
  tasks,
  isLoading,
  setShowReportModal,
  setReportJobsId,
}) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <th>Job Title</th>
            <th>Submit Date</th>
            <th>Earn</th>
            <th>Status</th>
            <th>
              <Typography variant="body2" align="right">
                Action
              </Typography>
            </th>
          </tr>
        </TableHead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6}>
                <LoadingIndicator />
              </td>
            </tr>
          ) : tasks?.length ? (
            tasks?.map((item, index) => (
              <tr key={index}>
                <td>{item.job.title}</td>
                <td className="flex justify-center">
                  {new Date(item.task.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>${item.job?.pay_per_task}</td>
                <td>
                  <Chip
                    label={item.task.status.replace("_", " ")}
                    color={
                      item.task.status === "UNSATISFIED"
                        ? "error"
                        : item.task.status === "SATISFIED"
                        ? "success"
                        : "default"
                    }
                  />
                </td>
                <td>
                  <div className="flex justify-end items-center gap-1">
                    {item.task.status !== "SATISFIED" && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setShowReportModal(true);
                          setReportJobsId(item.task.id);
                        }}
                        variant="warning"
                      >
                        <FaFlag /> Report
                      </Button>
                    )}
                    <Link href={`/jobs/details/${item.job.slug}`}>
                      <Button size="sm">
                        <IoEyeSharp /> View Job
                      </Button>
                    </Link>
                    <Link href={`/my-works/${item.task.id}`}>
                      <Button size="sm">
                        <IoEyeSharp /> View Task
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <Typography align="center">No task submitted yet.</Typography>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
