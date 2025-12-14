import Card from "@/components/libs/Card";
import Chip from "@/components/libs/Chip";
import Typography from "@/components/libs/Typography";
import { config } from "@/config";
import Image from "next/image";
import { FaClock, FaDollarSign, FaUser } from "react-icons/fa";
import { TbDeviceWatchQuestion } from "react-icons/tb";
import InfoCard from "./InfoCard";

const JobHeader = ({ data, isProvider }) => {
  return (
    <Card>
      <div>
        <Typography variant="h4">{data.title}</Typography>
        <Typography variant="caption" className="font-medium">
          Job Code: {data.job_code}
        </Typography>
        <Chip
          className="rounded-md"
          label={data.status}
          color={
            data.status === "APPROVED"
              ? "success"
              : data.status === "EXPIRED"
              ? "warning"
              : data.status === "REJECTED"
              ? "error"
              : "default"
          }
        />
      </div>

      {/* Thumbnail Image */}
      <div className="my-6 flex justify-center">
        <Image
          src={config.fileBaseUrl + data.thumbnail_url}
          alt={data.title}
          height={500}
          width={600}
          className="rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <InfoCard
          icon={FaDollarSign}
          label={isProvider ? "Total Budget" : "Budget"}
          value={
            isProvider
              ? data.pay_per_task * data.total_workers_required
              : data.pay_per_task
          }
          color="info"
        />
        <InfoCard
          icon={FaUser}
          label="Workers"
          value={`${data.submission_information.APPROVED}/${data.submission_information.REQUIRED_JOB_WORKER}`}
          color="primary-main"
        />
        <InfoCard
          icon={TbDeviceWatchQuestion}
          label="Under Review"
          value={data.submission_information.UNDER_REVIEW}
          color="warning"
        />
        <InfoCard
          icon={FaClock}
          label="Duration"
          value={`${data.estimated_day} days`}
          color="info"
        />
      </div>
    </Card>
  );
};

export default JobHeader;
