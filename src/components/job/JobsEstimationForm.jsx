"use client";

import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { JobEstimationSchema } from "@/schema/jobs";
import { imageCompressor } from "@/services/imageCompressor";
import {
  useCreateJobMutation,
  useUpdateJobMutation,
} from "@/store/features/jobs";
import {
  setClearJobPostFinalForm,
  setClearJobPostFirstForm,
  setJobPostFinalForm,
} from "@/store/slices/jobform";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaCamera, FaRegClock, FaUser, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Card from "../libs/Card";
import IconButton from "../libs/IconButton";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";
import NextAndPrevButton from "./NextAndPrevButton";

export default function JobsEstimationForm({ setSteper, thumbnailImage }) {
  const [createJob, { isLoading: isLoadingCreating }] = useCreateJobMutation();
  const [updateJosb, { isLoading: isUpdating }] = useUpdateJobMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { jobPostFinalForm, jobPostFirstForm, isUpdate, jobId } = useSelector(
    (state) => state.jobForm
  );
  const { generalData } = useSelector((state) => state.settings);
  const jobPostFee = useGetCostFromCostCenter("job_post_fee_percentage");
  const jobSSfee = useGetCostFromCostCenter("job_post_screenshot_fee");
  const schema = JobEstimationSchema(generalData, jobPostFinalForm);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      total_workers_required:
        jobPostFinalForm.total_workers_required ||
        generalData?.job_minimum_worker,
      pay_per_task:
        jobPostFinalForm.pay_per_task || jobPostFinalForm.minimum_pay,
      require_screenshots: jobPostFinalForm.require_screenshots || 0,
      estimated_day:
        jobPostFinalForm.estimated_day ||
        generalData?.job_minimum_estimated_day,
      status: jobPostFinalForm.status,
    },
  });

  const worker = watch("total_workers_required") || 0;
  const workerEarn = watch("pay_per_task") || 0;
  const requiredScreenshot = watch("require_screenshots") || 0;

  function handlePrevStep() {
    const payload = {
      ...jobPostFinalForm,
      total_workers_required: getValues("total_workers_required"),
      pay_per_task: getValues("pay_per_task"),
      require_screenshots: getValues("require_screenshots"),
      estimated_day: getValues("estimated_day"),
      status: getValues("status"),
    };
    dispatch(setJobPostFinalForm(payload));
    setSteper((prev) => prev - 1);
  }

  const submit = async (data) => {
    const formData = new FormData();
    const payload = {
      ...jobPostFinalForm,
      ...jobPostFirstForm,
      ...data,
    };

    if (!JSON.parse(payload.required_proofs || "[]")[0].type) {
      delete payload.required_proofs;
    }
    if (!JSON.parse(payload.question_condition || "[]")[0].answer_type) {
      delete payload.question_condition;
    }

    if (typeof thumbnailImage !== "string") {
      const compressedBlob = await imageCompressor(thumbnailImage, {
        height: 400,
        width: 800,
        quality: 75,
      });
      formData.append("thumbnail", compressedBlob);
    }

    Object.entries(payload).forEach(([key, value]) => {
      if (key === "country_ids") {
        value.forEach((country) => {
          formData.append("country_ids[]", country);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      if (isUpdate) {
        formData.append("job_id", jobId);
        await updateJosb(formData).unwrap();
        toast.success("Job updated successfully");
        router.push("/my-jobs");
      } else {
        await createJob(formData).unwrap();
        toast.success("Job created successfully");
        router.push("/my-jobs");
      }

      dispatch(setClearJobPostFinalForm());
      dispatch(setClearJobPostFirstForm());
    } catch (err) {
      console.log(err);
      toast.error(
        err?.data?.message || err?.message || "Internal Server Error"
      );
    }
  };

  const totalCost = parseInt(worker) * parseFloat(workerEarn);
  const jobSSfeeCost = parseFloat(requiredScreenshot) * jobSSfee.cost;
  const platformFee = jobPostFee.cost + jobSSfeeCost;
  const jobPostFeeCost = totalCost * (platformFee / 100);
  const score = 100 - platformFee;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 gap-5 mb-5"
    >
      <Card className="!space-y-2 !bg-border/50  dark:!bg-primary-darker/20">
        <Typography
          variant="body1"
          className="font-semibold flex items-center gap-2"
        >
          <IconButton className="rounded-md" size="sm">
            <FaUsers className="text-lg" />
          </IconButton>
          Worker Configuration
        </Typography>

        <OutlinedInput
          label="Worker need"
          {...register("total_workers_required")}
          placeholder="Type here..."
          startIcon={<FaUser />}
          type="number"
          error={errors.total_workers_required?.message}
        />

        <OutlinedInput
          label="Each worker earn"
          {...register("pay_per_task")}
          placeholder="Type here..."
          startIcon={<BsCurrencyDollar />}
          type="text"
          error={errors.pay_per_task?.message}
        />

        <OutlinedInput
          label="Required screenshot"
          {...register("require_screenshots")}
          placeholder="Type here..."
          startIcon={<FaCamera />}
          type="number"
          error={errors.require_screenshots?.message}
        />

        <div>
          <OutlinedInput
            label="Estimated day"
            {...register("estimated_day")}
            placeholder="Type here..."
            startIcon={<FaRegClock />}
            type="number"
            error={errors.estimated_day?.message}
          />
        </div>
      </Card>

      <div className="space-y-5">
        <Card className="!space-y-4 !bg-border/50  dark:!bg-primary-darker/20">
          <Typography
            variant="body1"
            className="font-semibold flex items-center gap-2"
          >
            <IconButton className="rounded-md" size="sm">
              <BiDollar className="text-lg" />
            </IconButton>
            Cost Summary
          </Typography>

          <div>
            <div className="flex justify-between">
              <Typography variant="body2">Base Cost</Typography>
              <Typography variant="body2" className="font-semibold">
                ${totalCost.toFixed(4)}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography variant="body2">
                Platform Fee ({platformFee}%)
              </Typography>
              <Typography
                variant="body2"
                className="font-semibold"
                color="warning"
              >
                ${jobPostFeeCost.toFixed(4)}
              </Typography>
            </div>
          </div>
          <hr />

          <div>
            <div className="flex justify-between">
              <Typography variant="body2" className="font-semibold">
                Total Cost
              </Typography>
              <Typography
                variant="body2"
                className="font-semibold"
                color="success"
              >
                ${(totalCost + jobPostFeeCost).toFixed(4)}
              </Typography>
            </div>

            <div className="mt-2">
              <div className="h-2 bg-warning rounded-2xl">
                <div
                  className="h-2 bg-success rounded-l-2xl"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
            <div className="mt-1 flex justify-between">
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-2xl bg-success" />
                <Typography variant="body2" className="!text-xs">
                  Worker payment
                </Typography>
              </div>
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-2xl bg-warning" />
                <Typography variant="body2" className="!text-xs">
                  Fee
                </Typography>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-2">
          <div>
            <input
              id="status"
              type="checkbox"
              checked={getValues("status") === "DRAFT"}
              onChange={(e) => {
                setValue("status", e.target.checked ? "DRAFT" : "PENDING", {
                  shouldValidate: true,
                });
              }}
              className="block accent-warning "
            />
          </div>
          <label htmlFor="status" className="block">
            Save as Draft
          </label>
        </div>
      </div>

      <div className="md:col-span-2">
        <NextAndPrevButton
          hiddenNext={true}
          handleSubmit={true}
          setSteper={setSteper}
          isLoading={isLoadingCreating || isUpdating}
          handlePrevStep={handlePrevStep}
        />
      </div>
    </form>
  );
}
