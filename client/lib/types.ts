export type Role = 'user' | 'assistant';

export type Message = {
  id: string;
  role: Role;
  content: string;
  images?: string[];
  createdAt: number;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
  createdAt: number;
};

export function createId(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

export function titleFromMessage(content: string, hasImages = false): string {
  const cleaned = content.replace(/\s+/g, ' ').trim();
  if (!cleaned) return hasImages ? 'Photo' : 'New chat';
  return cleaned.length > 42 ? `${cleaned.slice(0, 42)}…` : cleaned;
}
