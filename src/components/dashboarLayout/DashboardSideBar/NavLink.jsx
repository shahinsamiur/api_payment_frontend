import Button from "@/components/libs/Button";
import clsx from "clsx";
import Link from "next/link";

function NavLink({ menu, route }) {
  const isActive = route === menu.path;
  const baseClasses = clsx("w-full justify-start gap-4", {
    "text-white bg-primary-dark": isActive,
    "dark:text-white hover:bg-border items-center": !isActive,
  });
  return (
    <Link href={menu.path}>
      <Button variant="text" className={baseClasses}>
        {menu.icon && menu.icon}
        {menu.label}
      </Button>
    </Link>
  );
}

export default NavLink;
