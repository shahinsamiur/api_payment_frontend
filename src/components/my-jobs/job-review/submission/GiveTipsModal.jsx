import Button from "@/components/libs/Button";
import Modal from "@/components/libs/Modal";
import OutlinedInput from "@/components/libs/OutlinedInput";
import { useGiveTipsMutation } from "@/store/features/jobSubmission";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const GiveTipsModal = ({ open, onClose, taskId }) => {
  const [giveTips, { isLoading }] = useGiveTipsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = async (payload) => {
    try {
      payload.job_submission_id = taskId;

      await giveTips(payload);
      toast.success("Tips sent successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to send tips");
    }
  };

  return (
    <Modal
      open={open}
      setOpen={onClose}
      className="w-full max-w-md"
      title="Give tips to the worker"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <OutlinedInput
          label="Tips amount $"
          placeholder="Enter amount"
          {...register("amount", { required: "Amount is required" })}
          error={errors.amount?.message}
        />

        <div className="flex justify-end">
          <Button variant="contain" loading={isLoading}>
            Give Tips
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GiveTipsModal;
