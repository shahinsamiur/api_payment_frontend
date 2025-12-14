import { deshboardFooterMenus } from "@/_mock/menus";
import Typography from "@/components/libs/Typography";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex items-center justify-end gap-4 mt-7 mb-3">
      {deshboardFooterMenus.map((menu, index) => (
        <Link key={index} href={menu.href}>
          <Typography variant="body2">{menu.label}</Typography>
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
