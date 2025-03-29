
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => boolean;
  title: string;
  description: string;
}

export function PasswordDialog({ isOpen, onClose, onSubmit, title, description }: PasswordDialogProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onSubmit(password);
    
    if (success) {
      setPassword("");
      setError(false);
      onClose();
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      });
    } else {
      setError(true);
      toast({
        title: "Error",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              className={error ? "border-red-500" : ""}
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-500">Incorrect password. Please try again.</p>
            )}
          </div>
          
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
