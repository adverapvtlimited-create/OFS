import { cn } from "@/lib/cn";

export default function SectionPad({
  children,
  top = true,
  bottom = true,
  className = "",
  as: Component = "section",
  ...props
}) {
  return (
    <Component
      className={cn(
        top && bottom && "py-8 sm:py-10 md:py-12 lg:py-14",
        top && !bottom && "pt-8 sm:pt-10 md:pt-12 lg:pt-14",
        !top && bottom && "pb-8 sm:pb-10 md:pb-12 lg:pb-14",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
