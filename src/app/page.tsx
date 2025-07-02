"use client";
/* import { generateText } from "ai";
import { google } from "@ai-sdk/google";*/
import ReactMarkdown from "react-markdown";
import { useChat } from "@ai-sdk/react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const { messages, input, setInput, append, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await append({ content: input, role: "user" });
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (date?: Date) => {
    const targetDate = date || new Date();
    return targetDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDatetime = (date?: Date) => {
    const targetDate = date || new Date();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (targetDate.toDateString() === today.toDateString()) {
      return `Today ${formatTime(targetDate)}`;
    } else if (targetDate.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${formatTime(targetDate)}`;
    } else {
      return targetDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  const shouldShowTimestamp = (index: number) => {
    if (index === 0) return true;
    const currentMessage = messages[index];
    const previousMessage = messages[index - 1];
    return (
      index % 4 === 0 ||
      (index > 0 &&
        currentMessage.role !== previousMessage.role &&
        index % 2 === 0)
    );
  };

  const isLastInGroup = (index: number) => {
    if (index === messages.length - 1) return true;
    const currentMessage = messages[index];
    const nextMessage = messages[index + 1];
    return currentMessage.role !== nextMessage.role;
  };

  const isFirstInGroup = (index: number) => {
    if (index === 0) return true;
    const currentMessage = messages[index];
    const previousMessage = messages[index - 1];
    return currentMessage.role !== previousMessage.role;
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <Sparkles className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">Gemini</h1>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 relative overflow-hidden">
        <ScrollArea>
          <div className="py-6 pb-32 space-y-4 overflow-y-auto">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center space-y-4 max-w-md">
                  <div className="relative">
                    <Avatar className="h-16 w-16 mx-auto">
                      <AvatarFallback>
                        <Sparkles className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Chat with Gemini
                    </h2>
                    <p className="text-muted-foreground">
                      Ask me anything to start our conversation
                    </p>
                  </div>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className="space-y-3">
                {/* Timestamp */}
                {shouldShowTimestamp(index) && (
                  <div className="flex justify-center py-2">
                    <div className="text-xs text-muted-foreground bg-background/50 border border-border rounded-full px-3 py-1">
                      {formatDatetime()}
                    </div>
                  </div>
                )}

                {/* Message */}
                <div
                  className={`flex items-end gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && !isFirstInGroup(index) && (
                    <div className="w-7" />
                  )}

                  {/* Message bubble */}
                  <div
                    className={`max-w-[80%] sm:max-w-[65%] ${
                      message.role === "user" ? "order-2" : "order-1"
                    }`}
                  >
                    <div
                      className={`px-4 py-3 text-sm leading-relaxed message-enter ${
                        message.role === "user"
                          ? `bg-blue-500 text-white ${
                              isFirstInGroup(index)
                                ? "rounded-3xl rounded-br-lg"
                                : isLastInGroup(index)
                                ? "rounded-3xl rounded-tr-lg"
                                : "rounded-3xl rounded-r-lg"
                            }`
                          : `bg-muted text-foreground border ${
                              isFirstInGroup(index)
                                ? "rounded-3xl rounded-bl-lg"
                                : isLastInGroup(index)
                                ? "rounded-3xl rounded-tl-lg"
                                : "rounded-3xl rounded-l-lg"
                            }`
                      }`}
                    >
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="ml-4 list-disc space-y-1 mb-2 last:mb-0">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="ml-4 list-decimal space-y-1 mb-2 last:mb-0">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="leading-relaxed">{children}</li>
                          ),
                          code: ({ children }) => (
                            <code
                              className={`px-2 py-1 rounded text-xs font-mono ${
                                message.role === "user"
                                  ? "bg-blue-600/50 text-blue-100"
                                  : "bg-muted-foreground/10 text-foreground font-medium"
                              }`}
                            >
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre
                              className={`p-3 rounded-lg text-xs font-mono overflow-x-auto mb-2 last:mb-0 ${
                                message.role === "user"
                                  ? "bg-blue-600/50 text-blue-100"
                                  : "bg-muted-foreground/10 text-foreground"
                              }`}
                            >
                              {children}
                            </pre>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>

                    {/* Delivery status - only show for last message in user group */}
                    {message.role === "user" && isLastInGroup(index) && (
                      <div className="text-xs text-muted-foreground mt-1.5 text-right">
                        Delivered
                      </div>
                    )}
                  </div>

                  {/* Spacer for grouped user messages */}
                  {message.role === "user" && !isFirstInGroup(index) && (
                    <div className="w-7" />
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-end gap-3 justify-start">
                <div className="bg-muted text-foreground rounded-3xl rounded-bl-lg px-4 py-3 border shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full typing-dot" />
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full typing-dot" />
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input area */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl p-4 border-t bg-background z-10">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Gemini..."
              disabled={isLoading}
              className="min-h-[48px] pl-4 pr-12 py-3 rounded-full resize-none border-2 focus-visible:ring-1 transition-all text-sm"
            />
            <Avatar className="absolute right-2.5 top-1/2 transform -translate-y-1/2 h-7 w-7">
              <AvatarFallback className="bg-muted text-muted-foreground">
                <User className="h-3 w-3" />
              </AvatarFallback>
            </Avatar>
          </div>
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 send-button shadow-lg disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
