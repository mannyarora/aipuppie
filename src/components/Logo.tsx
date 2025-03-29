
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
          ? "/lovable-uploads/45e8454a-fa0f-4d0f-b760-e9860ee67429.png"
          : "/lovable-uploads/6668e75c-065f-4bbd-9cdc-4d08f70cf025.png"
        } 
        alt="AiPuppie Logo" 
        className="h-full w-auto object-contain" 
      />
    </div>
  );
}
