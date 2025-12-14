import React from "react";
import Markque from "../common/Markque";
import ReportCard from "../common/ReportCard";
import Card from "../libs/Card";
import Typography from "../libs/Typography";

const AdvertisementReports = ({ report, isLoading }) => {
  if (isLoading) return null;
  return (
    <Card>
      <Markque />

      <Typography variant="h4" color="primary">
        Advertisement Report
      </Typography>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ReportCard title="Total Ads" value={report.total_ads} color="info" />
        <ReportCard
          title="Active Ads"
          value={report.active_ads}
          color="success"
        />
        <ReportCard
          title="Inactive Ads"
          value={report.inactive_ads}
          color="warning"
        />
        <ReportCard
          title="Pending Ads"
          value={report.pending_ads}
          color="warning"
        />
        <ReportCard
          title="Expired Ads"
          value={report.expired_ads}
          color="error"
        />
        <ReportCard
          title="Total Click"
          value={report.total_click}
          color="info"
        />
        <ReportCard
          title="Total Cost"
          value={report.total_cost}
          startIcon="$"
          color="info"
        />
      </div>
    </Card>
  );
};

export default AdvertisementReports;
