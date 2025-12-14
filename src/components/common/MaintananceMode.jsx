import MaintananceIcon from "../icons/MaintananceIcon";
import Typography from "../libs/Typography";

export default function MaintananceMode({ text }) {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center">
      <MaintananceIcon />
      <Typography>{text}</Typography>
    </div>
  );
}
