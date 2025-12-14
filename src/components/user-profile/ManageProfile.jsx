"use client";
import AccountDeactivationManager from "./AccountDeactivationManager";
import EditProfileInfoForm from "./EditProfileInfoForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default function Manage_Profile() {
  return (
    <div className="space-y-4">
      <EditProfileInfoForm />
      <UpdatePasswordForm />
      <AccountDeactivationManager />
    </div>
  );
}
