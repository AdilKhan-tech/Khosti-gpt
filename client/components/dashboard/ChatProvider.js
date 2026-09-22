/* eslint-disable react-hooks/refs */
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { streamChat } from "@/lib/api";
import { loadConversations, saveConversations } from "@/lib/storage";
import { createId, titleFromMessage } from "@/lib/types";
import { useAuth } from "../providers/AuthProvider";
const ChatContext = createContext(null);
function emptyConversation() {
  const now = Date.now();
  return {
    id: createId("chat"),
    title: "New chat",
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}
function initialConversations() {
  const loaded = loadConversations();
  return loaded.length > 0 ? loaded : [emptyConversation()];
}
export function ChatProvider({ children }) {
  const { token, user } = useAuth();
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(
    () => initialConversations()[0]?.id || null,
  );
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hydrated] = useState(true);
  const abortRef = useRef(null);
  useEffect(() => {
    if (!hydrated) return;
    saveConversations(conversations);
  }, [conversations, hydrated]);
  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId) || null,
    [conversations, activeId],
  );
  const updateConversation = useCallback((id, updater) => {
    setConversations((prev) =>
      prev
        .map((c) => (c.id === id ? updater(c) : c))
        .sort((a, b) => b.updatedAt - a.updatedAt),
    );
  }, []);
  const createConversation = useCallback(() => {
    const next = emptyConversation();
    setConversations((prev) => [next, ...prev]);
    setActiveId(next.id);
    setSidebarOpen(false);
  }, []);
  const selectConversation = useCallback((id) => {
    setActiveId(id);
    setSidebarOpen(false);
  }, []);
  const deleteConversation = useCallback(
    (id) => {
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
  const renameConversation = useCallback(
    (id, title) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      updateConversation(id, (c) => ({
        ...c,
        title: trimmed,
        updatedAt: Date.now(),
      }));
    },
    [updateConversation],
  );
  const editMessage = useCallback(
    (conversationId, messageId, content) => {
      const trimmed = content.trim();
      if (!trimmed) return;
      updateConversation(conversationId, (conversation) => {
        const messageIndex = conversation.messages.findIndex(
          (message) => message.id === messageId,
        );
        if (messageIndex < 0) return conversation;
        return {
          ...conversation,
          title:
            messageIndex === 0 ? titleFromMessage(trimmed) : conversation.title,
          messages: conversation.messages
            .slice(0, messageIndex + 1)
            .map((message) =>
              message.id === messageId
                ? { ...message, content: trimmed }
                : message,
            ),
          updatedAt: Date.now(),
        };
      });
    },
    [updateConversation],
  );
  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);
  const sendMessage = useCallback(
    async (content, images = []) => {
      const text = content.trim();
      if (!text || isStreaming) return;
      let conversationId = activeId;
      let baseMessages = [];
      if (!conversationId) {
        const fresh = emptyConversation();
        conversationId = fresh.id;
        setConversations((prev) => [fresh, ...prev]);
        setActiveId(fresh.id);
      } else {
        baseMessages =
          conversations.find((c) => c.id === conversationId)?.messages || [];
      }
      const userMessage = {
        id: createId("msg"),
        role: "user",
        content: text,
        ...(images.length ? { images } : {}),
        createdAt: Date.now(),
      };
      const assistantMessage = {
        id: createId("msg"),
        role: "assistant",
        content: "",
        createdAt: Date.now(),
      };
      const nextMessages = [...baseMessages, userMessage, assistantMessage];
      updateConversation(conversationId, (c) => ({
        ...c,
        title: c.messages.length === 0 ? titleFromMessage(text) : c.title,
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
            .map((m) => ({
              role: m.role,
              content: m.content,
              images: m.images,
            })),
          {
            onToken: (chunk) => {
              updateConversation(conversationId, (c) => ({
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
              updateConversation(conversationId, (c) => ({
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
        if (error.name !== "AbortError") {
          updateConversation(conversationId, (c) => ({
            ...c,
            messages: c.messages.map((m) =>
              m.id === assistantMessage.id
                ? {
                    ...m,
                    content:
                      m.content ||
                      "Sorry — something went wrong connecting to the server.",
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
    [activeId, conversations, isStreaming, token, updateConversation, user],
  );
  const value = {
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
    editMessage,
    sendMessage,
    stopStreaming,
  };
  return _jsx(ChatContext.Provider, { value: value, children: children });
}
export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
