import { userPopOverMenus } from "@/_mock/menus";
import Switch from "@/components/libs/Swithch";
import Typography from "@/components/libs/Typography";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CgDarkMode } from "react-icons/cg";
import { useSelector } from "react-redux";

const ProfileMenuList = ({ onToggleTheme, onCloseProfile }) => {
  const { user } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.settings);
  const route = usePathname();

  return (
    <div className="border-y border-border p-1">
      {userPopOverMenus.map((item, index) => {
        const isActive = route === item.path;
        const baseClasses = clsx(
          "flex justify-start px-3 py-2 gap-2 items-center rounded-md",
          { "text-white bg-primary-dark": isActive },
          { "dark:text-white hover:bg-border": !isActive }
        );

        const content = (
          <>
            <item.icon
              className={isActive ? "text-white" : "dark:text-white"}
            />
            <span>{item.label}</span>
            {user?.is_premium && item.path === "/user-profile" && (
              <Image
                src="/icon/premium-icon.png"
                alt="premium"
                height={20}
                width={20}
              />
            )}
          </>
        );

        return item.external ? (
          <a
            href={item.path}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
          >
            {content}
          </a>
        ) : (
          <Link
            href={item.path}
            key={index}
            onClick={onCloseProfile}
            className={baseClasses}
          >
            {content}
          </Link>
        );
      })}

      <div className="flex justify-between items-center py-2 px-3">
        <div className="flex items-center gap-2">
          <CgDarkMode />
          <Typography variant="body2">
            {theme === "dark" ? "Dark" : "Light"} Mode
          </Typography>
        </div>
        <Switch onChange={onToggleTheme} enabled={theme === "dark"} />
      </div>
    </div>
  );
};

export default ProfileMenuList;
