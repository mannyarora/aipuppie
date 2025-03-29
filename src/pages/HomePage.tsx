
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="mb-8">
          <Logo size="lg" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">AiPuppie.com</h1>
        
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-center text-muted-foreground">
          Discover a world of powerful AI tools designed to supercharge your productivity, 
          creativity, and problem-solving abilities. From content generation to data analysis, 
          AiPuppie provides cutting-edge solutions to transform your workflow.
        </p>
        
        <Link to="/login">
          <Button 
            className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-lg hover:bg-primary/90 transition-colors"
          >
            Explore Tools
          </Button>
        </Link>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <Logo size="sm" className="mx-auto mb-2" />
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} AiPuppie.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
