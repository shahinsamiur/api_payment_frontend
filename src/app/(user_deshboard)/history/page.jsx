"use client";
import AdvertisementList from "@/components/advertisement/AdvertisementList";
import AdvertisementModals from "@/components/advertisement/AdvertisementModals";
import AdvertisementReports from "@/components/advertisement/AdvertisementReports";
import { useGetAdsQuery } from "@/store/features/advertisement";
import { useState } from "react";

export default function AdvertisementHistory() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAdsQuery({ status, page });
  const [showUpdatModal, setShowUpdateModal] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(0);

  const ads = data?.data?.ads || [];
  const totalPages = data?.meta?.last_page || 1;
  const report = data?.data?.statistics || {};

  return (
    <div className="space-y-6">
      <AdvertisementReports report={report} isLoading={isLoading} />

      <AdvertisementList
        ads={ads}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        status={status}
        setStatus={setStatus}
        totalPages={totalPages}
        setShowDeleteModal={setShowDeleteModal}
        setShowUpdateModal={setShowUpdateModal}
        setUpdateModalData={setUpdateModalData}
      />

      <AdvertisementModals
        showUpdatModal={showUpdatModal}
        setShowUpdateModal={setShowUpdateModal}
        updateModalData={updateModalData}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </div>
  );
}
