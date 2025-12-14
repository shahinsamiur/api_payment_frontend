import React from "react";
import { MdClose } from "react-icons/md";

const Chip = (props: ChipProps) => {
  const {
    label,
    variant = "default",
    color = "default",
    onDelete,
    icon,
    className = "",
  } = props;

  const colorVariants: Record<ChipColor, string> = {
    default: "bg-border dark:bg-border/80 dark:text-white",
    primary: "bg-primary-main text-white",
    success: "bg-success text-white",
    error: "bg-error text-white",
    warning: "bg-yellow-100 text-yellow-700",
  };

  const variantClass: Record<ChipVariant, string> = {
    default: "border border-border text-gray-800",
    primary: "border border-primary-main text-blue-600",
    success: "border border-primary-dark text-white",
    error: "border border-error text-red-600",
    warning: "border border-warning",
  };

  const baseClass =
    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium";

  return (
    <div
      className={`${baseClass} ${variantClass[variant]} ${colorVariants[color]} ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{label}</span>
      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-1 hover:bg-black/10 rounded-full p-0.5"
        >
          <MdClose size={14} />
        </button>
      )}
    </div>
  );
};

export default Chip;
