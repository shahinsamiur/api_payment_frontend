import clsx from "clsx";

const Typography = ({
  variant = "body1",
  color = "text",
  align = "left",
  children,
  className,
  ...props
}: TypographyProps) => {
  // Define variant styles
  const variants: Record<TypographyVariant, string> = {
    h1: "text-3xl font-bold leading-tight md:text-4xl lg:text-5xl",
    h2: "text-2xl font-semibold leading-snug md:text-4xl",
    h3: "text-xl font-semibold leading-snug md:text-3xl",
    h4: "text-lg font-semibold leading-snug md:text-2xl",
    h5: "text-md font-medium leading-snug md:text-xl",
    h6: "text-base font-medium leading-snug md:text-lg",
    body1: "text-base leading-relaxed md:text-lg",
    body2: "text-sm leading-relaxed md:text-base",
    caption: "text-xs leading-snug md:text-sm text-gray-500 dark:text-gray-400",
    error: "text-error text-sm leading-relaxed md:text-base",
  };

  const componentMap = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    body1: "p",
    body2: "p",
    caption: "p",
    error: "p",
  };

  const Component = componentMap[variant] as React.ElementType;

  // Define color styles
  const colors: Record<TypographyColor, string> = {
    primary: "text-primary-main",
    secondary: "text-primary-main",
    text: "dark:text-white",
    success: "text-success",
    warning: "text-warning",
    info: "text-info",
    error: "text-error",
    white: "text-white",
    gray: "text-gray-500 dark:text-gray-400",
    black: "text-black",
  };

  // Define text alignment styles
  const alignments: Record<TypographyAlign, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  const typographyClass = clsx(
    variants[variant],
    alignments[align],
    className,
    { [colors[color]]: !/caption|error/.test(variant) }
  );

  return (
    <Component className={typographyClass} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
