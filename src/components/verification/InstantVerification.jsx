"use client";
import useInstantVerification from "@/hooks/dashboardLayout/useInstantVerification";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../libs/Button";
import Card from "../libs/Card";
import Typography from "../libs/Typography";
import ConfirmInstantVerification from "./ConfirmInstantVerification";

export default function InstantVerification() {
  const { handleVerify, isLoading, showConfirmation, setShowConfirmation } =
    useInstantVerification();
  const { user } = useSelector((state) => state.user);
  const cost = useGetCostFromCostCenter("Instant_Verification_Fee")?.cost;

  const disabled =
    parseInt(user?.wallet_balance?.deposit_balance || 0) < 2 ||
    user?.verification?.status === "VERIFIED";

  return (
    <Card className="!p-0">
      <div className="flex justify-between items-center px-5 py-4 gap-3 flex-wrap">
        <div>
          <Typography variant="h5" className="font-medium">
            Instant account verify
          </Typography>
          <Typography variant="body2" color="warning" className="font-medium">
            It will automatically deduct ${cost} from your deposit amount
          </Typography>
        </div>
        <Button
          onClick={() => setShowConfirmation(true)}
          disabled={disabled}
          variant="contain"
          className="w-full md:w-auto justify-center"
        >
          {isLoading
            ? "Verifying..."
            : user?.verification?.status === "VERIFIED"
            ? "Verified"
            : "Verify"}
        </Button>
      </div>

      <ConfirmInstantVerification
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        cost={cost}
        onConfirm={handleVerify}
        isLoading={isLoading}
      />
    </Card>
  );
}
