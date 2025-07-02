export interface Message {
  role: "data" | "system" | "user" | "assistant";
  content: string;
  createdAt?: Date;
}

export interface MessageDisplayProps {
  message: Message;
  index: number;
  isLoading?: boolean;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  shouldShowTimestamp: boolean;
} 