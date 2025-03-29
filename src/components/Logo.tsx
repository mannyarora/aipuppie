
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const { theme } = useTheme();
  
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={theme === "light" 
          ? "/lovable-uploads/ff5a2260-597b-49a9-b21f-8adcb577fda7.png"
          : "/lovable-uploads/35e0fb42-3216-451e-bebf-768d5a3a5cf8.png"
        } 
        alt="AiPuppie Logo" 
        className="h-10 w-auto" 
      />
    </div>
  );
}
