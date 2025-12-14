"use client";
import { verification_types } from "@/_mock/verifications";
import { AccountVerificationSchema } from "@/schema/auth";
import { useManualVarificationMutation } from "@/store/features/verifications";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaAddressCard, FaCamera, FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { RiAlertFill } from "react-icons/ri";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import Card from "../libs/Card";
import DropdownMenus from "../libs/DropdownMenus";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";

export default function ManualVerification() {
  const frontImageRef = useRef(null);
  const selfieImageRef = useRef(null);
  const [manualVerification, { isLoading }] = useManualVarificationMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AccountVerificationSchema),
  });

  // Watch images for preview
  const frontImage = watch("frontImage");
  const selfieImage = watch("selfieImage");
  const verifyType = watch("verifyType");

  function getVerificationLabel(types, value) {
    const match = types.find((type) => type.value === value);
    return match ? match.label : "";
  }

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("verify_type", data.verifyType);
      formData.append("full_name", data.fullName);
      formData.append("card_number", data.cardNumber);
      formData.append("front_image", data.frontImage);
      formData.append("selfie_image", data.selfieImage);
      formData.append("phone_number", data.phoneNumber);

      await manualVerification(formData).unwrap();

      reset();

      // Reset file inputs manually
      if (frontImageRef.current) frontImageRef.current.value = null;
      if (selfieImageRef.current) selfieImageRef.current.value = null;

      toast.success("Verification submitted successfully");
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || "Internal Server Error"
      );
    }
  }

  return (
    <Card className="!p-0 overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h5"
          color="white"
          className="bg-primary-dark px-3 lg:px-5 py-2 lg:py-3"
        >
          Verify your account manually
        </Typography>

        <div className="px-3 lg:px-5 py-2 lg:py-3 space-y-3">
          <Typography variant="body2" color="warning" className="font-medium">
            Attention Please
          </Typography>

          <ul className="list-disc ml-6 mt-2 text-sm md:text-base text-gray-700 dark:text-white">
            <li>Image file must be less than 300kb (Don’t use copy image)</li>
            <li>Don’t upload fake or edited document.</li>
            <li>Please use real and clear document for verification.</li>
          </ul>

          <Typography
            variant="body2"
            color="warning"
            className="flex items-start lg:items-center gap-1"
          >
            <RiAlertFill />
            If you upload fake or edited document you will be permanently banned
            without any warning.
          </Typography>

          <div>
            <label>Select verify card</label>
            <Controller
              name="verifyType"
              control={control}
              render={({ field }) => (
                <DropdownMenus
                  selected={field.value}
                  setSelected={field.onChange}
                  placeholder="Select verify card"
                  options={verification_types}
                  error={errors.verifyType?.message}
                />
              )}
            />
            {errors.verifyType && (
              <Typography variant="error">
                {errors.verifyType.message}
              </Typography>
            )}
          </div>

          <OutlinedInput
            label={
              verifyType === "" || verifyType === undefined
                ? "Your  original full name"
                : `Your ${getVerificationLabel(
                    verification_types,
                    verifyType
                  )} full name`
            }
            placeholder={
              verifyType === "" || verifyType === undefined
                ? "Enter  original full name"
                : `Enter ${getVerificationLabel(
                    verification_types,
                    verifyType
                  )} full name`
            }
            {...register("fullName")}
            name="fullName"
            startIcon={<FaUser />}
            error={errors.fullName?.message}
          />

          <OutlinedInput
            label={
              verifyType === "" || verifyType === undefined
                ? "Your card number"
                : `Your ${getVerificationLabel(
                    verification_types,
                    verifyType
                  )} number`
            }
            placeholder={
              verifyType === "" || verifyType === undefined
                ? "Enter Card Number"
                : `Enter ${getVerificationLabel(
                    verification_types,
                    verifyType
                  )} Number`
            }
            {...register("cardNumber")}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            error={errors.cardNumber?.message}
            startIcon={<FaAddressCard />}
          />

          <OutlinedInput
            label="Your phone number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter phone number"
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
            startIcon={<FaPhone />}
          />

          <label>Card front side image where your face is visible</label>
          <div className="relative flex items-center gap-3">
            <Button
              type="button"
              onClick={() => {
                if (frontImageRef.current) {
                  frontImageRef.current.click();
                }
              }}
              variant="outline"
              className="w-full md:w-auto justify-start"
            >
              <FaCamera />
              Select Card Front Image
            </Button>

            {frontImage && (
              <Image
                width={100}
                height={100}
                className="h-12 w-10 object-cover"
                src={URL.createObjectURL(frontImage)}
                alt="preview image"
              />
            )}
          </div>
          {errors.frontImage && (
            <Typography variant="error">{errors.frontImage.message}</Typography>
          )}
          <input
            ref={frontImageRef}
            type="file"
            id="card-front"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              setValue("frontImage", file, { shouldValidate: true });
            }}
          />

          <label>Selfie with the front side of your card*</label>
          <div className="relative flex items-center gap-3">
            <Button
              type="button"
              onClick={() => {
                if (selfieImageRef.current) {
                  selfieImageRef.current.click();
                }
              }}
              variant="outline"
              className="w-full md:w-auto justify-start"
            >
              <FaCamera />
              Select Selfie Image
            </Button>

            {selfieImage && (
              <Image
                width={100}
                height={100}
                className="h-12 w-10 object-cover"
                src={URL.createObjectURL(selfieImage)}
                alt="preview image"
              />
            )}
          </div>
          {errors.selfieImage && (
            <Typography variant="error">
              {errors.selfieImage.message}
            </Typography>
          )}
          <input
            ref={selfieImageRef}
            type="file"
            id="selfie"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              setValue("selfieImage", file, { shouldValidate: true });
            }}
          />

          <Button
            loading={isLoading}
            variant="contain"
            type="submit"
            className="mt-6 w-full md:w-auto justify-center"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
}
