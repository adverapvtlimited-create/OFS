import { cn } from "@/lib/cn";

export function FormGroup({ children, className = "", ...props }) {
  return (
    <div className={cn("flex flex-col gap-2 mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function FormLabel({ children, className = "", ...props }) {
  return (
    <label
      className={cn(
        "text-xs font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.05em]",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export function FormControl({
  as: Component = "input",
  className = "",
  error = false,
  ...props
}) {
  return (
    <Component
      className={cn(
        "w-full px-5 py-3.5 text-sm text-ofs-gray-900 bg-white border rounded-sm outline-none transition-all duration-150 ease-smooth placeholder:text-ofs-gray-400",
        error
          ? "border-ofs-red-500 focus:border-ofs-red-600 focus:ring-2 focus:ring-ofs-red-500/20"
          : "border-ofs-gray-300 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/15",
        Component === "textarea" && "min-h-[120px] resize-y",
        className
      )}
      {...props}
    />
  );
}

export const Input = (props) => <FormControl as="input" {...props} />;
export const Textarea = (props) => <FormControl as="textarea" {...props} />;
export const Select = (props) => <FormControl as="select" {...props} />;
