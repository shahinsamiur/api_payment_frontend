import Card from "@/components/libs/Card";
import DonutChart from "@/components/libs/DonutChart";
import Ratings from "@/components/libs/Ratings";
import Typography from "@/components/libs/Typography";
import { config } from "@/config";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";

function HeaderParts({ data }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 ">
      <Card className="flex items-center justify-between gap-10 grow rounded-4xl md:rounded-[60px]">
        <div className="flex items-center grow mb-0">
          <DonutChart
            width="78%"
            backgroundColor={["#d1d5dc", "#2ea3b4"]}
            data={[
              data.submission_information.TOTAL_SUBMISSIONS,
              data.submission_information.REQUIRED_JOB_WORKER,
            ]}
            labels={["satisfied", "unsatisfied"]}
            className="size-20 md:size-32"
            renderText={
              <Typography align="center" variant="body2">
                {data.submission_information.TOTAL_SUBMISSIONS}/
                {data.submission_information.REQUIRED_JOB_WORKER}
              </Typography>
            }
          />
          <Typography variant="body2" align="center" className="grow">
            $ {data.pay_per_task}
          </Typography>
        </div>
        <div className="bg-primary-dark rounded-full size-20 md:size-28 flex justify-center items-center">
          <FaCheck className=" text-white size-12 md:size-20" />
        </div>
      </Card>
      <Card className="flex items-center gap-4 grow rounded-4xl md:rounded-[60px]">
        <div className="relative mb-0">
          <Image
            className="size-20 md:size-32 rounded-full object-cover"
            src={
              data?.provider?.profile_image
                ? config.fileBaseUrl + data.provider.profile_image
                : "/default.png"
            }
            alt="profile"
            width={100}
            height={100}
          />
          <div
            className={`${
              data?.provider?.online_status ? "bg-primary-light" : "bg-gray-400"
            } size-4 rounded-2xl absolute top-4 right-2`}
          />
        </div>

        <div>
          <Typography variant="h5">{data.provider.name}</Typography>
          <div className="flex items-center gap-2">
            <Ratings rating={data.provider.user_rating.star_rating} />
            <Typography>({data.provider.user_rating.star_count})</Typography>
          </div>
          <Typography variant="body2">
            Since{" "}
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default HeaderParts;
