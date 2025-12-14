import { selectOptions } from "@/_mock/selectOptions";
import { JobBasicDetailsSchema } from "@/schema/jobs";
import { setJobPostFirstForm } from "@/store/slices/jobform";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { IoRemoveCircle } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Button from "../libs/Button";
import DropdownMenus from "../libs/DropdownMenus";
import IconButton from "../libs/IconButton";
import OutlinedInput from "../libs/OutlinedInput";
import OutlinedTextArea from "../libs/OutlinedTextArea";
import Typography from "../libs/Typography";
import NextAndPrevButton from "./NextAndPrevButton";

export default function JobBasicDetailsForm({
  setSteper,
  thumbnailImage,
  setThumbnailImage,
}) {
  const thumbnailRef = useRef(null);
  const dispatch = useDispatch();
  const { jobPostFirstForm } = useSelector((state) => state.jobForm);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(JobBasicDetailsSchema),
    defaultValues: {
      title: jobPostFirstForm.title,
      tag_line: jobPostFirstForm.tag_line,
      description: jobPostFirstForm.description,
      steps: JSON.parse(jobPostFirstForm.steps),
      required_proofs: JSON.parse(jobPostFirstForm.required_proofs),
      question_condition: JSON.parse(jobPostFirstForm.question_condition),
      thumbnail: thumbnailImage || null,
    },
  });

  const watchThumbnail = watch("thumbnail");

  const { fields: requiredProofs } = useFieldArray({
    name: "required_proofs",
    control: control,
  });
  const {
    fields: steps,
    append: appendSteps,
    remove: removeSteps,
  } = useFieldArray({
    name: "steps",
    control: control,
  });
  const { fields: questionCondition } = useFieldArray({
    name: "question_condition",
    control: control,
  });

  const onSubmit = async (payload) => {
    payload.steps = JSON.stringify(payload.steps);
    payload.required_proofs = JSON.stringify(payload.required_proofs);
    payload.question_condition = JSON.stringify(payload.question_condition);

    delete payload.thumbnail;

    dispatch(setJobPostFirstForm(payload));
    setSteper((prev) => prev + 1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Title */}
        <OutlinedInput
          label="Write an accurate job title"
          {...register("title")}
          type="text"
          placeholder="Enter your job title"
          error={errors.title?.message}
        />

        {/* Description */}
        <OutlinedInput
          label="Job short title"
          {...register("description")}
          placeholder="Write short title"
          error={errors.description?.message}
        />

        {/* steps */}
        <div>
          <label>What specific task you need to be completed</label>

          <div className="space-y-2">
            {steps.map((field, index) => (
              <div className="relative" key={field.id}>
                <OutlinedTextArea
                  rows={2}
                  {...register(`steps.${index}.instruction`)}
                  placeholder={`Step ${index + 1}`}
                  error={errors.steps?.[index]?.instruction?.message}
                />

                {/* remove steps */}
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeSteps(index)}
                    className="absolute right-0 -top-1"
                  >
                    <IoRemoveCircle className="text-error text-xl" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-1">
            <IconButton
              type="button"
              size="sm"
              className="rounded-md"
              onClick={() =>
                appendSteps({ step_number: steps.length + 1, instruction: "" })
              }
            >
              <TiPlus />
            </IconButton>
          </div>
        </div>

        {/* Proofs */}
        <div>
          <label>Require the proof the job was completed</label>
          {requiredProofs.map((proof, index) => (
            <div
              key={index}
              className="flex flex-wrap gap-2 items-start relative mb-2"
            >
              <div className="grow">
                <Controller
                  name={`required_proofs.${index}.type`}
                  control={control}
                  render={({ field }) => (
                    <DropdownMenus
                      options={selectOptions.job.required_proof_type}
                      selected={field.value}
                      setSelected={(value) => field.onChange(value)}
                      placeholder="Proof type"
                      error={errors.required_proofs?.[index]?.type}
                    />
                  )}
                />
                {errors.required_proofs?.[index]?.type && (
                  <Typography variant="error">
                    {errors.required_proofs[index].type.message}
                  </Typography>
                )}
              </div>

              <div className="grow w-full">
                <OutlinedTextArea
                  rows={5}
                  {...register(`required_proofs.${index}.description`)}
                  placeholder="Proof description"
                  error={errors.required_proofs?.[index]?.description?.message}
                />
              </div>

              {/* remove proofs */}
              {/* {index !== 0 && (
                <button
                  type="button"
                  onClick={() => removeRequiredProofs(index)}
                  className="absolute right-0 -top-1"
                >
                  <IoRemoveCircle className="text-error text-xl" />
                </button>
              )} */}
            </div>
          ))}

          {/* <div className="flex justify-end mt-1">
            <Button
              type="button"
              onClick={() =>
                appendRequiredProofs({
                  type: "text",
                  description: "",
                })
              }
              variant="contain"
            >
              <TiPlus className="text-xl" />
            </Button>
          </div> */}
        </div>

        {/* question_condition */}
        <div>
          <label>Question condition</label>
          {questionCondition.map((field, index) => (
            <div
              className="flex items-start gap-2 flex-wrap mb-2"
              key={field.id}
            >
              {/* answer_type */}
              <div className="grow">
                <Controller
                  name={`question_condition.${index}.answer_type`}
                  control={control}
                  render={({ field }) => (
                    <DropdownMenus
                      options={selectOptions.job.question_condition_type}
                      selected={field.value}
                      setSelected={(value) => {
                        field.onChange(value);
                        if (value === "text") {
                          setValue(
                            `question_condition.${index}.condition.operator`,
                            "==",
                            {
                              shouldValidate: true,
                            }
                          );
                        }
                      }}
                      placeholder="Question type"
                      error={errors.question_condition?.[index]?.answer_type}
                    />
                  )}
                />
                {errors.question_condition?.[index]?.answer_type && (
                  <Typography variant="error">
                    {errors.question_condition[index]?.answer_type?.message}
                  </Typography>
                )}
              </div>

              {/* text */}
              <div className="grow">
                <OutlinedInput
                  type="text"
                  placeholder="Question"
                  {...register(`question_condition.${index}.text`)}
                  error={errors.question_condition?.[index]?.text?.message}
                />
              </div>

              {/* operator  */}
              <div className="grow">
                <Controller
                  name={`question_condition.${index}.condition.operator`}
                  control={control}
                  render={({ field }) => (
                    <DropdownMenus
                      className="min-w-48"
                      options={selectOptions.job.question_condition_operator}
                      selected={field.value}
                      disabled={
                        watch(`question_condition.${index}.answer_type`) ===
                        "text"
                      }
                      setSelected={(value) => field.onChange(value)}
                      placeholder="Operator"
                      error={
                        errors.question_condition?.[index]?.condition?.operator
                      }
                    />
                  )}
                />
                {errors.question_condition?.[index]?.condition?.operator && (
                  <Typography variant="error">
                    {
                      errors.question_condition[index]?.condition?.operator
                        ?.message
                    }
                  </Typography>
                )}
              </div>

              {/* value */}
              <div className="relative grow">
                <OutlinedInput
                  type="text"
                  placeholder="Value"
                  {...register(`question_condition.${index}.condition.value`)}
                  error={
                    errors.question_condition?.[index]?.condition?.value
                      ?.message
                  }
                />

                {/* remove question_condition */}
                {/* {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeQuestionCondition(index)}
                    className="absolute right-0 -top-1"
                  >
                    <IoRemoveCircle className="text-error text-xl" />
                  </button>
                )} */}
              </div>
            </div>
          ))}
          {/* <div className="flex justify-end mt-1">
            <Button
              type="button"
              variant="contain"
              onClick={() => {
                appendQuestionCondition({
                  id: questionCondition.length + 1,
                  answer_type: "",
                  text: "",
                  condition: {
                    operator: "",
                    value: "",
                  },
                });
              }}
            >
              <TiPlus className="text-xl" />
            </Button>
          </div> */}
        </div>

        {/* Thumbnail */}
        <label>Thumbnail image</label>
        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Button
                type="button"
                className={clsx("w-full md:w-auto justify-start", {
                  // "!border-error !text-error": errors.thumbnail,
                })}
                onClick={() => thumbnailRef.current?.click()}
                variant="outline"
              >
                <FaCamera /> Select Image
              </Button>
              {errors.thumbnail && (
                <Typography variant="error">
                  {errors.thumbnail?.message || "Thumbnail image is required"}
                </Typography>
              )}

              {watchThumbnail && (
                <Image
                  height={200}
                  width={500}
                  src={
                    typeof watchThumbnail === "string"
                      ? watchThumbnail
                      : URL.createObjectURL(watchThumbnail)
                  }
                  alt="Preview"
                  className="rounded-lg object-cover"
                />
              )}

              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                ref={thumbnailRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                  setThumbnailImage(file);
                }}
              />
            </div>
          )}
        />

        {/* Next Button (your custom component) */}
        <NextAndPrevButton
          hiddenNext={true}
          handleSubmit={true}
          setSteper={setSteper}
          submitBtnText="Next"
        />
      </form>
    </div>
  );
}
