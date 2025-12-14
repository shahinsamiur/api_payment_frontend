import React from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Markque from "../common/Markque";
import ReportCard from "../common/ReportCard";
import ReportSkeleton from "../common/ReportSkeleton";
import Card from "../libs/Card";
import Typography from "../libs/Typography";

const MyjobReportView = ({ reports, isLoading }) => {
  if (isLoading) return <ReportSkeleton />;

  const completionRate = reports.total_satisfied_count
    ? (
        (reports.total_satisfied_count / reports.got_total_submission) *
        100
      ).toFixed(1)
    : 0;

  const rejectionRate = reports.total_unsatisfied_count
    ? (
        (reports.total_unsatisfied_count / reports.got_total_submission) *
        100
      ).toFixed(1)
    : 0;

  return (
    <Card>
      <Markque />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ReportCard title="Total Jobs" value={reports.total_job} color="info" />
        <ReportCard
          title="Active Jobs"
          value={reports.active_jobs}
          color="success"
        />
        <ReportCard
          title="Paused Jobs"
          value={reports.inactive_jobs}
          color="warning"
        />
        <ReportCard
          title="Pending Jobs"
          value={reports.pending_jobs}
          color="info"
        />
        <ReportCard
          title="Expired Jobs"
          value={reports.expired_jobs}
          color="error"
        />
        <ReportCard
          title="Job Cost"
          startIcon={"$"}
          value={reports.total_spent}
          color="primary"
        />
        <ReportCard
          title="Promotional Cost"
          startIcon={"$"}
          value={reports.total_promotion_cost}
          color="info"
        />
        <ReportCard
          title="Got reports"
          value={reports.got_reports}
          color="warning"
        />
        <ReportCard
          title="Total Expected Worker"
          value={reports.total_expected_worker}
          color="info"
        />
        <ReportCard
          title="Total Applied Worker"
          value={reports.got_total_submission}
          color="primary"
        />
        <ReportCard
          title="Total Satisfied Worker"
          value={reports.total_satisfied_count}
          color="success"
        />
        <ReportCard
          title="Total Unsatisfied Worker"
          value={reports.total_unsatisfied_count}
          color="error"
        />
      </div>

      <div className="space-y-2">
        <Typography
          variant="body2"
          color="success"
          className="flex items-center gap-1"
        >
          <FaCheck /> Satisfied Rate:{" "}
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

export default MyjobReportView;
