"use client";

import { homeLayoutMenus } from "@/_mock/menus";
import useOutsideClick from "@/hooks/useOutsideClick";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import NavLink from "../dashboarLayout/DashboardSideBar/NavLink";
import IconButton from "../libs/IconButton";

const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useOutsideClick(() => setMenuOpen(false));
  const route = usePathname();
  const { user } = useSelector((state) => state.user);

  const wrapperClsass = clsx(
    "fixed top-0 right-0 h-full w-3/4 max-w-[300px] bg-card shadow-md z-[98] transform transition-transform duration-300 ease-in-out md:hidden px-1",
    {
      "translate-x-0": menuOpen,
      "translate-x-full": !menuOpen,
    }
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  return (
    <>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="text-primary-main dark:text-white"
        aria-label="Toggle Menu"
      >
        {menuOpen ? <IoClose /> : <FaBars />}
      </button>

      <div ref={mobileMenuRef} className={wrapperClsass}>
        <div className="absolute top-4 right-4">
          <IconButton>
            <IoClose onClick={() => setMenuOpen(false)} />
          </IconButton>
        </div>

        <div className="mt-18 space-y-1">
          {homeLayoutMenus.map((menu) => {
            if (menu.loginRequired && !user) return null;
            if (!menu.loginRequired && user) return null;
            return <NavLink menu={menu} route={route} key={menu.path} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MobileNav;
