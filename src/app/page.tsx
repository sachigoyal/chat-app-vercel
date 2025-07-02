"use client";

import { useChat } from "@ai-sdk/react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageList } from "@/components/chat/MessageList";
import { ChatInput } from "@/components/chat/ChatInput";

export default function Home() {
  const { messages, input, setInput, append, isLoading, setMessages } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await append({ content: input, role: "user" });
      setInput("");
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-background border-x border-border">
      <ChatHeader onNewChat={handleNewChat} />
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
