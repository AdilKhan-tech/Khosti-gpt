'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { streamChat } from '@/lib/api';
import { loadConversations, saveConversations } from '@/lib/storage';
import {
  createId,
  titleFromMessage,
  type Conversation,
  type Message,
} from '@/lib/types';
import { useAuth } from './AuthProvider';

type ChatContextValue = {
  conversations: Conversation[];
  activeId: string | null;
  activeConversation: Conversation | null;
  isStreaming: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  createConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, title: string) => void;
  sendMessage: (content: string) => Promise<void>;
  stopStreaming: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

function emptyConversation(): Conversation {
  const now = Date.now();
  return {
    id: createId('chat'),
    title: 'New chat',
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const { token, user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const loaded = loadConversations();
    if (loaded.length > 0) {
      setConversations(loaded);
      setActiveId(loaded[0].id);
    } else {
      const first = emptyConversation();
      setConversations([first]);
      setActiveId(first.id);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveConversations(conversations);
  }, [conversations, hydrated]);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId) || null,
    [conversations, activeId],
  );

  const updateConversation = useCallback(
    (id: string, updater: (c: Conversation) => Conversation) => {
      setConversations((prev) =>
        prev
          .map((c) => (c.id === id ? updater(c) : c))
          .sort((a, b) => b.updatedAt - a.updatedAt),
      );
    },
    [],
  );

  const createConversation = useCallback(() => {
    const next = emptyConversation();
    setConversations((prev) => [next, ...prev]);
    setActiveId(next.id);
    setSidebarOpen(false);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveId(id);
    setSidebarOpen(false);
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id);
        if (next.length === 0) {
          const fresh = emptyConversation();
          setActiveId(fresh.id);
          return [fresh];
        }
        if (activeId === id) {
          setActiveId(next[0].id);
        }
        return next;
      });
    },
    [activeId],
  );

  const renameConversation = useCallback((id: string, title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    updateConversation(id, (c) => ({
      ...c,
      title: trimmed,
      updatedAt: Date.now(),
    }));
  }, [updateConversation]);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const text = content.trim();
      if (!text || isStreaming) return;

      let conversationId = activeId;
      let baseMessages: Message[] = [];

      if (!conversationId) {
        const fresh = emptyConversation();
        conversationId = fresh.id;
        setConversations((prev) => [fresh, ...prev]);
        setActiveId(fresh.id);
      } else {
        baseMessages =
          conversations.find((c) => c.id === conversationId)?.messages || [];
      }

      const userMessage: Message = {
        id: createId('msg'),
        role: 'user',
        content: text,
        createdAt: Date.now(),
      };

      const assistantMessage: Message = {
        id: createId('msg'),
        role: 'assistant',
        content: '',
        createdAt: Date.now(),
      };

      const nextMessages = [...baseMessages, userMessage, assistantMessage];

      updateConversation(conversationId, (c) => ({
        ...c,
        title:
          c.messages.length === 0 ? titleFromMessage(text) : c.title,
        messages: nextMessages,
        updatedAt: Date.now(),
      }));

      const controller = new AbortController();
      abortRef.current = controller;
      setIsStreaming(true);

      try {
        await streamChat(
          nextMessages
            .filter((m) => m.id !== assistantMessage.id)
            .map((m) => ({ role: m.role, content: m.content })),
          {
            onToken: (chunk) => {
              updateConversation(conversationId!, (c) => ({
                ...c,
                messages: c.messages.map((m) =>
                  m.id === assistantMessage.id
                    ? { ...m, content: m.content + chunk }
                    : m,
                ),
                updatedAt: Date.now(),
              }));
            },
            onDone: () => {
              setIsStreaming(false);
              abortRef.current = null;
            },
            onError: (message) => {
              updateConversation(conversationId!, (c) => ({
                ...c,
                messages: c.messages.map((m) =>
                  m.id === assistantMessage.id
                    ? {
                        ...m,
                        content:
                          m.content ||
                          `Sorry — I couldn’t reply.\n\n**Error:** ${message}`,
                      }
                    : m,
                ),
                updatedAt: Date.now(),
              }));
              setIsStreaming(false);
              abortRef.current = null;
            },
          },
          {
            signal: controller.signal,
            token,
            model: user?.model,
          },
        );
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          updateConversation(conversationId!, (c) => ({
            ...c,
            messages: c.messages.map((m) =>
              m.id === assistantMessage.id
                ? {
                    ...m,
                    content:
                      m.content ||
                      'Sorry — something went wrong connecting to the server.',
                  }
                : m,
            ),
            updatedAt: Date.now(),
          }));
        }
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [activeId, conversations, isStreaming, token, updateConversation, user?.model],
  );

  const value: ChatContextValue = {
    conversations,
    activeId,
    activeConversation,
    isStreaming,
    sidebarOpen,
    setSidebarOpen,
    createConversation,
    selectConversation,
    deleteConversation,
    renameConversation,
    sendMessage,
    stopStreaming,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
