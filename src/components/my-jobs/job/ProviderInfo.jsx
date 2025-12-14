import Card from "@/components/libs/Card";
import Typography from "@/components/libs/Typography";
import { config } from "@/config";
import Image from "next/image";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import InfoCard from "./InfoCard";

const ProviderInfo = ({ provider }) => {
  const profile_image = provider?.profile_image
    ? config.fileBaseUrl + provider.profile_image
    : "/default.png";

  return (
    <Card>
      <Typography variant="h4" className="mb-4">
        Provider Information
      </Typography>
      <div className="flex items-center gap-4 mb-4">
        <Image
          width={64}
          height={64}
          src={profile_image}
          alt={provider.name}
          className="size-16 rounded-full border-4 border-primary-main"
        />
        <div>
          <Typography variant="h6">{provider.name}</Typography>
          <Typography variant="caption">@{provider.username}</Typography>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <InfoCard
          icon={FaStar}
          label="Rating"
          value={provider.user_rating.star_rating}
          color="warning"
        />
        <InfoCard
          icon={FaCheckCircle}
          label="Satisfied"
          value={`${provider.user_rating.satisfied_percentage}%`}
          color="success"
        />
        <InfoCard
          icon={MdWorkHistory}
          label="Jobs"
          value={provider.user_rating.job_posted_count}
          color="info"
        />
      </div>
    </Card>
  );
};
export default ProviderInfo;
