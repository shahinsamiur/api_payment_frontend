"use client";

import Button from "@/components/libs/Button";
import Card from "@/components/libs/Card";
import OutlinedInput from "@/components/libs/OutlinedInput";
import OutlinedTextArea from "@/components/libs/OutlinedTextArea";
import Typography from "@/components/libs/Typography";
import NotVarifiedBudge from "@/components/wallet/NotVarifiedBudge";
import { imageCompressor } from "@/services/imageCompressor";
import { useJobSubmissionMutation } from "@/store/features/jobs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function JoSubmission({ data, jobId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [jobSubmission] = useJobSubmissionMutation();
  const router = useRouter();
  const job = data?.data ?? {};

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const { fields: images, replace: appendImages } = useFieldArray({
    name: "images",
    control,
  });
  const { fields: answers, replace: appendAnswer } = useFieldArray({
    name: "answer",
    control,
  });

  const questions = JSON.parse(job.question_condition || "[]");
  const requireScreenshots = parseInt(job.require_screenshots ?? "0");

  useEffect(() => {
    if (requireScreenshots) {
      const initialImages = Array.from(
        { length: requireScreenshots },
        () => null
      );
      appendImages(initialImages);
    }

    if (questions.length > 0) {
      const initialAnswers = questions.map((question) => {
        return {
          [question.id]: "",
        };
      });
      appendAnswer(initialAnswers);
    }
  }, [data]);

  async function onSubmit(payload) {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("job_id", jobId);
      formData.append("proof_data", payload.proof_data);
      if (payload.answer)
        formData.append("answer", JSON.stringify(payload.answer));
      const images = payload.images;
      if (images) {
        for (const image of images) {
          const file = image[0];
          const compressedBlob = await imageCompressor(file, {
            height: 400,
            width: 600,
            quality: 75,
          });
          formData.append("images[]", compressedBlob);
        }
      }

      await jobSubmission(formData).unwrap();
      toast.success("Job submission successfully");
      router.push("/my-works");
    } catch (err) {
      toast.error(err?.data?.message || "Internal Server Error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <OutlinedTextArea
          label="Required Proof that task was completed"
          placeholder="Enter required proofs"
          rows={5}
          error={errors.proof_data?.message}
          {...register("proof_data", {
            required: "Proof data is required",
          })}
        />

        {answers.length > 0 && (
          <div>
            {answers?.map((answer, index) => {
              const key = Object.keys(answer).find((k) => k !== "id") || "";
              const question = questions.find(
                (item) => item.id.toString() === key
              );
              return (
                <OutlinedInput
                  key={answer.id}
                  label={question.text}
                  placeholder="Enter answer"
                  error={errors?.answer?.[index]?.[key]?.message ?? ""}
                  {...register(`answer.${index}.${key}`, {
                    required: "Answer is required",
                  })}
                />
              );
            })}
          </div>
        )}

        {requireScreenshots > 0 && (
          <div>
            <label>
              Attach Required {requireScreenshots}{" "}
              {requireScreenshots > 1 ? "screenshots" : "screenshot"}
            </label>

            {images.map((_image, index) => {
              const watchedImage = watch(`images.${index}`); // get current file input value

              return (
                <div key={index}>
                  <OutlinedInput
                    {...register(`images.${index}`, {
                      required: "Image is required",
                      validate: {
                        fileSize: (value) =>
                          value?.[0]?.size <= 10 * 1024 * 1024 ||
                          "Image must be less than 2048KB",
                      },
                    })}
                    type="file"
                    accept="image/*"
                    error={errors.images?.[index]?.message}
                    className="file-input"
                  />

                  {watchedImage?.[0] && (
                    <div className="flex items-center gap-2 mt-2">
                      <Image
                        height={200}
                        width={400}
                        src={URL.createObjectURL(watchedImage[0])}
                        alt="preview"
                        className=" object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {errors.images && typeof errors.images.message === "string" && (
              <Typography variant="body2" color="error">
                {errors.images.message}
              </Typography>
            )}
          </div>
        )}

        <div className="flex justify-center items-center mt-5">
          {user?.id === job?.provider?.id ? (
            <Typography color="warning" className="font-medium">
              You are the owner of this job. You cannot submit work for your own
              job.
            </Typography>
          ) : user?.verificationStatus === "VERIFIED" ? (
            <Button
              loading={isLoading}
              disabled={
                user?.verificationStatus != "VERIFIED" ||
                user?.id === job?.provider?.id
              }
              variant="contain"
              type="submit"
              className="w-full md:w-auto md:!px-10 justify-center"
            >
              Submit
            </Button>
          ) : (
            <NotVarifiedBudge message="Please verify your account first" />
          )}
        </div>
      </form>
    </Card>
  );
}

export default JoSubmission;
