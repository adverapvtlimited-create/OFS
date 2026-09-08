import { cn } from "@/lib/cn";

export default function SonarDot({ color = "red", ringColor, className = "" }) {
  const colorStyles = {
    red: "bg-ofs-red-600 after:border-ofs-red-600",
    green: "bg-ofs-green-500 after:border-ofs-green-500",
    gold: "bg-ofs-gold-500 after:border-ofs-gold-500",
    navy: "bg-ofs-navy-600 after:border-ofs-navy-600",
  };
  const ringStyles = {
    red: "after:border-ofs-red-600",
    green: "after:border-ofs-green-500",
    gold: "after:border-ofs-gold-500",
    navy: "after:border-ofs-navy-600",
  };

  return (
    <span
      className={cn(
        "w-2 h-2 rounded-full relative inline-block shrink-0",
        "after:content-[''] after:absolute after:-inset-1 after:rounded-full after:border-2 after:animate-sonar motion-reduce:after:animate-none",
        colorStyles[color]?.replace(/ after:border-[^ ]+/, "") || colorStyles.red,
        ringStyles[ringColor || color] || ringStyles.red,
        className
      )}
    />
  );
}
