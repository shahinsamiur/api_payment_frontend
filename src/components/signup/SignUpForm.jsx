"use client";

import { RegisterSchema } from "@/schema/auth";
import { useRegisterMutation } from "@/store/features/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import Card from "../libs/Card";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";
import CountrySelectField from "./CountrySelectField";
import TermsAndConditionsCheckbox from "./TermsAndConditionsCheckbox";

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [registerMutation, { isLoading, error }] = useRegisterMutation();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const referralCode = useSearchParams().get("referral_code");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      country_id: "",
      manager_id: "",
      acceptedTerms: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      setErrorMessage("");
      data.device_name = window.navigator.userAgent;
      if (referralCode) {
        data.referred_code = referralCode;
      }
      await registerMutation(data).unwrap();
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        device_name: data.device_name,
      });
      if (result.ok) {
        router.push("/verification");
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Internal Server Error";
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Card className="bg-card w-full min-md:w-xl max-w-3xl !p-0 overflow-hidden">
      <div className="">
        <Typography
          variant="h5"
          align="center"
          color="white"
          className="bg-primary-dark py-3 px-3"
        >
          Sign up with your real information
        </Typography>

        <form className="space-y-4 px-5 py-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <OutlinedInput
            label="Full name"
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter your full name"
            error={errors.name?.message}
          />

          {/* Email */}
          <OutlinedInput
            label="Email address"
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email address"
            error={errors.email?.message}
          />

          {/* Password */}
          <OutlinedInput
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            placeholder="Create your password"
            endIcon={!showPassword ? <FaEye /> : <FaEyeSlash />}
            onEndIconClick={() => setShowPassword(!showPassword)}
            error={errors.password?.message}
          />

          {/* Confirm Password */}
          <OutlinedInput
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            {...register("password_confirmation", { required: true })}
            placeholder="Enter your password again"
            endIcon={!showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            error={errors.password_confirmation?.message}
          />

          <CountrySelectField
            control={control}
            setValue={setValue}
            errors={errors}
          />

          <OutlinedInput
            label="Manager ID (optional)"
            type="text"
            name="manager_id"
            {...register("manager_id")}
            placeholder="Enter your manager ID"
            error={errors.manager_id?.message}
          />

          <TermsAndConditionsCheckbox register={register} errors={errors} />

          {(errorMessage || error) && (
            <Typography variant="error">
              {errorMessage || error?.data?.message}
            </Typography>
          )}

          {/* Submit */}
          <Button
            loading={isLoading}
            variant="contain"
            className="w-full justify-center"
          >
            Create Account
          </Button>
        </form>

        <Typography variant="body2" align="center" className="mb-5">
          Already have an account?{" "}
          <Link href="/signin" className="underline underline-offset-4">
            Login
          </Link>
        </Typography>
      </div>
    </Card>
  );
}
