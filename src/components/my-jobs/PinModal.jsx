import Button from "@/components/libs/Button";
import Modal from "@/components/libs/Modal";
import { useMyJobsData } from "@/hooks/dashboardLayout/useMyJobsData";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { useState } from "react";
import Typography from "../libs/Typography";

export default function PinModal({ open, onClose, data }) {
  const [minutes, setMinutes] = useState("");
  const pinCost = useGetCostFromCostCenter("PIN");
  const { handlePin, isPinningJob } = useMyJobsData();

  return (
    <Modal
      title="Pin Your Job"
      open={open}
      setOpen={onClose}
      className="w-full max-w-lg"
    >
      <div>
        <Typography
          variant="h6"
          align="center"
          color="warning"
          className="mt-5 mb-10"
        >
          The estimated pin cost per minute ${pinCost.cost}
        </Typography>

        <form
          className="space-y-3"
          onSubmit={(e) => handlePin(e, { minutes, id: data.id, cb: onClose })}
        >
          <div>
            <label>Pin Duration (in minutes):</label>
            <input
              type="number"
              placeholder="Enter duration"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Your Estimed Pin Job Cost:</label>
            <input
              type="number"
              placeholder="Pin Cost"
              value={minutes && parseInt(minutes || 0) * pinCost.cost}
              disabled
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contain"
              className="mt-5"
              loading={isPinningJob}
              disabled={parseInt(minutes || 0) * pinCost.cost < 0}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
