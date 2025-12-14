"use client";

import clsx from "clsx";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Button = (props: ButtonProps) => {
  const {
    variant = "contain",
    size = "md",
    borderTop = true,
    borderBottom = true,
    loading = false,
    disabled = false,
    children,
    className,
    ...buttonProps
  } = props;
  const isDisabled = disabled || loading;

  const baseClasses = clsx(
    "font-medium cursor-pointer transition-all flex items-center justify-center gap-2",
    {
      "rounded-t-md": borderTop,
      "rounded-b-md": borderBottom,
      "opacity-50 cursor-not-allowed": isDisabled,
    }
  );

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-5 py-2",
    lg: "text-lg px-6 py-3",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    contain: clsx(
      "bg-primary-dark text-white",
      "hover:bg-primary-darker hover:shadow-md",
      "shadow-primary-darker/20"
    ),
    outline: clsx(
      "border border-primary-darker text-primary-darker dark:text-white",
      "hover:bg-border/50 dark:hover:bg-border/90"
    ),
    error: clsx(
      "bg-error text-white border border-error",
      "hover:bg-error/90 hover:border-error/90 dark:bg-red-600 dark:border-red-600 dark:hover:border-red-700",
      "shadow-red-600/20"
    ),
    text: "",
    success: clsx(
      "bg-success text-white border border-success",
      "hover:bg-success/90 hover:border-success/90",
      "shadow-success/20"
    ),
    warning: clsx(
      "bg-warning text-white border border-warning",
      "hover:bg-warning/90 hover:border-warning/90",
      "shadow-warning/20"
    ),
  };

  return (
    <button
      disabled={isDisabled}
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...buttonProps}
    >
      {loading ? (
        <>
          <AiOutlineLoading3Quarters className="animate-spin" />
          Loading
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
