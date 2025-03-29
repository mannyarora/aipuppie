
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { User, UserCog } from "lucide-react";

export function Header() {
  const { isAuthenticated, logout, isAdmin, adminLogout } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-bold text-xl">AiPuppie.com</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              onClick={() => {
                logout();
                if (isAdmin) adminLogout();
              }}
            >
              Logout
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  User Login
                </Button>
              </Link>
              <Link to="/admin-login">
                <Button variant="outline" className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  Admin Login
                </Button>
              </Link>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
