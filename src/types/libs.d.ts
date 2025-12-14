type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption"
  | "error";
type TypographyColor =
  | "text"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "info"
  | "error"
  | "white"
  | "gray"
  | "black";
type TypographyAlign = "left" | "center" | "right" | "justify";
interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  className?: string;
  children?: React.ReactNode;
}

interface OutlinedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
  endAdornment?: React.ReactNode;
}
interface OutlinedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
}

type IconButtonSize = "sm" | "md" | "lg";
type IconButtonVariant = "default" | "error" | "text";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

type ChipColor = "default" | "primary" | "success" | "error" | "warning";
type ChipVariant = "default" | "primary" | "success" | "error" | "warning";

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  color?: ChipColor;
  onDelete?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

type ButtonVariant =
  | "contain"
  | "outline"
  | "text"
  | "error"
  | "success"
  | "warning";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  borderTop?: boolean;
  borderBottom?: boolean;
  loading?: boolean;
}

interface AnimationProps {
  children: React.ReactNode;
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  inViewClass?: string;
  outViewClass?: string;
  transitionClass?: string;
  animationDelay?: number;
  onInViewChange?: () => void;
}

type colorType = "primary" | "success" | "warning" | "error" | "info";
interface ReportCardProps {
  title: string;
  startIcon?: React.ReactNode;
  value: number;
  color: colorType;
  JSX?: React.ReactNode;
}
