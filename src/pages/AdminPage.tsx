
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTools, Tool } from "@/contexts/ToolsContext";
import { Header } from "@/components/Header";
import { ToolCard } from "@/components/ToolCard";
import { ToolForm } from "@/components/ToolForm";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | undefined>(undefined);
  
  const { isAdmin } = useAuth();
  const { tools, isLoading, addTool, updateTool, deleteTool } = useTools();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  const handleEdit = (id: string) => {
    const tool = tools.find((t) => t.id === id);
    if (tool) {
      setEditingTool(tool);
      setShowForm(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this tool?")) {
      try {
        await deleteTool(id);
        toast({
          title: "Tool Deleted",
          description: "The tool has been successfully deleted.",
        });
      } catch (error) {
        // Error is already handled in the context
      }
    }
  };

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
      setShowForm(false);
      setEditingTool(undefined);
    } catch (error) {
      // Error is already handled in the context
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTool(undefined);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          
          {!showForm && !isLoading && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Tool
            </Button>
          )}
        </div>
        
        {showForm ? (
          <div className="bg-card p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingTool ? "Edit Tool" : "Add New Tool"}
            </h2>
            <ToolForm
              initialData={editingTool}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
            />
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading tools...</span>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Manage Tools</h2>
            
            {tools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isAdmin
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg">
                <p className="text-muted-foreground mb-4">No tools have been added yet.</p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Your First Tool
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} AiPuppie.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
