import Link from "next/link";
import { cn } from "@/lib/cn";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  type = "button",
  ...props
}) {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 font-mono font-bold uppercase tracking-[0.06em] rounded-xs cursor-pointer transition-all duration-250 ease-spring overflow-hidden leading-none no-underline whitespace-nowrap before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-[left] before:duration-700 hover:before:left-full";

  const sizeStyles = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3.5 text-sm sm:w-auto w-full",
    lg: "px-9 py-4 text-base sm:w-auto w-full",
  };

  const variantStyles = {
    primary:
      "bg-ofs-red-600 text-white border border-ofs-red-500 shadow-[0_4px_16px_rgba(224,42,48,0.32)] hover:bg-ofs-red-700 hover:shadow-[0_8px_24px_rgba(224,42,48,0.45)] hover:-translate-y-0.5",
    navy:
      "bg-ofs-navy-900 text-white border border-ofs-navy-700 shadow-[0_4px_16px_rgba(12,30,78,0.28)] hover:bg-ofs-navy-800 hover:shadow-[0_8px_24px_rgba(12,30,78,0.42)] hover:-translate-y-0.5",
    outline:
      "bg-transparent text-ofs-navy-950 border-[1.5px] border-ofs-navy-900 hover:bg-ofs-navy-950 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(6,14,36,0.2)]",
    "outline-white":
      "bg-white/[0.04] text-white border-[1.5px] border-white/35 backdrop-blur-md hover:bg-white hover:text-ofs-navy-950 hover:border-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]",
    green:
      "bg-ofs-green-600 text-white border border-ofs-green-500 shadow-[0_4px_16px_rgba(16,185,129,0.32)] hover:bg-ofs-green-700 hover:shadow-[0_8px_24px_rgba(16,185,129,0.45)] hover:-translate-y-0.5",
  };

  const combinedClasses = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
