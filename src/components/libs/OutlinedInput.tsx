import clsx from "clsx";
import IconButton from "./IconButton";
import Typography from "./Typography";

const OutlinedInput = (props: OutlinedInputProps) => {
  const {
    label,
    error,
    className,
    startIcon,
    endIcon,
    onStartIconClick,
    onEndIconClick,
    endAdornment,
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
            className="absolute left-1 top-1/2 -translate-y-1/2"
          >
            {startIcon}
          </IconButton>
        )}
        <input
          {...inputProps}
          className={clsx(className, {
            // "!border-error placeholder-error": error,
            "!pl-10": startIcon,
            "!pr-10": endIcon,
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
        {endAdornment && (
          <div className="absolute right-0 top-0">{endAdornment}</div>
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

export default OutlinedInput;
