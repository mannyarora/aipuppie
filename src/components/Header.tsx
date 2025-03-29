
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

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
          {isAuthenticated && (
            <>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline">Admin Panel</Button>
                </Link>
              )}
              <Button 
                variant="outline" 
                onClick={() => {
                  logout();
                  if (isAdmin) adminLogout();
                }}
              >
                Logout
              </Button>
            </>
          )}
          {!isAuthenticated && (
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
