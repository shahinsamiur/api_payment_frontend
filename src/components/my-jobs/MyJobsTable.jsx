import LoadingIndicator from "@/components/common/LoadingIndicator";
import Table from "@/components/libs/Table";
import TableContainer from "@/components/libs/TableContainer";
import TableHead from "@/components/libs/TableHead";
import React from "react";
import Typography from "../libs/Typography";
import JobListItem from "./JobListItem";

const MyJobsTable = ({
  jobs,
  isLoading,
  isPlayAndPauseLoading,
  onPlayPause,
  onOpenEditWorkerModal,
  onOpenDeleteModal,
  onOpenBoostModal,
  onOpenPinModal,
  setUpdateModalData,
}) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <th>Job Code</th>
            <th>Title</th>
            <th>Progress</th>
            <th>Cost</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th className="!text-right">Action</th>
          </tr>
        </TableHead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={8}>
                <LoadingIndicator />
              </td>
            </tr>
          ) : jobs?.length ? (
            jobs.map((job, index) => (
              <JobListItem
                key={index}
                job={job}
                onOpenBoostModal={onOpenBoostModal}
                onOpenDeleteModal={onOpenDeleteModal}
                onOpenEditWorkerModal={onOpenEditWorkerModal}
                onOpenPinModal={onOpenPinModal}
                onPlayPause={onPlayPause}
                setUpdateModalData={setUpdateModalData}
                isPlayAndPauseLoading={isPlayAndPauseLoading}
              />
            ))
          ) : (
            <tr>
              <td colSpan={8}>
                <Typography variant="body2" align="center">
                  No job posted yet.
                </Typography>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default MyJobsTable;
