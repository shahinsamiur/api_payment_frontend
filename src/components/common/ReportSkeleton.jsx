import React from "react";
import Card from "../libs/Card";

const ReportSkeleton = ({ header }) => {
  return (
    <Card>
      {header ? (
        <div className="space-y-2">
          <div className="bg-border rounded-md h-5 animate-pulse w-2/4" />
          <div className="bg-border rounded-md h-5 animate-pulse w-1/4" />
        </div>
      ) : (
        <div className="bg-border rounded-md h-10 animate-pulse" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-border rounded-md h-20 animate-pulse"
          />
        ))}
      </div>
      <div className="space-y-2">
        <div className="bg-border rounded-md h-5 animate-pulse w-2/4" />
        <div className="bg-border rounded-md h-5 animate-pulse w-2/4" />
      </div>
    </Card>
  );
};

export default ReportSkeleton;
