"use client";

import { ForgetPasswordSchema } from "@/schema/auth";
import { useResetPasswordMutation } from "@/store/features/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import Card from "../libs/Card";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";

export default function ResetPasswordForm() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetPasswordMutation, { isLoading, error }] =
    useResetPasswordMutation();
  const queries = useSearchParams();
  const email = queries.get("email");
  const token = queries.get("token");
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      data.token = token;
      data.email = email;

      await resetPasswordMutation(data).unwrap();
      route.push("/signin");
    } catch (error) {
      toast.error(error.data?.message || "Internal Server Error");
    }
  };

  return (
    <Card className="w-full min-md:w-lg max-w-xl xl:-mt-24 !p-0 overflow-hidden">
      <div>
        <Typography
          variant="h5"
          align="center"
          color="white"
          className="bg-primary-dark py-3 px-3"
        >
          Reset Password
        </Typography>

        <form className="space-y-4 px-5 py-6" onSubmit={handleSubmit(onSubmit)}>
          <OutlinedInput
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            placeholder="Reset your password"
            error={errors.password?.message}
            endIcon={!showPassword ? <FaEye /> : <FaEyeSlash />}
            onEndIconClick={() => setShowPassword(!showPassword)}
          />

          <OutlinedInput
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            {...register("password_confirmation", { required: true })}
            placeholder="Re enter your password"
            error={errors.password_confirmation?.message}
            endIcon={!showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          {error && (
            <Typography variant="error">{error.data?.message}</Typography>
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
