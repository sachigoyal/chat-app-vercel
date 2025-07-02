import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ChatHeaderProps {
  onNewChat?: () => void;
}

export const ChatHeader = ({ onNewChat }: ChatHeaderProps) => {
  return (
    <div className="border-b border-border bg-background">
      <div className="px-4 py-3 flex items-center justify-between">
        <h1 className="text-sm font-medium text-foreground">Chat</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNewChat}
          aria-label="New chat"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 