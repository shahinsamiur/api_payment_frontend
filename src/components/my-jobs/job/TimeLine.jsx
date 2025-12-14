import Card from "@/components/libs/Card";
import Typography from "@/components/libs/Typography";
import React from "react";
import {
  FaCheckCircle,
  FaFlagCheckered,
  FaPaperPlane,
  FaRocket,
} from "react-icons/fa";

const TimeLine = ({ submitted_at, reviewed_at, start_date, end_date }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <Typography variant="h4" className="mb-4">
        Timeline
      </Typography>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <FaPaperPlane className="text-gray-400 mt-0.5" size={18} />
          <div>
            <Typography variant="body2" className="font-medium">
              Submitted
            </Typography>
            <Typography variant="caption">
              {formatDate(submitted_at)}
            </Typography>
          </div>
        </div>

        {reviewed_at && (
          <div className="flex items-start gap-3">
            <FaCheckCircle className="text-gray-400 mt-0.5" size={18} />
            <div>
              <Typography variant="body2" className="font-medium">
                Reviewed
              </Typography>
              <Typography variant="caption">
                {formatDate(reviewed_at)}
              </Typography>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <FaRocket className="text-gray-400 mt-0.5" size={18} />
          <div>
            <Typography variant="body2" className="font-medium">
              Job Start
            </Typography>
            <Typography variant="caption">{formatDate(start_date)}</Typography>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaFlagCheckered className="text-gray-400 mt-0.5" size={18} />
          <div>
            <Typography variant="body2" className="font-medium">
              Job End
            </Typography>
            <Typography variant="caption">{formatDate(end_date)}</Typography>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TimeLine;
