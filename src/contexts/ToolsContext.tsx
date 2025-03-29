
import { createContext, useContext, useState, useEffect } from "react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
}

interface ToolsContextType {
  tools: Tool[];
  addTool: (tool: Omit<Tool, "id">) => void;
  updateTool: (id: string, tool: Partial<Tool>) => void;
  deleteTool: (id: string) => void;
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export function ToolsProvider({ children }: { children: React.ReactNode }) {
  const [tools, setTools] = useState<Tool[]>(() => {
    const savedTools = localStorage.getItem("tools");
    return savedTools ? JSON.parse(savedTools) : [];
  });

  useEffect(() => {
    localStorage.setItem("tools", JSON.stringify(tools));
  }, [tools]);

  const addTool = (tool: Omit<Tool, "id">) => {
    const newTool = {
      ...tool,
      id: crypto.randomUUID(),
    };
    setTools((prev) => [...prev, newTool]);
  };

  const updateTool = (id: string, updatedTool: Partial<Tool>) => {
    setTools((prev) =>
      prev.map((tool) => (tool.id === id ? { ...tool, ...updatedTool } : tool))
    );
  };

  const deleteTool = (id: string) => {
    setTools((prev) => prev.filter((tool) => tool.id !== id));
  };

  return (
    <ToolsContext.Provider value={{ tools, addTool, updateTool, deleteTool }}>
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
