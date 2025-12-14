import clsx from "clsx";

interface LoadingIndicatorProps {
  fullScreen?: boolean;
  className?: string;
}

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const { fullScreen = false, className } = props;

  const container = clsx(
    "relative flex items-center justify-center overflow-hidden",
    { "min-h-screen bg-background": fullScreen },
    className
  );

  return (
    <div className={container}>
      <div className="flex justify-center items-center space-x-2 mt-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="size-3 bg-primary-lighter rounded-full animate-bounce"
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
