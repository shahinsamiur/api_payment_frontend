import { selectOptions } from "@/_mock/selectOptions";
import DropdownMenus from "@/components/libs/DropdownMenus";
import Typography from "../libs/Typography";

export default function AdvertisementFilter({ status, setStatus }) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-3">
      <Typography variant="h4" color="primary">
        Advertisements
      </Typography>
      <DropdownMenus
        selected={status}
        setSelected={setStatus}
        placeholder="All"
        options={selectOptions.ads.status_type}
        className="grow md:grow-0 min-w-32"
      />
    </div>
  );
}
