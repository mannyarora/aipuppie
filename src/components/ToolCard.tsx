
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tool } from "@/contexts/ToolsContext";
import { ExternalLink } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ToolCard({ tool, isAdmin, onEdit, onDelete }: ToolCardProps) {
  return (
    <Card className="tool-card h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl flex items-start justify-between gap-2">
          <span>{tool.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base">{tool.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          Visit Tool <ExternalLink className="h-4 w-4" />
        </a>
        
        {isAdmin && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit && onEdit(tool.id)}
            >
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDelete && onDelete(tool.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
