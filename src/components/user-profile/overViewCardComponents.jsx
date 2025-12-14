import Typography from "../libs/Typography";

export default function overViewCardComponents({ title, value }) {
  const wrapperClass =
    "border flex justify-between px-3 py-2 rounded-md bg-border/30 border-border hover:translate-x-2 hover:bg-border/80 transition-all duration-300";

  return (
    <div className={wrapperClass}>
      <Typography>{title}</Typography>
      <Typography>
        {/Total Earn|Total Deposit|Paid/.test(title) ? "$" : null} {value}
      </Typography>
    </div>
  );
}
