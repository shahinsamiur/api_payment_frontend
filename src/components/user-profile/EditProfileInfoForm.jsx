"use client";
import { EditProfileSchema } from "@/schema/auth";
import {
  useSendVarificationMailMutation,
  useUpdateProfileMutation,
} from "@/store/features/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import Card from "../libs/Card";
import OutlinedInput from "../libs/OutlinedInput";
import OutlinedTextArea from "../libs/OutlinedTextArea";
import Typography from "../libs/Typography";

export default function EditProfileInfoForm() {
  const { user } = useSelector((state) => state.user);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [sendVarificationEmail, { isLoading: isLoadingVarification }] =
    useSendVarificationMailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditProfileSchema),
    defaultValues: {
      name: user?.name,
      age: user?.age,
      email: user?.email,
      country: user?.country.country_name,
      about_me: user?.about_me,
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || "Internal Server Error");
    }
  };

  const handleSendVarificationMessage = async () => {
    try {
      await sendVarificationEmail().unwrap();
      toast.success("Verification email sent successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || "Internal Server Error");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Typography variant="h5">Edit Profile Information</Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OutlinedInput
            label="Full Name (NID, Passport or Legal name)"
            placeholder="Enter your full name"
            {...register("name", { required: false })}
            error={errors.name?.message}
          />

          <OutlinedInput
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
            disabled={user?.email_verified_at}
            {...register("email", { required: false })}
            error={errors.email?.message}
            endAdornment={
              <Button
                type="button"
                onClick={handleSendVarificationMessage}
                loading={isLoadingVarification}
                disabled={user?.is_mail_verified || isLoadingVarification}
                variant={user?.is_mail_verified ? "success" : "error"}
              >
                {user?.is_mail_verified ? "Verified" : "Verify now"}
              </Button>
            }
          />

          <OutlinedInput
            label="Age"
            placeholder="Enter your age"
            {...register("age", { required: false })}
            type="number"
            error={errors.age?.message}
          />

          <OutlinedInput
            label="Country"
            placeholder="Enter your country"
            disabled
            {...register("country", { required: false })}
            error={errors.country?.message}
          />
        </div>

        <OutlinedTextArea
          label="About me"
          placeholder="Enter about yourself"
          rows={4}
          {...register("about_me", { required: false })}
          error={errors.about_me?.message}
        />

        <Button loading={isLoading} variant="contain">
          Update
        </Button>
      </form>
    </Card>
  );
}
