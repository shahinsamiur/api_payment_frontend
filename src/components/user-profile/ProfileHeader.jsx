"use client";

import Card from "@/components/libs/Card";
import UserPremiumPackages from "@/components/user-profile/UserPremiumPackages";
import UserProfileInfo from "@/components/user-profile/UserProfileInfo";

export default function ProfileHeader() {
  return (
    <Card>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <UserProfileInfo />
        <UserPremiumPackages />
      </div>
    </Card>
  );
}
