"use client";

import { useForgotPasswordMutation } from "@/store/features/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Button from "../libs/Button";
import Card from "../libs/Card";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

export default function ForgotPasswordForm() {
  const [resetPasswordMutation, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await resetPasswordMutation(data).unwrap();
    } catch (error) {
      toast.error(error.data?.message || "Internal Server Error");
    }
  };

  return (
    <Card className="w-full min-md:w-lg max-w-xl xl:-mt-24 !p-0 overflow-hidden">
      <div className="">
        <Typography
          variant="h5"
          align="center"
          color="white"
          className="bg-primary-dark py-3 px-3"
        >
          Password Recovery
        </Typography>

        <form className="space-y-4 px-5 py-6" onSubmit={handleSubmit(onSubmit)}>
          <OutlinedInput
            label="Email address"
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email address"
            error={errors.email?.message}
          />

          {error && (
            <Typography variant="error">{error.data?.message}</Typography>
          )}

          {isSuccess && (
            <Typography variant="body2" color="success" className="font-medium">
              Password reset email sent successfully!
            </Typography>
          )}

          {/* Submit */}
          <div className="flex justify-end">
            <Button loading={isLoading} variant="contain">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
