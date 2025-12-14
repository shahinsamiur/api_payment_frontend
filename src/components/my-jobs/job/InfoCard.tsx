import Typography from "@/components/libs/Typography";
import React from "react";

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  className?: string;
}

const InfoCard = (props: InfoCardProps) => {
  const { icon: Icon, label, value, color = "", className } = props;

  const bgColor = `bg-${color}/10`;
  const iconColor = `text-${color}`;
  const textColor = color.split("-")[0] as TypographyColor;

  const wrapperClass = `flex items-center gap-3 ${bgColor} px-3 py-2 rounded-md ${className}`;
  const iconWrapperClass = `size-10 rounded-lg flex items-center justify-center ${bgColor}`;

  return (
    <div className={wrapperClass}>
      <div className={iconWrapperClass}>
        <Icon className={iconColor} size={20} />
      </div>
      <div>
        <Typography variant="body2" color={textColor} className="font-medium">
          {label}
        </Typography>
        <Typography variant="body2">{value}</Typography>
      </div>
    </div>
  );
};

export default InfoCard;
