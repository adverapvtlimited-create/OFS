import { cn } from "@/lib/cn";
import SonarDot from "./SonarDot";

export default function Pill({
  children,
  variant = "default",
  withSonar = false,
  sonarColor,
  icon,
  className = "",
  ...props
}) {
  const variantStyles = {
    default:
      "bg-[rgba(12,30,78,0.05)] text-ofs-navy-900 border border-[rgba(12,30,78,0.12)] hover:bg-[rgba(12,30,78,0.08)] hover:border-[rgba(12,30,78,0.2)]",
    green:
      "bg-emerald-500/10 text-ofs-green-800 border border-emerald-500/25 hover:bg-emerald-500/15",
    dark:
      "bg-white/[0.07] text-white border border-white/15",
  };

  const effectiveSonarColor =
    sonarColor || (variant === "green" ? "green" : "red");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full backdrop-blur-md transition-all duration-150 ease-smooth leading-none",
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...props}
    >
      {withSonar && <SonarDot color={effectiveSonarColor} />}
      {icon}
      {children}
    </span>
  );
}
