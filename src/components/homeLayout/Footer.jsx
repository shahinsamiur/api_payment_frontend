"use client";

import { footerMenus } from "@/_mock/menus";
import { config } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Typography from "../libs/Typography";

export default function Footer() {
  const { theme, generalData: data } = useSelector((state) => state.settings);

  const logo = theme === "light" ? data?.site_logo_light : data?.site_logo_dark;

  return (
    <footer className="dark:text-white p-10 bg-card">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between gap-6">
          {/* Brand/Logo Section */}
          <div className="flex flex-col items-start gap-4">
            {logo && (
              <Image
                height={100}
                width={200}
                src={config.fileBaseUrl + logo}
                alt="Logo"
                objectFit="cover"
              />
            )}

            <Typography variant="body1">
              {data?.site_description}
              <br />
              Registered office Address: {data?.site_address}
            </Typography>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap gap-10 grow justify-between">
            {footerMenus.map((menu, index) => (
              <div key={index}>
                <Typography variant="body1" className="font-medium mb-2">
                  {menu.title}
                </Typography>
                <ul className="space-y-1 ">
                  {menu.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="hover:text-primary-main"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* External link section */}
        <div className="flex justify-end items-center gap-3 mt-2">
          {Object.entries(data?.social_links || {})?.map(([key, value]) => (
            <a
              key={key}
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-main hover:text-primary-darker"
            >
              {key === "facebook" ? (
                <FaFacebook className="size-7" />
              ) : key === "linkedin" ? (
                <FaLinkedin className="size-7" />
              ) : key === "instagram" ? (
                <FaInstagram className="size-7" />
              ) : key === "twitter" ? (
                <FaTwitter className="size-7" />
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
