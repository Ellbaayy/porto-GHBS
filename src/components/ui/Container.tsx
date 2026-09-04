import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14", className)}>
      {children}
    </div>
  );
}
