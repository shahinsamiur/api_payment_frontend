"use client";

import { LoginSchema } from "@/schema/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import * as yup from "yup";
import Button from "../libs/Button";
import Card from "../libs/Card";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";

type SignInFormData = yup.InferType<typeof LoginSchema>;

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const redirect = useSearchParams().get("redirect");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      data.device_name = window.navigator.userAgent;
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage(result.error);
        toast.error(result.error);
      } else {
        router.push(redirect || "/deposit");
      }
    } catch (error: any) {
      const errorMessage =
        error.message || error.data?.message || "Internal Server Error";
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full min-md:w-lg max-w-xl  !p-0 overflow-hidden">
      <div className="">
        <Typography
          variant="h5"
          align="center"
          color="white"
          className="bg-primary-dark py-3 px-3"
        >
          Sign in to your account
        </Typography>

        <form className="space-y-4 px-5 py-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <OutlinedInput
            label="Email Address"
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
            error={errors.password?.message}
            onEndIconClick={() => setShowPassword(!showPassword)}
            endIcon={showPassword ? <FaEyeSlash /> : <FaEye />}
          />

          {/* Terms */}
          <div className="flex justify-between gap-1 items-center flex-wrap">
            <div className="flex items-center gap-1 ">
              <input
                id="rememberme"
                type="checkbox"
                {...register("rememberMe")}
                className="!w-fit"
              />
              <label htmlFor="rememberme" className="cursor-pointer ">
                Remember me
              </label>
            </div>

            <div className="flex justify-end mt-2">
              <Link
                href="/forgot-password"
                className="dark:text-white cursor-pointer"
              >
                Forgot password ?
              </Link>
            </div>
          </div>

          {errorMessage && (
            <Typography variant="error">{errorMessage}</Typography>
          )}

          {/* Submit */}
          <div className="flex justify-center">
            <Button
              loading={isLoading}
              variant="contain"
              className="w-full justify-center"
            >
              Login
            </Button>
          </div>
          <Link href="/signup">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-center mt-18"
            >
              Create new account
            </Button>
          </Link>
        </form>
      </div>
    </Card>
  );
}
