import { config } from "@/config";
import { useDashboardPopup } from "@/hooks/dashboardHeader/useDashboardPopup";
import Image from "next/image";
import { useSelector } from "react-redux";
import ProfilePopup from "./ProfilePopup/ProfilePopup";

const HeaderProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { profileRef, showProfile, toggleProfile, closeProfile } =
    useDashboardPopup();

  const profileImage = user?.profile_image
    ? config.fileBaseUrl + user.profile_image
    : "/default.png";

  return (
    <div ref={profileRef}>
      <div className="relative" onClick={toggleProfile}>
        <Image
          className="size-10 md:size-12 object-cover rounded-full cursor-pointer"
          alt="Profile picture"
          src={profileImage}
          width={40}
          height={40}
        />
        {user?.is_premium && (
          <Image
            className="absolute -top-1 -right-1 bg-success rounded-full p-1 shadow"
            src="/icon/premium-icon.png"
            alt="premium"
            height={20}
            width={20}
          />
        )}
      </div>
      {showProfile && <ProfilePopup onCloseProfile={closeProfile} />}
    </div>
  );
};

export default HeaderProfile;
