
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTools, Tool } from "@/contexts/ToolsContext";
import { Header } from "@/components/Header";
import { ToolForm } from "@/components/ToolForm";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AdminPage() {
  const [showForm, setShowForm] = useState(true);
  const [editingTool, setEditingTool] = useState<Tool | undefined>(undefined);
  
  const { isAdmin } = useAuth();
  const { tools, isLoading, addTool, updateTool, deleteTool } = useTools();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, [isAdmin, navigate]);

  const handleFormSubmit = async (data: Omit<Tool, "id">) => {
    try {
      if (editingTool) {
        await updateTool(editingTool.id, data);
        toast({
          title: "Tool Updated",
          description: "The tool has been successfully updated.",
        });
      } else {
        await addTool(data);
        toast({
          title: "Tool Added",
          description: "The tool has been successfully added.",
        });
      }
      setEditingTool(undefined);
    } catch (error) {
      // Error is already handled in the context
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Add New Tool</h1>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading...</span>
          </div>
        ) : (
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <ToolForm
              initialData={editingTool}
              onSubmit={handleFormSubmit}
              onCancel={() => setEditingTool(undefined)}
            />
          </div>
        )}
      </main>
    </div>
  );
}
