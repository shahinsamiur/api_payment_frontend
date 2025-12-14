"use client";
import Markque from "@/components/common/Markque";
import Card from "@/components/libs/Card";
import DeleteModal from "@/components/libs/DeleteModal";
import Pagination from "@/components/libs/Pagination";
import BoostModalJob from "@/components/my-jobs/BoostModal";
import EditWorkerModal from "@/components/my-jobs/EditWorkerModal";
import JobFilter from "@/components/my-jobs/JobFilter";
import MyjobReportView from "@/components/my-jobs/MyjobReportView";
import MyJobsTable from "@/components/my-jobs/MyJobsTable";
import PinModal from "@/components/my-jobs/PinModal";
import { useMyJobsData } from "@/hooks/dashboardLayout/useMyJobsData";
import { useState } from "react";

export default function MyJobsPage() {
  const [showUpdateWordkerModal, setShowUpdateWorkerModal] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const {
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
  } = useMyJobsData();

  // Handler to open delete modal
  const handleOpenDeleteModal = (jobId) => {
    setShowDeleteModal(jobId);
  };

  // Handler to close delete modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  // Handler to open boost modal
  const handleOpenBoostModal = (jobData) => {
    setUpdateModalData(jobData);
    setShowBoostModal(true);
  };

  // Handler to close boost modal
  const handleCloseBoostModal = () => {
    setShowBoostModal(false);
    setUpdateModalData(null);
  };

  // Handler to open pin modal
  const handleOpenPinModal = (jobData) => {
    setUpdateModalData(jobData);
    setShowPinModal(true);
  };

  // Handler to close pin modal
  const handleClosePinModal = () => {
    setShowPinModal(false);
    setUpdateModalData(null);
  };

  // Handler to open edit worker modal
  const handleOpenEditWorkerModal = (jobData) => {
    setUpdateModalData(jobData);
    setShowUpdateWorkerModal(true);
  };

  // Handler to close edit worker modal
  const handleCloseEditWorkerModal = () => {
    setShowUpdateWorkerModal(false);
    setUpdateModalData(null);
  };

  // Function to confirm deletion
  const confirmDelete = async () => {
    if (showDeleteModal) {
      const success = await handleDelete(showDeleteModal);
      if (success) {
        handleCloseDeleteModal();
      }
    }
  };

  const jobs = data?.data?.data?.jobs || [];
  const totalPages = data?.data?.last_page || 1;
  const reports = data?.data?.data?.statistics || {};

  return (
    <div className="space-y-6">
      <MyjobReportView reports={reports} isLoading={isLoading} />

      <Card>
        <JobFilter status={status} setStatus={setStatus} />
        <MyJobsTable
          jobs={jobs}
          isLoading={isLoading}
          isDeleteLoading={isDeleteLoading}
          isPlayAndPauseLoading={isPlayAndPauseLoading}
          onPlayPause={handlePlayAndPause}
          onOpenEditWorkerModal={handleOpenEditWorkerModal}
          onOpenDeleteModal={handleOpenDeleteModal}
          onOpenBoostModal={handleOpenBoostModal}
          onOpenPinModal={handleOpenPinModal}
          setUpdateModalData={setUpdateModalData}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Card>

      {/* Modals */}
      {showDeleteModal ? (
        <DeleteModal
          isLoading={isDeleteLoading}
          open={!!showDeleteModal}
          setOpen={handleCloseDeleteModal}
          onDelete={confirmDelete}
          title="Job"
        />
      ) : null}

      {showBoostModal ? (
        <BoostModalJob
          data={updateModalData}
          setShowBoostModal={handleCloseBoostModal}
          open={showBoostModal}
          onClose={handleCloseBoostModal}
        />
      ) : null}

      {showPinModal ? (
        <PinModal
          data={updateModalData}
          open={showPinModal}
          onClose={handleClosePinModal}
        />
      ) : null}

      {showUpdateWordkerModal ? (
        <EditWorkerModal
          data={updateModalData}
          onClose={handleCloseEditWorkerModal}
          open={showUpdateWordkerModal}
        />
      ) : null}
    </div>
  );
}
