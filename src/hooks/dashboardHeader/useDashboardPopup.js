import useOutsideClick from "@/hooks/useOutsideClick";
import { useState } from "react";

export function useDashboardPopup() {
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleNotification = () => setShowNotification((prev) => !prev);
  const toggleProfile = () => setShowProfile((prev) => !prev);
  const handleCloseProfile = () => setShowProfile(false);

  const notificationRef = useOutsideClick(() => setShowNotification(false));
  const profileRef = useOutsideClick(() => setShowProfile(false));

  return {
    showNotification,
    toggleNotification,
    notificationRef,
    showProfile,
    toggleProfile,
    profileRef,
    closeProfile: handleCloseProfile,
  };
}
