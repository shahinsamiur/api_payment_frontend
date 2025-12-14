import { useSelector } from "react-redux";
import OverviewChartCard from "./OverviewChartCard";
import OverviewSummaryCard from "./OverviewSummaryCard";

export default function ProfileOverview() {
  const { user } = useSelector((state) => state.user);

  const TotalWorkingOverview = [
    {
      title: "Task Attend",
      value: user?.user_rating?.total_submissions,
    },
    {
      title: "Satisfied",
      value: user?.user_rating?.satisfied_count,
    },
    {
      title: "Not Satisfied",
      value: user?.user_rating?.unsatisfied_count,
    },
    {
      title: "Pending",
      value: user?.user_rating?.pending,
    },
    {
      title: "Total Earn",
      value: user?.user_transaction_record?.job_earn || "_",
    },
  ];
  const TotalJobOverview = [
    {
      title: "Valid Job Posted",
      value: user?.user_rating?.job_posted_count,
    },
    {
      title: "Total Deposit",
      value: user?.user_transaction_record?.deposit || "_",
    },
    {
      title: "Paid",
      value: user?.user_transaction_record?.job_paid || "_",
    },
  ];

  const rating = parseInt(user?.user_rating?.star_count || 0);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="space-y-4 grow">
        <OverviewChartCard
          title="Working Status"
          satisfiedPercentage={user?.user_rating?.satisfied_percentage}
          unsatisfiedPercentage={user?.user_rating?.unsatisfied_percentage}
          pendingPercentage={user?.user_rating?.pending_percentage}
          backgroundColor={["#02ad4f", "#f12c36", "#d1d5dc"]}
        />

        <OverviewSummaryCard
          title="Total Working"
          overviewData={TotalWorkingOverview}
          rating={rating}
        />
      </div>

      <div className="space-y-4 grow">
        <OverviewChartCard
          title="Job Status"
          satisfiedPercentage={user?.user_rating?.satisfied_percentage}
          unsatisfiedPercentage={user?.user_rating?.unsatisfied_percentage}
          pendingPercentage={user?.user_rating?.pending_percentage}
          backgroundColor={["#02ad4f", "#f44336", "#d1d5dc"]}
        />

        <OverviewSummaryCard
          title="Job Status"
          overviewData={TotalJobOverview}
          rating={rating}
        />
      </div>
    </div>
  );
}
