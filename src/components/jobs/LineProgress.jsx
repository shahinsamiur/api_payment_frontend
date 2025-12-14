import Typography from "../libs/Typography";

const LineProgress = ({ percentage, title }) => {
  return (
    <div className="grow flex flex-col items-center">
      <Typography align="center" variant="body2">
        {title}
      </Typography>
      <div className="w-full min-md:w-md bg-gray-400 relative h-1.5 rounded overflow-hidden">
        <div
          className="absolute top-0 left-0 bg-success h-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default LineProgress;
