import { cn } from "@/lib/cn";
import SonarDot from "./SonarDot";

export default function Badge({
  children,
  variant = "navy",
  withSonar = false,
  sonarColor,
  icon,
  className = "",
  ...props
}) {
  const variantStyles = {
    navy: "bg-ofs-navy-950 text-white shadow-[0_2px_6px_rgba(6,14,36,0.2)]",
    red: "bg-ofs-red-600 text-white shadow-[0_2px_8px_rgba(224,42,48,0.3)]",
    green: "bg-ofs-green-600 text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)]",
    gold: "bg-ofs-gold-600 text-white shadow-[0_2px_8px_rgba(217,119,6,0.3)]",
    light: "bg-ofs-navy-50 text-ofs-navy-900 border border-ofs-navy-200 shadow-none",
  };

  const effectiveSonarColor =
    sonarColor || (variant === "green" ? "green" : variant === "gold" ? "gold" : "red");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.08em] rounded-xs leading-none",
        variantStyles[variant] || variantStyles.navy,
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
