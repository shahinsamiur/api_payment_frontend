"use client";
import HeroCard from "@/components/landing/HeroCard";
import { useSelector } from "react-redux";
import JobPostedIcon from "../icons/JobPostedIcon";
import PaidIcon from "../icons/PaidIcon";
import TaskDoneIcon from "../icons/TaskDoneIcon";
import TotalUsersIcon from "../icons/TotalUsersIcon";

const Statistic = () => {
  const { generalData: data } = useSelector((state) => state.settings);

  const heroData = [
    {
      number: data.jobs_count ?? 0,
      title: "Jobs Posted",
      Icon: JobPostedIcon,
    },
    {
      number: data.user_count ?? 0,
      title: "Total User",
      Icon: TotalUsersIcon,
    },
    {
      number: data.task_count ?? 0,
      title: "Task Done",
      Icon: TaskDoneIcon,
    },
    {
      number: data.total_payment ?? 0,
      title: "Paid",
      Icon: PaidIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 -mt-24 col-span-2">
      {heroData.map((item, index) => (
        <HeroCard key={index} item={item} />
      ))}
    </div>
  );
};

export default Statistic;
