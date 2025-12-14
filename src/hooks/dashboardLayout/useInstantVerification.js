import {
  useInstansVerificationMutation,
  useUpdateVerificationTypeMutation,
} from "@/store/features/verifications";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useInstantVerification() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [instanVerify, { isLoading }] = useInstansVerificationMutation();
  const [changeVerificationType, { isLoading: isUpdating }] =
    useUpdateVerificationTypeMutation();

  const handleVerify = async () => {
    try {
      await changeVerificationType({ verification_type: "INSTANT" });
      await instanVerify().unwrap();
      toast.success("Successfully verified");
      setShowConfirmation(false);
    } catch (error) {
      toast.error(error?.data?.message || "Verification failed");
    }
  };

  return {
    handleVerify,
    isLoading: isLoading || isUpdating,
    showConfirmation,
    setShowConfirmation,
  };
}
