import { useSaveSupportFileMutation } from "@/store/features/liveSupport";
import { toast } from "react-toastify";

export default function useFileUpload() {
  const [uploadFile, { isLoading: fileUploading }] =
    useSaveSupportFileMutation();

  const handleSaveFile = async (file, fileName = undefined) => {
    try {
      const formData = new FormData();
      formData.append("file", file, fileName);
      const res = await uploadFile(formData).unwrap();
      return res.fileUrl;
    } catch (error) {
      toast.error(error?.data?.message || "Internal server error");
      throw error;
    }
  };

  return { handleSaveFile, fileUploading };
}
