import Typography from "@/components/libs/Typography";
import React from "react";

const ReportCard = ({
  title,
  value,
  color,
  JSX = null,
  startIcon = null,
}: ReportCardProps) => {
  const colorVariants = {
    primary: "bg-primary-main/10",
    success: "bg-success/10",
    warning: "bg-warning/10",
    error: "bg-error/10",
    info: "bg-info/10",
  };

  const textColor = color.split("-")[0] as TypographyColor;

  return (
    <div className={`${colorVariants[color]} p-4 rounded-lg`}>
      <Typography color={textColor} variant="body2" className="font-semibold">
        {title}
      </Typography>
      <Typography color={textColor} className="font-bold">
        {startIcon} {Number(value).toLocaleString()} {JSX}
      </Typography>
    </div>
  );
};

export default ReportCard;
