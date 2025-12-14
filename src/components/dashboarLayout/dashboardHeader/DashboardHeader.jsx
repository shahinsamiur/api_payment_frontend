"use client";

import { useScrollHeader } from "@/hooks/dashboardHeader/useScrollHeader";
import useResponsive from "@/hooks/useResponsive";
import clsx from "clsx";
import HeaderBalance from "./HeaderBalance";
import HeaderNotification from "./HeaderNotification";
import HeaderProfile from "./HeaderProfile";

export default function DashboardHeader() {
  const isScrolled = useScrollHeader();
  const isMobile = useResponsive("down", "md");

  const headerContainer = clsx(
    "flex justify-end items-center gap-4 md:gap-3 px-2 md:px-10 py-2",
    "bg-card border-b border-border border-dashed z-[60] sticky top-0",
    { "shadow-md": isScrolled }
  );

  return (
    <header className={headerContainer}>
      {!isMobile && <HeaderBalance />}
      <HeaderNotification />

      <HeaderProfile />
    </header>
  );
}
