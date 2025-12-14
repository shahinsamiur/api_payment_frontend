import { useSelector } from "react-redux";
import Typography from "../libs/Typography";

function Markque() {
  const { generalData } = useSelector((state) => state.settings);
  const announcement = generalData?.announcement ?? [];

  return (
    <marquee className="bg-border dark:text-white rounded-full py-2">
      <Typography variant="body2">
        {announcement.length ? announcement.join(" || ") : "No Announcement"}
      </Typography>
    </marquee>
  );
}

export default Markque;
