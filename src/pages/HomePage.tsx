
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Header } from "@/components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-16 text-center">
        <Logo className="mx-auto mb-8 w-48 h-48" />
        
        <h1 className="text-5xl font-bold mb-6 text-primary">AiPuppie.com</h1>
        
        <p className="text-xl max-w-3xl mx-auto mb-10 text-muted-foreground">
          Discover a world of powerful AI tools designed to supercharge your productivity, 
          creativity, and problem-solving abilities. From content generation to data analysis, 
          AiPuppie provides cutting-edge solutions to transform your workflow.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            to="/login" 
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg hover:bg-primary/90 transition-colors"
          >
            Explore Tools
          </Link>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} AiPuppie.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
