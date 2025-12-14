import Button from "@/components/libs/Button";
import OutlinedTextArea from "@/components/libs/OutlinedTextArea";
import Typography from "@/components/libs/Typography";
import StarRating from "@/components/my-jobs/StarRating";
import { useGiveRatingToWorkerMutation } from "@/store/features/jobSubmission";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  rating: yup.string().required("Rating score is required"),
  star_reason: yup.string().max(100, "Maximum 100 characters allowed"),
});

const RateUser = ({ taskId }) => {
  const [rateWorker, { isLoading }] = useGiveRatingToWorkerMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: "",
      star_reason: "",
    },
  });

  async function onSubmit(payload) {
    try {
      payload.job_submission_id = taskId;

      await rateWorker(payload).unwrap();
      toast.success("Rating sent successfully");
      reset();
    } catch (error) {
      toast.error(error.data?.message || "Internal Server Error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Typography variant="h6">Rate this proof</Typography>
      <hr />

      <div className="w-fit bg-border/90 flex items-center rounded-md px-5 py-1 gap-2">
        <Typography variant="body2" className="font-medium">
          Work Rating:
        </Typography>
        <StarRating
          rating={watch("rating")}
          setRating={(value) =>
            setValue("rating", value, { shouldValidate: true })
          }
        />
      </div>
      {errors.rating && (
        <Typography variant="error">{errors.rating.message}</Typography>
      )}
      <OutlinedTextArea
        placeholder="Enter your feedback or comments (optional)..."
        rows={5}
        {...register("star_reason")}
        error={errors.star_reason?.message}
      />

      <div className="flex justify-end">
        <Button loading={isLoading}>Send</Button>
      </div>
    </form>
  );
};

export default RateUser;
