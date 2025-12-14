import Typography from "@/components/libs/Typography";
import useResponsive from "@/hooks/useResponsive";
import React from "react";
import { HiShieldExclamation } from "react-icons/hi2";
import { MdVerifiedUser } from "react-icons/md";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import HeaderBalance from "../HeaderBalance";

const ProfileHeader = () => {
  const { user } = useSelector((state) => state.user);
  const isMobile = useResponsive("down", "md");

  return (
    <div className="pb-2 px-2 space-y-2">
      <div className="flex items-center justify-center gap-1">
        <Typography align="center" variant="body2">
          Hello, {user?.name}
        </Typography>

        {user?.is_verified ? (
          <>
            <div
              data-tooltip-id="user-varified"
              data-tooltip-content="Varified User"
            >
              <MdVerifiedUser className="text-success" />
              <Tooltip id="user-varified" />
            </div>
          </>
        ) : (
          <div
            data-tooltip-id="not-virified"
            data-tooltip-content="User Not Varified"
          >
            <HiShieldExclamation className="text-xl text-warning" />
            <Tooltip id="not-virified" />
          </div>
        )}
      </div>
      {isMobile && (
        <HeaderBalance
          size="sm"
          className1="bg-primary-darker text-white w-full mb-1 !rounded"
          className2="bg-primary-darker text-white w-full mb-1 !rounded"
        />
      )}
    </div>
  );
};

export default ProfileHeader;
