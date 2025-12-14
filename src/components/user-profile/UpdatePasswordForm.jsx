"use client";
import { ResetPasswordSchema } from "@/schema/auth";
import { useUpdatePasswordMutation } from "@/store/features/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidEdit } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import Card from "../libs/Card";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";

export default function UpdatePasswordForm() {
  const [updatePassword, { isLoading: isLoadingPassword }] =
    useUpdatePasswordMutation();
  const router = useRouter();
  const [showPassCurrent, setShowPassCurrent] = useState(false);
  const [showPassNew, setShowPassNew] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmitPassword = async (data) => {
    try {
      await updatePassword(data).unwrap();
      toast.success("Password updated successfully");
      router.push("/signin");
    } catch (error) {
      toast.error(error.data?.message || "Internal Server Error");
    }
  };

  return (
    <Card>
      <form
        onSubmit={handleSubmitPassword(onSubmitPassword)}
        className="space-y-4"
      >
        <Typography variant="h5">Account Password</Typography>
        <OutlinedInput
          label="Current password"
          type={showPassCurrent ? "text" : "password"}
          placeholder="Enter your current password"
          {...registerPassword("old_password", { required: true })}
          error={errorsPassword.old_password?.message}
          endIcon={!showPassCurrent ? <FaEye /> : <FaEyeSlash />}
          onEndIconClick={() => setShowPassCurrent(!showPassCurrent)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OutlinedInput
            label="New Password"
            placeholder="Enter new password"
            type={showPassNew ? "text" : "password"}
            {...registerPassword("password", { required: true })}
            error={errorsPassword.password?.message}
            endIcon={!showPassNew ? <FaEye /> : <FaEyeSlash />}
            onEndIconClick={() => setShowPassNew(!showPassNew)}
          />

          <OutlinedInput
            label="Confirm password"
            type={showPassConfirm ? "text" : "password"}
            placeholder="Confirm password"
            {...registerPassword("password_confirmation", {
              required: true,
            })}
            error={errorsPassword.password_confirmation?.message}
            endIcon={!showPassConfirm ? <FaEye /> : <FaEyeSlash />}
            onEndIconClick={() => setShowPassConfirm(!showPassConfirm)}
          />
        </div>
        <Button type="submit" loading={isLoadingPassword} variant="contain">
          <BiSolidEdit className="text-lg" />
          Update Password
        </Button>
      </form>
    </Card>
  );
}
