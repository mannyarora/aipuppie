
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Session, User } from "@supabase/supabase-js";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  adminLogin: (password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
  user: User | null;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("authenticated") === "true";
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("admin") === "true";
  });

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();

  // Set up auth state change listener and check initial session
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession) {
          setIsAuthenticated(true);
          // Check admin role through metadata or email
          setIsAdmin(!!newSession.user.email?.endsWith("@admin.com"));
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("admin", String(!!newSession.user.email?.endsWith("@admin.com")));
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
          localStorage.setItem("authenticated", "false");
          localStorage.setItem("admin", "false");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      if (initialSession) {
        setIsAuthenticated(true);
        // Check admin role through metadata or email
        setIsAdmin(!!initialSession.user.email?.endsWith("@admin.com"));
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("admin", String(!!initialSession.user.email?.endsWith("@admin.com")));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (password: string) => {
    try {
      // For simplicity, we're using sign-in with magic link
      // You might want to implement email/password auth instead
      const { error } = await supabase.auth.signInWithPassword({
        email: "user@example.com", // This would normally come from a form
        password: password
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message
        });
        return false;
      }
      
      // Auth state change listener will update state
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login error",
        description: error.message || "An unexpected error occurred"
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // Auth state change listener will update state
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout error",
        description: error.message || "An unexpected error occurred"
      });
    }
  };

  const adminLogin = async (password: string) => {
    try {
      // Sign in with admin credentials
      const { error } = await supabase.auth.signInWithPassword({
        email: "admin@admin.com", // Admin email
        password: password
      });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Admin login failed",
          description: error.message
        });
        return false;
      }
      
      // Auth state change listener will update state
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Admin login error",
        description: error.message || "An unexpected error occurred"
      });
      return false;
    }
  };

  const adminLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Auth state change listener will update state
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Admin logout error",
        description: error.message || "An unexpected error occurred"
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        isAuthenticated, 
        login, 
        logout, 
        isAdmin, 
        adminLogin, 
        adminLogout,
        user,
        session
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
