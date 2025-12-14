"use client";

import LoadingIndicator from "@/components/common/LoadingIndicator";
import Table from "@/components/libs/Table";
import TableContainer from "@/components/libs/TableContainer";
import TableHead from "@/components/libs/TableHead";
import Typography from "@/components/libs/Typography";
import useJobReview from "@/hooks/dashboardLayout/useJobReview";
import React from "react";
import JobSubmissionRow from "./JobSubmissionRow";

export default function JobSubmissionTable({
  onToggleSelectAll,
  onSingleSelect,
  isAllSelected,
  selectedTaskIds,
}) {
  const { jobSubmissions, isLoading } = useJobReview();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr className="max-sm:text-sm">
            <th className="flex justify-start items-center ">
              <input
                type="checkbox"
                className="!size-5 accent-success cursor-pointer"
                onChange={onToggleSelectAll}
                checked={isAllSelected}
              />
            </th>
            <th>ID</th>
            <th>Date</th>
            <th>Proof</th>
            <th>Status</th>
            <th>
              <Typography align="right" variant="body2">
                Actions
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
          ) : jobSubmissions?.data?.length ? (
            jobSubmissions.data.map((item) => (
              <JobSubmissionRow
                key={item.id}
                item={item}
                selectedTaskIds={selectedTaskIds}
                onSingleSelect={onSingleSelect}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <Typography variant="body2" align="center">
                  No Data Found
                </Typography>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
