import Card from "@/components/libs/Card";
import Typography from "@/components/libs/Typography";
import SpinnerWheel from "@/components/play-and-earn/SpinnerWheel";

export default function page() {
  return (
    <Card className="!space-y-4">
      <Typography align="center" variant="h4" color="primary">
        Play And Earn
      </Typography>
      <hr className="w-full" />

      <SpinnerWheel />
    </Card>
  );
}
