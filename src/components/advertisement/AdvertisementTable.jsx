import LoadingIndicator from "@/components/common/LoadingIndicator";
import Chip from "@/components/libs/Chip";
import IconButton from "@/components/libs/IconButton";
import Table from "@/components/libs/Table";
import TableContainer from "@/components/libs/TableContainer";
import TableHead from "@/components/libs/TableHead";
import { useUpdateAdsStatusMutation } from "@/store/features/advertisement";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GrResume } from "react-icons/gr";
import { MdDelete, MdPauseCircleFilled } from "react-icons/md";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import ZoomedImage from "../common/ZoomedImage";

export default function AdvertisementTable({
  data,
  isLoading,
  setShowUpdateModal,
  setUpdateModalData,
  setShowDeleteModal,
}) {
  const [updateAdsStatus] = useUpdateAdsStatusMutation();
  const [localIsUpdating, setLocalIsUpdating] = useState(-1);

  async function handleStatusUpdate(id, status) {
    try {
      setLocalIsUpdating(id);
      await updateAdsStatus({ data: { status }, id }).unwrap();
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(error.data?.message || "Internal Server Error");
    } finally {
      setLocalIsUpdating(-1);
    }
  }

  function dateFormat(date) {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <th>Ads Image</th>
            <th>Title</th>
            <th>Cost</th>
            <th>Duration</th>
            <th>Click</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th className="!text-right">Action</th>
          </tr>
        </TableHead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={8} className="text-center">
                <LoadingIndicator />
              </td>
            </tr>
          ) : data?.length ? (
            data.map((ads, index) => (
              <tr key={index}>
                <td>
                  <ZoomedImage img={ads.banner_image} height={80} width={100} />
                </td>
                <td>{ads.title}</td>
                <td>{ads.cost}</td>
                <td>{ads.duration_days}</td>
                <td>{ads.click_count}</td>
                <td>{dateFormat(ads.start_date)}</td>
                <td>{dateFormat(ads.end_date)}</td>
                <td className={ads.status === "APPROVED" ? "text-primary" : ""}>
                  <Chip
                    label={ads.status}
                    color={
                      ads.status === "APPROVED"
                        ? "success"
                        : /INACTIVE|EXPIRED/.test(ads.status)
                        ? "warning"
                        : "default"
                    }
                  />
                </td>
                <td>
                  <div className="flex gap-2 justify-end items-center">
                    <IconButton
                      className="rounded-md"
                      onClick={() => {
                        setShowUpdateModal(true);
                        setUpdateModalData(ads);
                      }}
                    >
                      <FaEdit className="text-xl" />
                    </IconButton>

                    {ads.status === "APPROVED" ? (
                      <IconButton
                        className="rounded-md"
                        disabled={localIsUpdating === ads.id}
                        onClick={() => handleStatusUpdate(ads.id, "INACTIVE")}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Inactive"
                      >
                        <GrResume className="text-lg" />
                        <Tooltip id="my-tooltip" />
                      </IconButton>
                    ) : /APPROVED|INACTIVE/.test(ads.status) ? (
                      <IconButton
                        className="rounded-md"
                        disabled={localIsUpdating === ads.id}
                        onClick={() => handleStatusUpdate(ads.id, "ACTIVE")}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Active"
                      >
                        <MdPauseCircleFilled className="text-xl" />
                        <Tooltip id="my-tooltip" />
                      </IconButton>
                    ) : null}
                    <IconButton
                      variant="error"
                      className="rounded-md"
                      onClick={() => setShowDeleteModal(ads.id)}
                    >
                      <MdDelete className="text-xl" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                No advertisement posted yet.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
