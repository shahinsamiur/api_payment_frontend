import { timeCalculator } from "@/services/timeCalculator";
import Link from "next/link";
import Typography from "../libs/Typography";
import LineProgress from "./LineProgress";

export default function JobsItem({ data, onJobClick }) {
  const time = timeCalculator(data.start_date);
  const progress =
    data?.submission_information?.TOTAL_SUBMISSIONS === 0
      ? 0
      : (data?.submission_information?.TOTAL_SUBMISSIONS /
          data?.submission_information?.REQUIRED_JOB_WORKER) *
        100;

  const containerClass =
    "flex items-center justify-between gap-1 md:gap-3 border lg:border-2 border-border/70 hover:border-border rounded-xl px-3 md:px-5 py-3 dark:bg-transparent hover:bg-border/30 cursor-pointer hover:translate-x-2 transition-all duration-300";

  return (
    <Link
      href={`/jobs/${data.slug}`}
      key={data.id}
      className={containerClass}
      onClick={onJobClick}
    >
      <div className="grow">
        <Typography variant="h5" className="line-clamp-2 min-w-0">
          {data.title}
        </Typography>
        <div className="flex justify-end">
          <Typography className="font-medium">{data.pay_per_task}$</Typography>
        </div>
        <div className="flex justify-between items-end gap-3 md:gap-4 flex-wrap">
          <LineProgress
            percentage={progress}
            title={`${data.submission_information?.TOTAL_SUBMISSIONS} OF ${data.submission_information?.REQUIRED_JOB_WORKER}`}
          />
          <Typography variant="caption">{time}</Typography>
        </div>
      </div>
    </Link>
  );
}
