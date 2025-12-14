import LoadingIndicator from "@/components/common/LoadingIndicator";
import Typography from "../libs/Typography";
import TransactionItem from "./TransactionItem";

export default function TransactionList({ data, isLoading }) {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!data?.data?.length) {
    return (
      <Typography variant="body2" align="center">
        No data found
      </Typography>
    );
  }

  return (
    <div>
      {data?.data?.map((transaction, index) => (
        <TransactionItem key={index} transaction={transaction} />
      ))}
    </div>
  );
}
