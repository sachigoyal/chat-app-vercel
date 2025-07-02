import { useRef, useEffect } from "react";
import { Message } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { LoadingIndicator } from "./LoadingIndicator";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const EmptyState = () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Start a conversation</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-3 min-h-full">
        {messages.length === 0 && <EmptyState />}

        {messages
          .filter((message) => message.role === "user" || message.role === "assistant")
          .map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
            />
          ))}

        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}; 