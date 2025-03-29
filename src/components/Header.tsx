
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { User, UserCog, Home } from "lucide-react";

export function Header() {
  const { isAuthenticated, logout, isAdmin, adminLogout } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo size="sm" showText={true} />
        </Link>
        
        <div className="flex items-center gap-4">
          {isAdmin ? (
            <>
              <Link to="/admin">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => adminLogout()}
              >
                Admin Logout
              </Button>
            </>
          ) : isAuthenticated ? (
            <>
              <Link to="/home">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Tools
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => logout()}
              >
                Logout
              </Button>
            </>
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
