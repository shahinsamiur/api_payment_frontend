import Card from "@/components/libs/Card";
import clsx from "clsx";
import { FaCheck } from "react-icons/fa6";
import Typography from "../libs/Typography";

const PackageCard = ({ data, children, className }) => {
  return (
    <Card
      className={clsx(
        "relative hover:-translate-y-2 transition-all duration-300 overflow-hidden",
        { "border border-primary-dark/70 shadow-warning/20": data.highlighted },
        { shadow: !data.highlighted },
        className
      )}
    >
      {data.highlighted && (
        <div className="absolute top-10 -right-10 rotate-[45deg] bg-primary-dark text-white text-xs font-bold px-12 py-1 shadow-md z-10">
          Most Popular
        </div>
      )}

      <div>
        <Typography variant="h4" align="center">
          {data.name}
        </Typography>
        <Typography
          variant="h3"
          align="center"
          color="primary"
          className="py-2"
        >
          ${data.price}
        </Typography>
        <Typography align="center" variant="caption" className="font-medium">
          {data.duration} {data.duration == "1" ? "Month" : "Months"} Access
        </Typography>
      </div>

      <div className="flex flex-col items-center">
        <div className="space-y-1">
          {data.feature.map((feature, index) => (
            <div key={index} className="flex justify-start items-center gap-2">
              <div className="size-5 flex items-center justify-center bg-primary-darker rounded-full">
                <FaCheck className="text-white" size={12} />
              </div>
              <Typography variant="body2">{feature}</Typography>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Typography variant="caption" align="center">
          {data.description}
        </Typography>
        <div className="flex justify-center">{children}</div>
      </div>
    </Card>
  );
};

export default PackageCard;
