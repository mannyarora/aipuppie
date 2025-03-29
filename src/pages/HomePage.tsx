
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTools } from "@/contexts/ToolsContext";
import { Header } from "@/components/Header";
import { ToolCard } from "@/components/ToolCard";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { tools, isLoading } = useTools();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">AiPuppie.com</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover our collection of powerful AI tools designed to enhance your productivity and creative workflows.
          </p>
        </section>
        
        {isAuthenticated && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Our AI Tools</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <span className="ml-2 text-lg">Loading tools...</span>
              </div>
            ) : tools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No tools have been added yet.</p>
              </div>
            )}
          </section>
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
