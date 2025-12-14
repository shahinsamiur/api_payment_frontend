"use client";
import { useUpdateAdvertisementMutation } from "@/store/features/advertisement";
import { toast } from "react-toastify";
import Modal from "../libs/Modal";
import AdvertisementForm from "./AdvertisementForm";

function UpdateAdvertisement({ data, onClose, open }) {
  const [updateAds, { isLoading }] = useUpdateAdvertisementMutation();

  const onSubmit = async (payload) => {
    try {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("target_url", payload.target_url);
      formData.append("cost_id", payload.cost_id);
      formData.append("banner_image", payload.banner_image);
      formData.append("status", payload.status);
      await updateAds({ data: formData, id: data.id }).unwrap();
      onClose();
      toast.success("Advertisement updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  };

  return (
    <Modal title="Update Advertisement" open={open} setOpen={onClose}>
      <AdvertisementForm
        data={data}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </Modal>
  );
}

export default UpdateAdvertisement;
