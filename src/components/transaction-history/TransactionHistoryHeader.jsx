import DropdownMenus from "@/components/libs/DropdownMenus";
import Typography from "../libs/Typography";

export default function TransactionHistoryHeader({ status, setStatus, title }) {
  const statusOptions = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Success", value: "success" },
    { label: "Failed", value: "failed" },
    { label: "Rejected", value: "rejected" },
    { label: "Accepted", value: "accepted" },
    { label: "Completed", value: "completed" },
    { label: "Hold", value: "hold" },
    { label: "Refund", value: "refund" },
  ];

  return (
    <div className="flex justify-between items-center border-b border-b-border pb-2">
      <Typography variant="h4" color="primary">
        {title}
      </Typography>
      <DropdownMenus
        options={statusOptions}
        selected={status}
        setSelected={setStatus}
        placeholder="Select status"
      />
    </div>
  );
}
