import Card from "@/components/libs/Card";
import Typography from "@/components/libs/Typography";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import InfoCard from "./InfoCard";

const JobPerformance = ({ impressions = 0, clicks = 0 }) => {
  return (
    <Card>
      <Typography variant="h4" className="mb-4">
        Job Performance Statistics
      </Typography>

      <div className="flex items-center gap-3 flex-wrap">
        <InfoCard
          icon={FaUsers}
          label="Impressions"
          value={Number(impressions).toLocaleString()}
          color="info"
          className="grow"
        />
        <InfoCard
          icon={GiClick}
          label="Clicks"
          value={Number(clicks).toLocaleString()}
          color="primary-main"
          className="grow"
        />
      </div>
    </Card>
  );
};

export default JobPerformance;
