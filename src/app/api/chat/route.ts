import { streamText, UIMessage } from 'ai';
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('models/gemini-2.0-flash-exp'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}