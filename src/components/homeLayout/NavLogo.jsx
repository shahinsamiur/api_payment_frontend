"use client";

import { config } from "@/config";
import Image from "next/image";
import Link from "next/link";

const NavLogo = ({ generalData, isScrolled, isWhite, theme }) => {
  return (
    <Link href="/">
      {!generalData?.site_logo_light ||
      !generalData?.site_logo_dark ? null : isWhite ? (
        <Image
          src={
            isScrolled && theme === "light"
              ? config.fileBaseUrl + generalData?.site_logo_light
              : config.fileBaseUrl + generalData?.site_logo_dark
          }
          alt="Logo"
          height={40}
          width={150}
          unoptimized
          className={`${
            isScrolled ? "w-24 h-9 text-white" : "w-32 h-9"
          } object-contain cursor-pointer`}
        />
      ) : (
        <Image
          src={
            theme === "light"
              ? config.fileBaseUrl + generalData?.site_logo_light
              : config.fileBaseUrl + generalData?.site_logo_dark
          }
          alt="Logo"
          height={40}
          width={150}
          unoptimized
          className={`${
            isScrolled ? "w-24 h-9 text-white" : "w-32 h-9"
          } object-contain cursor-pointer`}
        />
      )}
    </Link>
  );
};

export default NavLogo;
