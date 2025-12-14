import Card from "@/components/libs/Card";
import Typography from "../libs/Typography";

function formatNumber(number) {
  return Number(number).toLocaleString("en-BN");
}

const HeroCard = ({ item }) => {
  return (
    <Card className="hover:-translate-y-1 transition-all duration-300 cursor-pointer z-30 w-full md:grow">
      <div className="flex flex-col items-center">
        <item.Icon className="size-18 text-primary-dark dark:text-white" />

        <Typography variant="h5" className="mt-2">
          {formatNumber(item.number)}
        </Typography>
        <Typography variant="h5">{item.title}</Typography>
      </div>
    </Card>
  );
};

export default HeroCard;
