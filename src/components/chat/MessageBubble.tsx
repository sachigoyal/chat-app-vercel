import ReactMarkdown from "react-markdown";
import { MessageDisplayProps } from "@/types/chat";
import { getMessageBubbleClasses } from "@/lib/chat-utils";

export const MessageBubble = ({ message }: { message: MessageDisplayProps['message'] }) => {
  const bubbleClasses = getMessageBubbleClasses(message.role);

  return (
    <div
      className={`flex gap-2 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div className="max-w-[70%]">
        <div className={bubbleClasses}>
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-1 last:mb-0">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="ml-3 list-disc space-y-0.5 mb-1 last:mb-0">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="ml-3 list-decimal space-y-0.5 mb-1 last:mb-0">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-normal">{children}</li>
              ),
              code: ({ children }) => (
                <code
                  className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                    message.role === "user"
                      ? "bg-background/20 text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre
                  className={`p-2 rounded text-xs font-mono overflow-x-auto mb-1 last:mb-0 ${
                    message.role === "user"
                      ? "bg-background/20 text-background"
                      : "bg-muted text-foreground"
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
      </div>
    </div>
  );
}; 