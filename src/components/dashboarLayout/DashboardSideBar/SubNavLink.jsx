import Button from "@/components/libs/Button";
import clsx from "clsx";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import NavLink from "./NavLink";

function SubNavLink({ menu, route }) {
  const [showSubMenus, setShowSubMenus] = useState(route);
  const isOpen = showSubMenus === menu.label;

  function handleShowSubMenu() {
    setShowSubMenus((prev) => (prev === menu.label ? null : menu.label));
  }

  return (
    <div className={`rounded-md ${isOpen ? "bg-border/80" : ""}`}>
      <Button
        variant="text"
        onClick={handleShowSubMenu}
        className={clsx(
          "hover:bg-border/80 w-full !justify-between text-gray-500 dark:text-gray-400",
          menu.className
        )}
      >
        <div className="flex items-center gap-4">
          {menu.icon}
          {menu.label}
        </div>
        {isOpen ? (
          <MdOutlineKeyboardArrowDown />
        ) : (
          <MdOutlineKeyboardArrowRight />
        )}
      </Button>

      {/* Animated Submenu */}
      <div
        className={clsx(
          "transition-all duration-500 ease-in-out overflow-hidden mx-3 mb-2",
          { "max-h-96 opacity-100": isOpen, "max-h-0 opacity-0": !isOpen }
        )}
      >
        {menu.subMenus.map((sub, index) => (
          <NavLink key={index} menu={sub} route={route} />
        ))}
      </div>
    </div>
  );
}

export default SubNavLink;
