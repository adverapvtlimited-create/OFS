import { cn } from "@/lib/cn";

export default function Container({ children, wide = false, className = "", ...props }) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-5 sm:px-8 lg:px-11",
        wide ? "max-w-[1420px]" : "max-w-[1280px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
