
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PasswordDialog } from "@/components/PasswordDialog";
import { Logo } from "@/components/Logo";
import { Header } from "@/components/Header";

export default function AdminLoginPage() {
  const [showAdminDialog, setShowAdminDialog] = useState(true);
  const { isAdmin, adminLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  const handleAdminLogin = (password: string) => {
    const success = adminLogin(password);
    if (success) {
      navigate("/admin");
    }
    return success;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <Logo className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground mb-6">
            Enter your admin password to access the tools management panel
          </p>
          
          <PasswordDialog
            isOpen={showAdminDialog}
            onClose={() => navigate("/")}
            onSubmit={handleAdminLogin}
            title="Admin Login"
            description="Enter admin password to access the admin panel."
          />
        </div>
      </main>
    </div>
  );
}
