
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
          ? "/lovable-uploads/523d0ee2-0ae2-4011-b348-1ac2cc0d7d32.png"
          : "/lovable-uploads/7df51b85-56ed-413e-a2d7-da643998d4f6.png"
        } 
        alt="AiPuppie Logo" 
        className="h-full w-auto object-contain" 
      />
    </div>
  );
}
