import clsx from "clsx";
import IconButton from "./IconButton";
import Typography from "./Typography";

const OutlinedTextArea = (props: OutlinedTextareaProps) => {
  const {
    label,
    error,
    className,
    startIcon,
    endIcon,
    onStartIconClick,
    onEndIconClick,
    ...inputProps
  } = props;

  return (
    <div>
      <label>{label}</label>
      <div className="relative">
        {startIcon && (
          <IconButton
            type="button"
            variant="text"
            size="sm"
            onClick={onStartIconClick}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          >
            {startIcon}
          </IconButton>
        )}
        <textarea
          {...inputProps}
          className={clsx(className, {
            // "!border-error placeholder-error": error,
          })}
        />
        {endIcon && (
          <IconButton
            type="button"
            variant="text"
            size="sm"
            onClick={onEndIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {endIcon}
          </IconButton>
        )}
      </div>
      {error && (
        <Typography variant="error" className="mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default OutlinedTextArea;
