
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
}

interface ToolsContextType {
  tools: Tool[];
  isLoading: boolean;
  error: string | null;
  addTool: (tool: Omit<Tool, "id">) => Promise<void>;
  updateTool: (id: string, tool: Partial<Tool>) => Promise<void>;
  deleteTool: (id: string) => Promise<void>;
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export function ToolsProvider({ children }: { children: React.ReactNode }) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("tools").select("*");
      
      if (error) {
        throw error;
      }
      
      setTools(data || []);
    } catch (err: any) {
      console.error("Error fetching tools:", err);
      setError(err.message || "Failed to fetch tools");
      toast({
        variant: "destructive",
        title: "Error fetching tools",
        description: err.message || "Failed to fetch tools",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTool = async (tool: Omit<Tool, "id">) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("tools")
        .insert([tool])
        .select();
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        setTools((prev) => [...prev, data[0] as Tool]);
      }
      
      // Refresh the tools list to ensure we have the latest data
      await fetchTools();
    } catch (err: any) {
      console.error("Error adding tool:", err);
      toast({
        variant: "destructive",
        title: "Error adding tool",
        description: err.message || "Failed to add tool",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTool = async (id: string, updatedTool: Partial<Tool>) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("tools")
        .update(updatedTool)
        .eq("id", id)
        .select();
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        setTools((prev) =>
          prev.map((tool) => (tool.id === id ? { ...tool, ...updatedTool } : tool))
        );
      }
      
      // Refresh the tools list to ensure we have the latest data
      await fetchTools();
    } catch (err: any) {
      console.error("Error updating tool:", err);
      toast({
        variant: "destructive",
        title: "Error updating tool",
        description: err.message || "Failed to update tool",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTool = async (id: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from("tools")
        .delete()
        .eq("id", id);
      
      if (error) {
        throw error;
      }
      
      setTools((prev) => prev.filter((tool) => tool.id !== id));
    } catch (err: any) {
      console.error("Error deleting tool:", err);
      toast({
        variant: "destructive",
        title: "Error deleting tool",
        description: err.message || "Failed to delete tool",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolsContext.Provider value={{ tools, isLoading, error, addTool, updateTool, deleteTool }}>
      {children}
    </ToolsContext.Provider>
  );
}

export function useTools() {
  const context = useContext(ToolsContext);
  if (context === undefined) {
    throw new Error("useTools must be used within a ToolsProvider");
  }
  return context;
}
