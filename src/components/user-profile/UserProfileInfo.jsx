"use client";
import { config } from "@/config";
import { useUpdateProfilePictureMutation } from "@/store/features/auth";
import Image from "next/image";
import { useRef, useState } from "react";
import { IoCameraSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Flag from "react-world-flags";
import Typography from "../libs/Typography";

export default function UserProfileInfo() {
  const { user } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState("/default.png");
  const [updateProfileImage, { isLoading }] = useUpdateProfilePictureMutation();
  const profileImageRef = useRef(null);

  const handleProfileImage = async (e) => {
    try {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("profile_image", file);
      await updateProfileImage(formData).unwrap();
      toast.success("Profile image updated successfully");
    } catch (error) {
      toast.error(error.data?.message || "Internal Server Error");
    }
  };

  return (
    <div className="flex  items-center gap-3 dark:text-white">
      <div className="relative">
        <div className="relative">
          <Image
            alt="profile picture"
            src={
              user?.profile_image
                ? config.fileBaseUrl + user?.profile_image
                : profileImage
            }
            className="size-20 rounded-full object-cover"
            style={{ objectFit: "cover" }}
            height={80}
            width={80}
          />
          <div
            className={`${
              user?.online_status ? "bg-primary-light" : "bg-gray-400"
            } size-4 rounded-2xl absolute top-1 right-1`}
          />
        </div>
        <button
          disabled={isLoading}
          className="absolute bottom-0 right-0"
          onClick={() => profileImageRef.current?.click()}
        >
          <IoCameraSharp className="size-5 text-primary-dark dark:text-white" />
        </button>
        <input
          ref={profileImageRef}
          onChange={handleProfileImage}
          type="file"
          className="hidden"
          accept="image/png, image/jpg, image/jpeg"
        />
      </div>

      <div className="">
        <div className="flex items-center gap-2">
          <Typography variant="body1" className="font-medium">
            {user?.name}
          </Typography>
          {user?.country?.short_name && (
            <Flag code={user.country.short_name} className="size-7" />
          )}
        </div>

        <Typography variant="body2">User ID: {user?.id}</Typography>
        <Typography variant="body2" className="font-medium">
          Since:{" "}
          {new Date(user?.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Typography>
      </div>
    </div>
  );
}
