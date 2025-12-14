"use client";

import { toggleTheme } from "@/store/slices/settings";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import ProfileMenuList from "./ProfileMenuList";
import SignOutButton from "./SignOutButton";

export default function ProfilePopup({ onCloseProfile }) {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/signin" });
  };

  function handleToggleTheme() {
    dispatch(toggleTheme());
  }
  // h-[calc(100vh-60px)]
  const containerClass = clsx(
    "flex flex-col gap-0 z-[99] absolute right-3 md:right-5 top-full",
    "bg-card dark:text-white rounded-b-md pb-2 shadow-md dark:shadow-gray-100/10",
    " max-h-[520px]  w-[80%] max-w-[300px]"
  );

  return (
    <div className={containerClass}>
      <div className="overflow-y-auto">
        <ProfileHeader />

        <ProfileMenuList
          onToggleTheme={handleToggleTheme}
          onCloseProfile={onCloseProfile}
        />
        <SignOutButton onSignOut={handleSignOut} />
      </div>
    </div>
  );
}
