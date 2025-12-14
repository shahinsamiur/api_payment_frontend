import { dashboardMenuItems } from "@/_mock/menus";
import React from "react";
import { useSelector } from "react-redux";
import NavLink from "./NavLink";
import SubNavLink from "./SubNavLink";

const MenusList = ({ showSidebar, pathName }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div
      className={`flex-col transition-opacity duration-300 ease-in-out pt-10
          ${showSidebar ? "flex" : "hidden lg:group-hover:flex"}`}
    >
      {dashboardMenuItems.map((menu, index) => {
        if (menu.subMenus)
          return (
            <SubNavLink key={index} menu={menu} route={pathName} user={user} />
          );
        if (menu.hideOnVerified && user?.verificationStatus === "VERIFIED") {
          return null;
        }
        return <NavLink key={index} menu={menu} route={pathName} user={user} />;
      })}
    </div>
  );
};

export default MenusList;
