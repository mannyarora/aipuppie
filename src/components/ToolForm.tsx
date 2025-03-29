
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tool } from "@/contexts/ToolsContext";

interface ToolFormProps {
  initialData?: Tool;
  onSubmit: (data: Omit<Tool, "id">) => void;
  onCancel: () => void;
}

export function ToolForm({ initialData, onSubmit, onCancel }: ToolFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [url, setUrl] = useState(initialData?.url || "");
  
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    url: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      name: !name.trim(),
      description: !description.trim(),
      url: !url.trim() || !isValidURL(url),
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(Boolean)) {
      return;
    }
    
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      url: url.trim(),
    });
  };
  
  const isValidURL = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Tool Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-sm text-red-500">Tool name is required</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="url">Tool URL</Label>
        <Input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className={errors.url ? "border-red-500" : ""}
        />
        {errors.url && (
          <p className="text-sm text-red-500">
            {!url.trim() ? "URL is required" : "Please enter a valid URL"}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <p className="text-sm text-red-500">Description is required</p>
        )}
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Tool" : "Add Tool"}
        </Button>
      </div>
    </form>
  );
}
