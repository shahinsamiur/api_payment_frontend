import Card from "@/components/libs/Card";
import Typography from "@/components/libs/Typography";
import React from "react";
import { FaRocket } from "react-icons/fa";
import { TiPin } from "react-icons/ti";

const JobStatus = ({ job }) => {
  return (
    <Card>
      <Typography variant="h4" className="mb-4">
        Job Status
      </Typography>
      <div className="space-y-3 font-medium divide-y divide-border">
        <div className="flex justify-between items-center">
          <Typography variant="caption">Screenshots Required</Typography>
          <Typography variant="caption">
            {parseInt(job.require_screenshots) > 1 ? "Yes" : "No"}
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          <Typography variant="caption">Paused</Typography>
          <Typography variant="caption">
            {job.pause === "0" ? "No" : "Yes"}
          </Typography>
        </div>

        <div className="flex justify-between items-center">
          <Typography variant="caption" className="flex items-center gap-1">
            Boosted <FaRocket />
          </Typography>
          <Typography variant="caption">
            {job.is_boosted ? "Yes" : "No"}
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          <Typography variant="caption" className="flex items-center gap-1">
            Pinned
            <TiPin />
          </Typography>
          <Typography variant="caption">
            {job.is_pinned ? "Yes" : "No"}
          </Typography>
        </div>

        <div className="flex justify-between items-start">
          <Typography variant="caption">Available Countries</Typography>
          <div className="flex gap-1 flex-wrap">
            {job?.countries?.map((country, i) => (
              <Typography
                variant="caption"
                key={i}
                className="px-2 py-1 bg-border rounded"
              >
                {country.short_name}
              </Typography>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobStatus;
