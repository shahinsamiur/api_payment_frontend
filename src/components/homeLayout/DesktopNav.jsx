"use client";

import { homeLayoutMenus } from "@/_mock/menus";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import LoadingIndicator from "../common/LoadingIndicator";
import Button from "../libs/Button";

const DesktopNav = ({ isScrolled, isWhite }) => {
  const { user, loading } = useSelector((state) => state.user);
  const route = usePathname();

  if (loading) {
    return <LoadingIndicator />;
  }

  const linkClass = clsx({
    "!border-border text-white": !isScrolled && isWhite,
  });

  return (
    <div className="hidden md:flex items-center gap-2">
      {homeLayoutMenus.map((menu) => {
        if (menu.loginRequired && !user) return null;
        if (!menu.loginRequired && user) return null;

        const isActive = route === menu.path;
        return (
          <Link key={menu.label} href={menu.path}>
            <Button
              className={linkClass}
              variant={isActive ? "contain" : "outline"}
            >
              {menu.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopNav;
