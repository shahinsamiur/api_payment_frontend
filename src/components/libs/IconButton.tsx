import { AiOutlineLoading3Quarters } from "react-icons/ai";

const IconButton = (props: IconButtonProps) => {
  const {
    children,
    variant = "default",
    size = "md",
    className = "",
    disabled = false,
    loading = false,
    ...buttonProps
  } = props;
  const baseClasses = `flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`;

  const sizeClasses: Record<IconButtonSize, string> = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const variantClasses: Record<IconButtonVariant, string> = {
    default:
      "bg-primary-dark text-white hover:bg-seconday-darker hover:shadow-md shadow-seconday-darker/30",
    error:
      "bg-error text-white hover:bg-error-dark hover:shadow-md shadow-error-dark/30",
    text: "bg-transparent hover:bg-border dark:text-white",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default IconButton;
