import React from "react";
import Card from "../libs/Card";
import Pagination from "../libs/Pagination";
import AdvertisementFilter from "./AdvertisementFilter";
import AdvertisementTable from "./AdvertisementTable";

const AdvertisementList = ({
  ads,
  isLoading,
  setShowUpdateModal,
  setUpdateModalData,
  setShowDeleteModal,
  totalPages,
  status,
  setStatus,
  page,
  setPage,
}) => {
  return (
    <Card className="!space-y-4">
      <AdvertisementFilter status={status} setStatus={setStatus} />
      <AdvertisementTable
        data={ads}
        isLoading={isLoading}
        setShowUpdateModal={setShowUpdateModal}
        setUpdateModalData={setUpdateModalData}
        setShowDeleteModal={setShowDeleteModal}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(value) => setPage(value)}
        />
      )}
    </Card>
  );
};

export default AdvertisementList;
