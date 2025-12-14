import ReportSkeleton from "@/components/common/ReportSkeleton";
import Card from "@/components/libs/Card";
import Chip from "@/components/libs/Chip";
import IconButton from "@/components/libs/IconButton";
import Typography from "@/components/libs/Typography";
import useJobReview from "@/hooks/dashboardLayout/useJobReview";
import React from "react";
import { FaCheck, FaRocket } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdPauseCircleFilled } from "react-icons/md";
import { TiPin } from "react-icons/ti";
import ReportCard from "../../common/ReportCard";

const JobReportView = () => {
  const { basicJobInfo, isLoading } = useJobReview();
  if (isLoading) return <ReportSkeleton header={true} />;

  const completionRate = basicJobInfo.total_satisfied_count
    ? (
        (basicJobInfo.total_satisfied_count / basicJobInfo.total_submission) *
        100
      ).toFixed(1)
    : 0;

  const rejectionRate = basicJobInfo.total_unsatisfied_count
    ? (
        (basicJobInfo.total_unsatisfied_count / basicJobInfo.total_submission) *
        100
      ).toFixed(1)
    : 0;

  const status = basicJobInfo.job_status;
  return (
    <Card>
      <div>
        <div className="flex items-center gap-2">
          <Typography variant="h4" color="primary">
            {basicJobInfo?.title}
          </Typography>
          {basicJobInfo?.is_pinned && (
            <IconButton className="rounded-md" size="sm">
              <TiPin className="text-xl animate-pulse text-warning" />
            </IconButton>
          )}

          {basicJobInfo?.is_boosted && (
            <IconButton className="rounded-md" size="sm">
              <FaRocket className="text-md animate-pulse text-warning" />
            </IconButton>
          )}
          {basicJobInfo?.is_paused && (
            <IconButton
              title="Paused"
              className="rounded-md"
              size="sm"
              variant="error"
            >
              <MdPauseCircleFilled className="text-xl" />
            </IconButton>
          )}
        </div>
        <Chip
          label={status}
          className="rounded-md"
          color={
            status === "APPROVED"
              ? "success"
              : /EXPIRED|CLOSED/.test(status)
              ? "warning"
              : status === "REJECTED"
              ? "error"
              : "default"
          }
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ReportCard
          title="Total Submissions"
          value={basicJobInfo.total_submission}
          color="info"
        />

        <ReportCard
          title="Satisfied"
          value={basicJobInfo.total_satisfied_count}
          color="success"
        />

        <ReportCard
          title="Unsatisfied"
          value={basicJobInfo.total_unsatisfied_count}
          color="error"
        />

        <ReportCard
          title="Under Review"
          value={basicJobInfo.remaining_review}
          color="warning"
        />
        <ReportCard
          title="Workers Needed"
          value={basicJobInfo.total_worker_required}
          color="primary"
        />

        <ReportCard
          title="Impressions"
          value={basicJobInfo.impression_count}
          color="info"
        />
        <ReportCard
          title="Clicks"
          value={basicJobInfo.click_count}
          color="success"
        />
        <ReportCard
          title="Got Reports"
          value={basicJobInfo.total_report_count}
          color="error"
        />
      </div>

      <div className="space-y-2">
        <Typography
          variant="body2"
          color="success"
          className="flex items-center gap-1"
        >
          <FaCheck /> Completion Rate:{" "}
          <span className="font-semibold">{completionRate}%</span>
        </Typography>
        <Typography
          color="error"
          variant="body2"
          className="flex items-center gap-1"
        >
          <IoClose size={20} /> Rejection Rate:{" "}
          <span className="font-semibold">{rejectionRate}%</span>
        </Typography>
      </div>
    </Card>
  );
};

export default JobReportView;
