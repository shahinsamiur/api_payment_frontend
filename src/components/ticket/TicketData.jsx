import PreviousDayWinner from "@/components/ticket/PreviousDayWinner";
import RecentTicketBuyer from "@/components/ticket/RecentTicketBuyer";
import TicketBalance from "@/components/ticket/TicketBalance";
import TimeCountdown from "@/components/ticket/TimeCountdown";
import TopTicketBuyer from "@/components/ticket/TopTicketBuyer";

const TicketData = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-between items-start gap-6 mt-5">
      <div className="space-y-5 grow">
        <TicketBalance
          data={data?.user_data}
          unitPrice={data.per_ticket_price}
        />

        <TimeCountdown date={data.draw_date} />
      </div>

      <div className="space-y-5 grow">
        <PreviousDayWinner data={data?.previous_days_winners} />
        <TopTicketBuyer data={data?.top_ticket_buyers} />
        <RecentTicketBuyer data={data.recent_buyers} />
      </div>
    </div>
  );
};

export default TicketData;
