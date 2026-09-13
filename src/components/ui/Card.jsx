import { cn } from "@/lib/cn";

export function Card({
  children,
  variant = "modern",
  className = "",
  as: Component = "div",
  ...props
}) {
  const variantStyles = {
    modern:
      "bg-white border border-ofs-gray-200 shadow-sm hover:border-ofs-navy-300 hover:shadow-xl sm:hover:-translate-y-1",
    dark:
      "bg-white/[0.04] border border-white/10 text-white backdrop-blur-md hover:bg-white/[0.08] hover:border-white/[0.22] sm:hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)]",
    gradient:
      "bg-gradient-to-br from-[#F8FAFD] to-[#EEF4FF] border border-ofs-gray-200 shadow-sm hover:border-ofs-navy-300 hover:shadow-xl sm:hover:-translate-y-1",
  };

  return (
    <Component
      className={cn(
        "rounded-md p-4 sm:p-5 transition-all duration-250 ease-spring relative flex flex-col",
        variantStyles[variant] || variantStyles.modern,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardModern(props) {
  return <Card variant="modern" {...props} />;
}

export function CardDark(props) {
  return <Card variant="dark" {...props} />;
}

export default Card;
