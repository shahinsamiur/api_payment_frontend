import { useBuyPremiumMutation } from "@/store/features/premium";
import { useState } from "react";
import { toast } from "react-toastify";

const usePurchasePackage = () => {
  const [buyPremium, { isLoading }] = useBuyPremiumMutation();
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");

  const handleConfirmPurchase = async (packageId) => {
    try {
      if (!selectedOption) {
        setError("Please select balance");
        return;
      } else {
        setError("");
      }

      let data = {
        paid_from: selectedOption,
        package_id: packageId,
      };
      await buyPremium(data).unwrap();
      toast.success("Premium Subscription purchased successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Internal Server Error");
    }
  };

  function handleOnchange(value) {
    setSelectedOption(value);
    setError("");
  }

  return {
    handleConfirmPurchase,
    isLoading,
    error,
    selectedOption,
    handleOnchange,
  };
};

export default usePurchasePackage;
