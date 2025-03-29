
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTools, Tool } from "@/contexts/ToolsContext";
import { Header } from "@/components/Header";
import { ToolForm } from "@/components/ToolForm";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

export default function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
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
      setShowForm(false);
    } catch (error) {
      // Error is already handled in the context
    }
  };
  
  const handleDeleteTool = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this tool?")) {
      try {
        await deleteTool(id);
        toast({
          title: "Tool Deleted",
          description: "The tool has been successfully deleted.",
        });
      } catch (error) {
        console.error("Error deleting tool:", error);
      }
    }
  };
  
  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setShowForm(true);
  };
  
  const filteredTools = tools
    .filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortDirection === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tools Management</h1>
          <Button onClick={() => { setEditingTool(undefined); setShowForm(true); }}>
            <Plus className="mr-2 h-4 w-4" /> Add New Tool
          </Button>
        </div>
        
        <Card className="mb-8">
          <div className="p-4">
            <div className="relative w-full max-w-sm mb-4">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <span className="ml-2 text-lg">Loading...</span>
              </div>
            ) : filteredTools.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "No tools match your search" : "No tools added yet"}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:text-primary" 
                      onClick={toggleSortDirection}
                    >
                      Name {sortDirection === "asc" ? "↑" : "↓"}
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTools.map((tool) => (
                    <TableRow key={tool.id}>
                      <TableCell className="font-medium">{tool.name}</TableCell>
                      <TableCell className="max-w-md truncate">{tool.description}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        <a 
                          href={tool.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline"
                        >
                          {tool.url}
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditTool(tool)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteTool(tool.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </Card>
        
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingTool ? "Edit Tool" : "Add New Tool"}</DialogTitle>
            </DialogHeader>
            <ToolForm
              initialData={editingTool}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingTool(undefined);
              }}
            />
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
