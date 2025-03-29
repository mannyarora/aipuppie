
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PasswordDialog } from "@/components/PasswordDialog";
import { Logo } from "@/components/Logo";
import { Header } from "@/components/Header";

export default function LoginPage() {
  const [showPasswordDialog, setShowPasswordDialog] = useState(true);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleUserLogin = (password: string) => {
    const success = login(password);
    if (success) {
      navigate("/");
    }
    return success;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <Logo className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">User Login</h1>
          <p className="text-muted-foreground mb-6">
            Enter your password to access our AI tools collection
          </p>
          
          <PasswordDialog
            isOpen={showPasswordDialog}
            onClose={() => navigate("/")}
            onSubmit={handleUserLogin}
            title="User Login"
            description="Enter the password to access AI tools."
          />
        </div>
      </main>
    </div>
  );
}
