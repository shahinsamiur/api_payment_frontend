import PackageCard from "@/components/premium/PackageCard";
import { config } from "@/config";
import Link from "next/link";
import React from "react";
import Animation from "../libs/Animation";
import Button from "../libs/Button";
import Typography from "../libs/Typography";

const revalidate = 0; //60 * 5;

export default async function PremiumPkg() {
  const res = await fetch(`${config.apiBaseUrl}/subscription-packages`, {
    headers: {
      "Content-type": "Application/json",
      Accept: "Application/json",
      "X-API-Key": config.apiKey,
    },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return (
    <div
      data-testid="home-page-premium-pkg-section"
      className="bg-card px-3 py-14 xl:py-20"
    >
      <div className="container mx-auto">
        <div className="mb-10">
          <Animation
            inViewClass="opacity-100 translate-x-0"
            outViewClass="opacity-0 -translate-x-10"
          >
            <Typography variant="h3" color="primary">
              Unlock Premium Features
            </Typography>
          </Animation>
          <Animation
            inViewClass="opacity-100 translate-y-0"
            outViewClass="opacity-0 translate-y-10"
            animationDelay={2}
          >
            <Typography variant="body2">
              Choose the perfect plan to accelerate your growth
            </Typography>
          </Animation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {data?.subscription_package_list?.length ? (
            data?.subscription_package_list.map((item, index) => (
              <Animation
                inViewClass="opacity-100 translate-y-0"
                outViewClass="opacity-0 translate-y-20"
                threshold={0.3 * index}
                key={index}
              >
                <PackageCard data={item} className="border border-border">
                  <Link href={"/premium"}>
                    <Button>Get Started</Button>
                  </Link>
                </PackageCard>
              </Animation>
            ))
          ) : (
            <Typography
              variant="caption"
              align="center"
              className="col-span-3 mt-10"
            >
              Currently package available
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
