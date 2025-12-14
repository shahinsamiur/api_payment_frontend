import React from "react";
import { FaSmile } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Markque from "../common/Markque";
import ReportCard from "../common/ReportCard";
import ReportSkeleton from "../common/ReportSkeleton";
import Card from "../libs/Card";
import Typography from "../libs/Typography";

const MyWorkReportView = ({ data, isLoading }) => {
  if (isLoading) return <ReportSkeleton />;

  const totalReview =
    data.total_review > 0
      ? ((data.star_count / data.total_review) * 5).toFixed(1)
      : 0;
  const ReviewText = () => (
    <span className="text-sm">
      ({data.total_review} {data.total_review > 1 ? "reviews" : "review"})
    </span>
  );

  const completionRate = data.total_satisfied_task
    ? ((data.total_satisfied_task / data.total_task) * 100).toFixed(1)
    : 0;

  const rejectionRate = data.total_unsatisfied_task
    ? ((data.total_unsatisfied_task / data.total_task) * 100).toFixed(1)
    : 0;

  return (
    <Card>
      <Markque />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ReportCard title="Total Task" value={data.total_task} color="info" />
        <ReportCard
          title="Total Earn"
          startIcon="$"
          value={data.total_earn}
          color="primary"
        />
        <ReportCard
          title="Satisfied"
          value={data.total_satisfied_task}
          color="success"
        />
        <ReportCard
          title="Unsatisfied"
          value={data.total_unsatisfied_task}
          color="error"
        />

        <ReportCard
          title="Under Review"
          value={data.under_review_task}
          color="warning"
        />

        <ReportCard
          title="Overall Review"
          value={totalReview}
          JSX={<ReviewText />}
          color="primary"
        />
      </div>

      {/* Completion & Rejection Rate */}
      <div className="space-y-2 mt-4">
        <Typography
          variant="body2"
          color="success"
          className="flex items-center gap-1"
        >
          <FaSmile /> Completion Rate:{" "}
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

export default MyWorkReportView;
