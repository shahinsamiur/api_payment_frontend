import DropdownMenus from "@/components/libs/DropdownMenus";
import Typography from "../libs/Typography";

export default function MyWorksFilter({ status, setStatus, disabled }) {
  const filterOptions = [
    { label: "All", value: "" },
    { label: "Under Review", value: "UNDER_REVIEW" },
    { label: "Satisfied", value: "SATISFIED" },
    { label: "Unsatisfied", value: "UNSATISFIED" },
  ];

  return (
    <div className="flex justify-between items-center flex-wrap gap-3">
      <Typography variant="h4" color="primary">
        Your submissions
      </Typography>
      <DropdownMenus
        options={filterOptions}
        selected={status}
        setSelected={setStatus}
        placeholder="Filter"
        disabled={disabled}
        className="grow md:grow-0 min-w-32"
      />
    </div>
  );
}
