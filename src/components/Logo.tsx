
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-24",
  };
  
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={theme === "light" 
          ? "/lovable-uploads/45e8454a-fa0f-4d0f-b760-e9860ee67429.png"
          : "/lovable-uploads/6668e75c-065f-4bbd-9cdc-4d08f70cf025.png"
        } 
        alt="AiPuppie Logo" 
        className={cn(sizeClasses[size], "w-auto object-contain")}
      />
    </div>
  );
}
