import { useExpiredJobExtendMutation } from "@/store/features/jobs";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import Modal from "../libs/Modal";
import OutlinedInput from "../libs/OutlinedInput";

const ExtendDeadlineModal = ({ open, setOpen, jobId }) => {
  const [extendDeadline, { isLoading }] = useExpiredJobExtendMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      extend_days: "",
    },
  });

  async function onsubmit(data) {
    try {
      const payload = {
        job_id: jobId,
        extend_days: data.extend_days,
      };
      await extendDeadline(payload).unwrap();
      toast.success("Deadline extended successfully");
      setOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Internal Server Error");
    }
  }

  return (
    <Modal
      className="w-full max-w-xl"
      title="Extend Deadline"
      open={open}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit(onsubmit)}>
        <OutlinedInput
          label="Extend Deadline"
          {...register("extend_days", { required: "Extend days is required" })}
          type="number"
          placeholder="Extend Deadline"
          error={errors.extend_days?.message}
        />

        <div className="flex justify-center mt-4">
          <Button loading={isLoading}>Submit</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExtendDeadlineModal;
