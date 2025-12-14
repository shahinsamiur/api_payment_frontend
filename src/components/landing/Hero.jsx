import JobPostedIcon from "@/components/icons/JobPostedIcon";
import PaidIcon from "@/components/icons/PaidIcon";
import TaskDoneIcon from "@/components/icons/TaskDoneIcon";
import TotalUsersIcon from "@/components/icons/TotalUsersIcon";
import Animation from "../libs/Animation";
import HeroCard from "./HeroCard";
import HeroSliders from "./HeroSlider";

export default function Hero({ data }) {
  const heroData = [
    {
      number: data.jobs_count,
      title: "Jobs Posted",
      Icon: JobPostedIcon,
    },
    {
      number: data.user_count,
      title: "Total User",
      Icon: TotalUsersIcon,
    },
    {
      number: data.task_count,
      title: "Task Done",
      Icon: TaskDoneIcon,
    },
    {
      number: data.total_payment,
      title: "Paid",
      Icon: PaidIcon,
    },
  ];
  return (
    <div
      data-testid="home-page-hero-section"
      className="flex flex-col justify-center items-center pb-28"
    >
      <HeroSliders />

      {/* hero  card section  */}
      <div className="flex gap-5 justify-center items-center flex-wrap -mt-14 md:-mt-20 container mx-auto px-3 md:px-5 ">
        {heroData.map((item, index) => (
          <Animation
            inViewClass="opacity-100 translate-y-0"
            outViewClass="opacity-0 -translate-y-10"
            animationDelay={index + 1}
            key={index}
            className="w-full min-w-xs md:w-auto"
          >
            <HeroCard item={item} />
          </Animation>
        ))}
      </div>
    </div>
  );
}
