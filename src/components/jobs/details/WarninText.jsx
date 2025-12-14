import IconButton from "@/components/libs/IconButton";
import Typography from "@/components/libs/Typography";
import React from "react";
import { IoAlert } from "react-icons/io5";

const WarninText = () => {
  return (
    <div className="bg-white dark:bg-transparent border border-warning rounded-lg p-5 my-4 lg:my-8 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-2">
        <IconButton size="sm" className="rounded-md bg-warning">
          <IoAlert size={20} />
        </IconButton>
        <Typography color="warning" variant="body2" className="font-semibold">
          Platform Guidelines
        </Typography>
      </div>
      <Typography variant="body2">
        Work Dear maintains a{" "}
        <span className="text-warning font-medium">
          responsible platform policy
        </span>
        . Gambling, betting, and wagering activities are strictly prohibited.
        Please ensure all tasks comply with our community guidelines and legal
        requirements.
      </Typography>
    </div>
  );
};

export default WarninText;
