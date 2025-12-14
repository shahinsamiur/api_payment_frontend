import { selectOptions } from "@/_mock/selectOptions";
import DropdownMenus from "../libs/DropdownMenus";
import Typography from "../libs/Typography";

const JobFilter = ({ status, setStatus }) => {
  return (
    <div className="flex justify-between flex-wrap gap-4 items-center">
      <Typography variant="h4" color="primary">
        Your job posts
      </Typography>
      <DropdownMenus
        selected={status}
        setSelected={setStatus}
        placeholder="All"
        options={selectOptions.job.status_type}
        className="grow md:grow-0 min-w-36"
      />
    </div>
  );
};

export default JobFilter;
