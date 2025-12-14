"use client";

import Card from "@/components/libs/Card";
import Typography from "@/components/libs/Typography";
import { config } from "@/config";
import { getRemainingDays } from "@/services/timeCalculator";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import { MdInsights, MdWork } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { WiTime3 } from "react-icons/wi";
import { useSelector } from "react-redux";
import JobReport from "./JobReport";

function WorkDetails({ data }) {
  const { user } = useSelector((state) => state.user);
  const [copied, setCopied] = useState(false);

  function handleCopy(value) {
    navigator.clipboard.writeText(value);
    setCopied(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Card>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Typography variant="h4">{data.title}</Typography>
          <div className="flex items-center gap-1 dark:text-white">
            <FaCalendar className="text-primary-dark dark:text-white" />
            <Typography>
              {new Date(data.start_date).toLocaleDateString("en-GB")}
            </Typography>
          </div>
        </div>
        <Typography variant="body2">{data.description}</Typography>
        <div className="max-w-xl mx-auto">
          <Image
            height={400}
            width={500}
            unoptimized
            alt="thumbnail image"
            className="w-full object-cover rounded-xl border border-border"
            src={config.fileBaseUrl + data.thumbnail_url}
          />
          <div className="flex items-center max-sm:flex-wrap-reverse flex-wrap gap-1 justify-between mt-2">
            <Typography variant="body2" className="flex items-center gap-1">
              <MdWork className="text-primary-dark text-lg" /> {data.job_code}
            </Typography>
            <Typography variant="body2" className="flex items-center gap-1">
              <MdInsights className="text-primary-dark text-lg" />
              {data?.job_sub_category?.parent_category?.category_name} -{" "}
              {data.job_sub_category.sub_category_name}
            </Typography>
            <Typography variant="body2" className="flex items-center gap-1">
              <TbWorld className="text-primary-dark text-lg" /> International
            </Typography>
            <Typography variant="body2" className="flex items-center gap-1">
              <WiTime3 className="text-amber-500 text-lg" /> Time{" "}
              {getRemainingDays(data.end_date)} Left
            </Typography>
          </div>
        </div>
        <div className="mt-3">
          <Typography variant="h5">Instructions:</Typography>
          {JSON.parse(data.steps).map((data, index) => (
            <div
              key={index}
              className="flex items-start gap-1 break-words whitespace-pre-wrap mt-2"
            >
              <Typography variant="body2">{`${data.step_number}. `}</Typography>
              {/^https?:\/\//.test(data.instruction) ? (
                <div className="relative flex items-center gap-2">
                  <Link
                    href={data.instruction}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline break-words"
                  >
                    Open Link
                  </Link>
                  <button onClick={() => handleCopy(data.instruction)}>
                    {copied ? <FaCheck /> : <FaRegCopy />}
                  </button>
                </div>
              ) : (
                <Typography variant="body2">{data.instruction}</Typography>
              )}
            </div>
          ))}
          {user?.id !== data?.provider?.id &&
            user?.verificationStatus === "VERIFIED" && (
              <JobReport id={data?.id} />
            )}

          <div>
            {data?.required_proofs && (
              <Typography variant="h5">Reqiured proofs:</Typography>
            )}
            {data.required_proofs &&
              JSON.parse(data.required_proofs || "[]").map((data, index) => (
                <Typography key={index} className="flex items-start gap-1 mt-1">
                  <span className="capitalize">{data.type}:</span>
                  <span>{data.description}</span>
                </Typography>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default WorkDetails;
