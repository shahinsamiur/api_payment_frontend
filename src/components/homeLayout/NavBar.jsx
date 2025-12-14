"use client";

import useResponsive from "@/hooks/useResponsive";
import useScrollDetection from "@/hooks/useScrollDetection";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import LoadingIndicator from "../common/LoadingIndicator";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import NavLogo from "./NavLogo";

const Navbar = () => {
  const isScrolled = useScrollDetection();
  const isMobile = useResponsive("down", "md");
  const route = usePathname();
  const { loading } = useSelector((state) => state.user);
  const { generalData, theme } = useSelector((state) => state.settings);

  const whitelist = ["/", "/about-us", "/live-support"];
  const isWhite = whitelist.includes(route);

  const wrapperClass = clsx("fixed w-full left-0 right-0 py-3 z-[99]", {
    "bg-card text-white shadow-md container mx-auto top-2 rounded-2xl":
      isScrolled,
    "bg-transparent top-0": !isScrolled,
  });

  return (
    <nav className={wrapperClass}>
      <div className="flex justify-between items-center px-5">
        <NavLogo
          generalData={generalData}
          isScrolled={isScrolled}
          isWhite={isWhite}
          theme={theme}
        />

        {loading ? (
          <LoadingIndicator />
        ) : !isMobile ? (
          <DesktopNav isScrolled={isScrolled} isWhite={isWhite} />
        ) : (
          <MobileNav />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
