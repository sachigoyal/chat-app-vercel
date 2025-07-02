export const formatTime = (date?: Date): string => {
  const targetDate = date || new Date();
  return targetDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDatetime = (date?: Date): string => {
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

export const getMessageBubbleClasses = (
  role: "data" | "system" | "user" | "assistant"
): string => {
  const baseClasses = "px-3 py-2 text-sm leading-normal";
  
  if (role === "user") {
    return `${baseClasses} bg-foreground text-background border border-foreground rounded-lg`;
  } else {
    return `${baseClasses} bg-background text-foreground border border-border rounded-lg`;
  }
}; 