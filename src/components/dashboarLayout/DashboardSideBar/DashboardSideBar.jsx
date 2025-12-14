"use client";
import useOutsideClick from "@/hooks/useOutsideClick";
import useResponsive from "@/hooks/useResponsive";
import { toggleSideBar } from "@/store/slices/settings";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenusList from "./MenusList";
import SidebarHeader from "./SidebarHeader";

export default function DashboardSideBar() {
  const menuRef = useOutsideClick(() => dispatch(toggleSideBar()));
  const { showSidebar } = useSelector((state) => state.settings);
  const pathName = usePathname();
  const isMd = useResponsive("down", "lg");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMd) {
      dispatch(toggleSideBar(false));
    }
  }, [isMd, pathName]);

  const getSidebarWidth = () => {
    if (isMd) {
      return showSidebar
        ? "w-[280px] shadow-md dark:shadow-gray-100/10"
        : "w-[40px]"; // No hover effect on mobile
    }
    return showSidebar
      ? "w-[330px] lg:w-[310px] xl:w-[280px] 2xl:w-[380px]"
      : "w-[40px] lg:hover:w-[310px] xl:hover:w-[280px] 2xl:hover:w-[380px]";
  };

  const getSidebarPosition = () => {
    if (isMd) return "fixed"; // always absolute on small screens
    return showSidebar ? "sticky top-0" : "fixed"; // relative/fixed on large
  };

  return (
    <>
      <div
        ref={showSidebar && isMd ? menuRef : null}
        className={`group z-[80] h-screen flex flex-col gap-y-5 transition-all duration-300 px-2 py-3 lg:border-r border-border border-dashed ${getSidebarPosition()} ${getSidebarWidth()} ${
          isMd && !showSidebar ? "bg-transparent" : "bg-card"
        }`}
      >
        <div className="overflow-auto">
          <SidebarHeader />
          <MenusList pathName={pathName} showSidebar={showSidebar} />
        </div>
      </div>
      <div className="w-0 lg:w-[40px] " />
    </>
  );
}
