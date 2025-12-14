"use client";

import Button from "@/components/libs/Button";
import Card from "@/components/libs/Card";
import { useReferrelPauseMutation } from "@/store/features/auth";
import { MdAirplanemodeInactive } from "react-icons/md";
import { VscCompassActive } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Typography from "../libs/Typography";

export default function AffiliateProgramControl() {
  const { user } = useSelector((state) => state.user);
  const [pauseReferrel, { isLoading }] = useReferrelPauseMutation();

  async function handlePause() {
    try {
      await pauseReferrel().unwrap();
      toast.success("Referral status updated successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  }

  const isPaused = parseInt(user?.referral_paused);

  return (
    <Card className="mt-0">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Typography variant="h5">Affiliate Program</Typography>
          <Button
            onClick={handlePause}
            loading={isLoading}
            variant={isPaused ? "contain" : "warning"}
          >
            {isPaused ? (
              <VscCompassActive size={20} />
            ) : (
              <MdAirplanemodeInactive />
            )}
            {isPaused ? "Activate" : "Deactivate"}
          </Button>
        </div>
        <Typography variant="body2">
          Post your affiliate link on blogs, websites, forums, social media, or
          write a Workdear review. Refer new members (Freelancers & Business
          Owners) and earn commission revenue!
        </Typography>
      </div>
    </Card>
  );
}
