import Chip from "@/components/libs/Chip";
import Typography from "../libs/Typography";

export default function TransactionItem({ transaction }) {
  return (
    <div className="flex justify-between items-center border-b border-b-border py-2 group">
      <div className="dark:text-white border-l-2 border-l-warning pl-5 group-hover:border-l-success transition-all duration-300">
        <div className="flex items-center gap-3">
          <Typography variant="body2" className="font-medium">
            Payment Method:
          </Typography>
          <Typography variant="body2" className="capitalize">
            {transaction.payment_system.replace("_", " ")}
          </Typography>
        </div>
        <div className="flex items-center gap-3">
          <Typography variant="body2" className="font-medium">
            Transaction ID:
          </Typography>
          <Typography variant="body2">{transaction.transaction_id}</Typography>
        </div>
        <Chip
          label={transaction.status}
          color={
            /accepted|success/i.test(transaction.status)
              ? "success"
              : /pending/i.test(transaction.status)
              ? "warning"
              : "default"
          }
        />
      </div>

      <div className="dark:text-white">
        <Typography variant="body2">
          {transaction.amount} {transaction.currency}
        </Typography>
        <Typography variant="caption" className="font-medium">
          {new Date(transaction.created_at).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </Typography>
      </div>
    </div>
  );
}
