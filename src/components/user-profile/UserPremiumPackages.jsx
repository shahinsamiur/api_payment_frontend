"use client";
import Link from "next/link";
import { GoPackageDependencies } from "react-icons/go";
import { useSelector } from "react-redux";
import Button from "../libs/Button";
import Typography from "../libs/Typography";

export default function UserPremiumPackages() {
  const { user } = useSelector((state) => state.user);
  const activePackage = user?.premium_subscriptions;

  const durationClass =
    "flex items-center justify-center size-14 lg:size-18 rounded-full bg-primary-darker";

  return (
    <div className="flex items-center gap-3 flex-wrap grow justify-center">
      {activePackage?.length ? (
        activePackage.map((items, index) => (
          <div className="flex flex-col items-center gap-2" key={index}>
            <div className={durationClass}>
              <Typography variant="h1" color="white">
                {items?.package?.duration}
              </Typography>
            </div>
            <div>
              <Typography variant="body1">
                {new Date(items?.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
              <Typography variant="body1">
                {new Date(items?.end_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Typography variant="body1" className="font-medium">
            No active package
          </Typography>
          <Link href="/premium">
            <Button size="sm">
              <GoPackageDependencies />
              Buy a package
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
