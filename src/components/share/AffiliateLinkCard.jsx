"use client";

import Card from "@/components/libs/Card";
import IconButton from "@/components/libs/IconButton";
import { config } from "@/config";
import { useReferredDataQuery } from "@/store/features/auth";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Typography from "../libs/Typography";

export default function AffiliateLinkCard() {
  const { user } = useSelector((state) => state.user);
  const affiliateLink = `${config.siteUrl}/signup/?ref=${user?.id}&type=affiliate&referral_code=${user?.referral_code}`;
  const [copied, setCopied] = useState(false);
  const { data, isLoading: affiliateDataLoading } = useReferredDataQuery();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Affiliate link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy affiliate link.");
    }
  };

  return (
    <Card>
      <div className="space-y-3">
        <Typography variant="h5">Your Affiliate link</Typography>

        <div className="flex items-center gap-2">
          <input type="text" disabled value={affiliateLink} />
          <IconButton onClick={handleCopy} className="rounded-md">
            {copied ? <FaCheck /> : <FaRegCopy />}
          </IconButton>
        </div>

        {affiliateDataLoading ? (
          <div className="h-32 bg-primary-darker space-y-2 rounded-md p-1 lg:p-3">
            <div className="h-5 bg-gray-200 dark:bg-primary-dark animate-pulse rounded-md" />
            <div className="h-5 bg-gray-200 dark:bg-primary-dark animate-pulse rounded-md" />
            <div className="h-5 bg-gray-200 dark:bg-primary-dark animate-pulse rounded-md" />
            <div className="h-5 bg-gray-200 dark:bg-primary-dark animate-pulse rounded-md" />
          </div>
        ) : data?.data ? (
          <div className="px-3 py-2 lg:px-4 lg:py-3 bg-primary-darker rounded-md">
            <Typography variant="body1" color="white">
              {data?.data?.total} user joined by your referral link.
            </Typography>
            <Typography variant="body2" color="white">
              If your referral activates their account, you will get an instant
              ${data?.data?.activation_bonus} bonus in your earning balance.
              <br />
              {data?.data?.program_description}
            </Typography>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
