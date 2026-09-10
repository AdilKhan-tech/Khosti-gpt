import type { Message } from './types';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000';

export type StreamHandlers = {
  onToken: (token: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
};

export async function streamChat(
  messages: Pick<Message, 'role' | 'content'>[],
  handlers: StreamHandlers,
  options?: {
    signal?: AbortSignal;
    token?: string | null;
    model?: string;
  },
): Promise<void> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (options?.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE}/chat/stream`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      model: options?.model,
    }),
    signal: options?.signal,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const data = (await response.json()) as { message?: string | string[] };
      if (typeof data.message === 'string') message = data.message;
      else if (Array.isArray(data.message)) message = data.message.join(', ');
    } catch {
      // ignore parse errors
    }
    handlers.onError(message);
    return;
  }

  if (!response.body) {
    handlers.onError('No response body from server');
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split('\n\n');
    buffer = parts.pop() || '';

    for (const part of parts) {
      const lines = part.split('\n');
      let event = 'message';
      let data = '';

      for (const line of lines) {
        if (line.startsWith('event:')) event = line.slice(6).trim();
        if (line.startsWith('data:')) data += line.slice(5).trim();
      }

      if (!data) continue;

      try {
        const payload = JSON.parse(data) as {
          content?: string;
          message?: string;
          ok?: boolean;
        };

        if (event === 'token' && payload.content) {
          handlers.onToken(payload.content);
        } else if (event === 'error') {
          handlers.onError(payload.message || 'Stream error');
          return;
        } else if (event === 'done') {
          handlers.onDone();
          return;
        }
      } catch {
        // skip malformed chunks
      }
    }
  }

  handlers.onDone();
}
