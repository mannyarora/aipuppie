
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTools } from "@/contexts/ToolsContext";
import { Header } from "@/components/Header";
import { ToolCard } from "@/components/ToolCard";
import { PasswordDialog } from "@/components/PasswordDialog";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const { tools } = useTools();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && tools.length > 0) {
      setShowPasswordDialog(true);
    }
  }, [isAuthenticated, tools.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to AiPuppie.com</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover our collection of powerful AI tools designed to enhance your productivity and creative workflows.
          </p>
        </section>
        
        {isAuthenticated ? (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Our AI Tools</h2>
            
            {tools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No tools have been added yet.</p>
                <Button onClick={() => navigate("/admin")}>Go to Admin Panel</Button>
              </div>
            )}
          </section>
        ) : (
          <section className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Please log in to access our collection of AI tools.
            </p>
            <Button onClick={() => setShowPasswordDialog(true)}>
              Log In
            </Button>
          </section>
        )}
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} AiPuppie.com. All rights reserved.
        </div>
      </footer>
      
      <PasswordDialog
        isOpen={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        onSubmit={login}
        title="Password Required"
        description="Enter the password to access AI tools."
      />
    </div>
  );
}
