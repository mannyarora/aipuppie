
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = false }: LogoProps) {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-24",
  };
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img 
        src={theme === "light" 
          ? "/lovable-uploads/deabdf6a-2108-4edb-8bca-8f191442e575.png"
          : "/lovable-uploads/b371c0ab-02ee-4201-8d9f-679966039bc1.png"
        } 
        alt="AiPuppie Logo" 
        className={cn(sizeClasses[size], "w-auto object-contain")}
      />
      {showText && <span className="font-bold text-xl">AiPuppie</span>}
    </div>
  );
}
