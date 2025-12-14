"use client";
import AdvertisementForm from "@/components/advertisement/AdvertisementForm";
import { useCreateAdMutation } from "@/store/features/advertisement";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Advertisement() {
  const [createAds, { isLoading }] = useCreateAdMutation();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("target_url", data.target_url);
      formData.append("cost_id", data.cost_id);
      formData.append("banner_image", data.banner_image);
      await createAds(formData).unwrap();
      toast.success("Advertisement created successfully");
      router.push("/history");
    } catch (error) {
      toast.error(error.data?.message || "Internal Server Error");
    }
  };

  return (
    <AdvertisementForm
      data={{}}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title="Advertisement"
      isNew={true}
    />
  );
}

export default Advertisement;
