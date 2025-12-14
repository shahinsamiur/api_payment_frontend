"use client";
import Button from "@/components/libs/Button";
import ManageProfile from "@/components/user-profile/ManageProfile";
import ProfileOverview from "@/components/user-profile/ProfileOverview";
import { useState } from "react";

export default function ProfileContent() {
  const [isOverView, setisOverView] = useState(true);

  const handleOnclick = () => {
    setisOverView((isOverView) => !isOverView);
  };

  return (
    <>
      <div className="flex gap-3 justify-center md:justify-start">
        <Button
          variant={isOverView ? "contain" : "outline"}
          onClick={handleOnclick}
        >
          Overview
        </Button>

        <Button
          variant={isOverView ? "outline" : "contain"}
          onClick={handleOnclick}
        >
          Manage Profile
        </Button>
      </div>

      {isOverView ? <ProfileOverview /> : <ManageProfile />}
    </>
  );
}
