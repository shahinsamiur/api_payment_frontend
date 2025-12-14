import { useMyJobsData } from "@/hooks/dashboardLayout/useMyJobsData";
import { WorderExtendSchema } from "@/schema/jobs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import Button from "../libs/Button";
import Modal from "../libs/Modal";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";

const EditWorkerModal = ({ data, onClose, open }) => {
  const { handleUpdateJob, isUpdatingJob } = useMyJobsData();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(WorderExtendSchema),
    defaultValues: {
      job_id: data.id,
      worker_quantity: null,
      day_extend: null,
    },
  });
  const totalWorker = watch("worker_quantity") || 0;

  return (
    <Modal
      open={open}
      setOpen={onClose}
      className="w-full max-w-lg"
      title="Extend Your Job"
    >
      <div>
        <Typography
          variant="h6"
          align="center"
          color="warning"
          className="mb-10"
        >
          Cost per worker: ${data.pay_per_task}
        </Typography>

        <form
          onSubmit={handleSubmit((payload) =>
            handleUpdateJob({ payload, cb: onClose })
          )}
          className="space-y-5"
        >
          <OutlinedInput
            label="Extend worker"
            type="number"
            min="1"
            step="1"
            placeholder="Enter number of worker"
            {...register("worker_quantity", { valueAsNumber: true })}
            error={errors.worker_quantity?.message}
          />

          <div className="flex flex-wrap gap-2 justify-center">
            {[100, 200, 500].map((item) => (
              <Button
                onClick={() =>
                  setValue("worker_quantity", Number(totalWorker) + item, {
                    shouldValidate: true,
                  })
                }
                type="button"
                key={item}
                variant="outline"
              >
                <FaPlus className="text-sm" />
                {item}
              </Button>
            ))}
          </div>

          <OutlinedInput
            label="Extended Days"
            type="number"
            min="1"
            step="1"
            placeholder="Enter estimated days"
            {...register("day_extend", { valueAsNumber: true })}
            error={errors.day_extend?.message}
          />

          <div className="space-y-2 mt-8 mb-5">
            <div className="flex justify-between">
              <Typography variant="body2">You need to pay:</Typography>
              <Typography variant="body2" color="primary">
                ${" "}
                {(
                  Number(totalWorker) * parseFloat(data.pay_per_task) || 0
                ).toFixed(4)}
              </Typography>
            </div>
          </div>

          <div className="flex justify-center">
            <Button type="submit" variant="contain" loading={isUpdatingJob}>
              Submit
            </Button>
          </div>
          <Typography variant="error" align="center">
            {errors.form_validation?.message}
          </Typography>
        </form>
      </div>
    </Modal>
  );
};

export default EditWorkerModal;
