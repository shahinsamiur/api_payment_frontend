"use client";
import ProfileContent from "@/components/user-profile/ProfileContent";
import ProfileHeader from "@/components/user-profile/ProfileHeader";

export default function page() {
  return (
    <div className="space-y-5">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
}
