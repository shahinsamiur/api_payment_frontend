"use client";
import Card from "@/components/libs/Card";
import DonutChart from "@/components/libs/DonutChart";
import Typography from "../libs/Typography";

export default function OverviewChartCard({
  title,
  satisfiedPercentage,
  unsatisfiedPercentage,
  pendingPercentage,
  backgroundColor,
}) {
  const no_status =
    !satisfiedPercentage && !unsatisfiedPercentage && !pendingPercentage
      ? 100
      : 0;

  const Level = ({ title, iconColor }) => (
    <Typography
      variant="body2"
      className="flex gap-1 justify-center items-center"
    >
      <span className={`size-3 md:size-4 rounded-full bg-${iconColor}`} />
      {title}
    </Typography>
  );

  return (
    <Card>
      <div className="space-y-2">
        <Typography variant="h5" align="center">
          {title}
        </Typography>
        <div className="flex justify-center items-center flex-wrap gap-2 lg:gap-5 md:gap-2">
          <Level title="Satisfied" iconColor="success" />
          <Level title="Unsatisfied" iconColor="error" />
          <Level title="Pending" iconColor="gray-300" />
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <DonutChart
          renderText={
            <Typography variant="body2" className="!text-nowrap">
              Satisfied:{" "}
              <span className="text-success">{satisfiedPercentage}%</span>
              <br />
              Unsatisfied:{" "}
              <span className="text-error !text-nowrap ">
                {unsatisfiedPercentage}
              </span>
              <br />
              Pending: <span className="">{pendingPercentage}%</span>
            </Typography>
          }
          data={[
            satisfiedPercentage,
            unsatisfiedPercentage,
            pendingPercentage,
            no_status,
          ]}
          backgroundColor={backgroundColor}
          width="80%"
          className="size-[13rem] lg:size-[17rem]"
        />
      </div>
    </Card>
  );
}
