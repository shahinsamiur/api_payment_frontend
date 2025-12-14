import { config } from "@/config";
import useResponsive from "@/hooks/useResponsive";
import { toggleSideBar } from "@/store/slices/settings";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const SidebarHeader = () => {
  const { showSidebar, theme, generalData } = useSelector(
    (state) => state.settings
  );
  const isMd = useResponsive("down", "md");
  const dispatch = useDispatch();

  const logoUrl =
    theme === "light"
      ? generalData?.site_logo_light
      : generalData?.site_logo_dark;

  return (
    <>
      {logoUrl && (
        <Link href="/">
          <Image
            width={150}
            height={40}
            objectFit="cover"
            src={config.fileBaseUrl + logoUrl}
            alt="logo"
            className={`cursor-pointer h-[40px] w-[150px] object-contain ${
              showSidebar ? "block" : "hidden lg:group-hover:block"
            }`}
          />
        </Link>
      )}

      <button
        className={`cursor-pointer text-2xl absolute right-2 step-toggle-sidebar dark:text-white  ${
          isMd && !showSidebar ? "top-4" : "top-2"
        }`}
        onClick={() => dispatch(toggleSideBar())}
      >
        {showSidebar ? <HiMenuAlt3 /> : <IoMdMenu />}
      </button>
    </>
  );
};

export default SidebarHeader;
