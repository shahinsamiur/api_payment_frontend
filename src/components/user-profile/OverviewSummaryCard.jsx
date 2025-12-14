"use client";
import Card from "@/components/libs/Card";
import Ratings from "@/components/libs/Ratings";
import Typography from "../libs/Typography";
import OverViewCardComponents from "./overViewCardComponents";

export default function OverviewSummaryCard({ title, overviewData, rating }) {
  return (
    <Card>
      <div className="space-y-2">
        <Typography align="center" className="font-medium">
          Overview
        </Typography>
        <Typography variant="h5" align="center">
          {title}
        </Typography>
      </div>

      <div className="flex flex-col gap-2">
        {overviewData.map((data, index) => (
          <OverViewCardComponents
            title={data.title}
            value={data.value}
            key={index}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center items-center">
        <Ratings rating={rating} />
        <Typography variant="body2" className="font-medium">
          {rating >= 4 ? (
            <span>Excellent</span>
          ) : rating <= 3 && rating > 1 ? (
            <span>Good</span>
          ) : (
            <span>Not Rated yet</span>
          )}
        </Typography>
      </div>
    </Card>
  );
}
