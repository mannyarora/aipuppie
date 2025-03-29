
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PasswordDialog } from "@/components/PasswordDialog";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const { isAuthenticated, login, isAdmin, adminLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <Logo className="mb-4" />
      
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Welcome to AiPuppie</h1>
        <p className="text-muted-foreground mt-2">
          Please log in to access our AI tools collection
        </p>
      </div>
      
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button 
          size="lg" 
          onClick={() => setShowPasswordDialog(true)}
          className="w-full"
        >
          User Login
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => setShowAdminDialog(true)}
          className="w-full"
        >
          Admin Login
        </Button>
      </div>
      
      <PasswordDialog
        isOpen={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        onSubmit={login}
        title="User Login"
        description="Enter the password to access AI tools."
      />
      
      <PasswordDialog
        isOpen={showAdminDialog}
        onClose={() => setShowAdminDialog(false)}
        onSubmit={adminLogin}
        title="Admin Login"
        description="Enter admin password to access the admin panel."
      />
    </div>
  );
}
