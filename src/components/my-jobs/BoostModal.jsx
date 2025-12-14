import Button from "@/components/libs/Button";
import Modal from "@/components/libs/Modal";
import { useMyJobsData } from "@/hooks/dashboardLayout/useMyJobsData";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { useState } from "react";
import Typography from "../libs/Typography";

export default function BoostModal({ data, open, onClose }) {
  const [minutes, setMinutes] = useState("");
  const boostCost = useGetCostFromCostCenter("BOOST");
  const { handleBoost, isBoostingJob } = useMyJobsData();

  return (
    <Modal
      open={open}
      setOpen={onClose}
      title="Boost Your Job"
      className="w-full max-w-lg"
    >
      <div>
        <Typography
          variant="h6"
          align="center"
          color="warning"
          className="mb-10 mt-3"
        >
          The estimated boost cost per minute ${boostCost.cost}
        </Typography>

        <form
          className="space-y-3"
          onSubmit={(e) =>
            handleBoost(e, { minutes, jobId: data.id, cb: onClose })
          }
        >
          <div>
            <label>Boost Duration (in minutes):</label>
            <input
              type="number"
              placeholder="Enter Duration"
              onChange={(e) => setMinutes(e.target.value)}
              value={minutes}
              required
            />
          </div>

          <div>
            <label>Your Estimed Boosting Cost:</label>
            <input
              type="number"
              placeholder="Boosting Cost"
              value={minutes && parseInt(minutes || 0) * boostCost.cost}
              disabled
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contain"
              className="mt-5"
              loading={isBoostingJob}
              disabled={parseInt(minutes || 0) * boostCost.cost < 0}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
