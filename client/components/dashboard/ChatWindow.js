/* eslint-disable react-hooks/refs */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  Paperclip,
  Image as ImageIcon,
  Mic,
  X,
  Send,
  Plus,
  File,
  Link,
  Smile,
} from "lucide-react";
import { useChat } from "./ChatProvider";
import { useAuth } from "../providers/AuthProvider";
import { MessageList } from "./MessageBubble";
import Logo from "../frontend/Logo";
const SUGGESTIONS = [
  "Explain quantum computing simply",
  "Write a short product launch email",
  "Help me debug a React useEffect bug",
  "Plan a 3-day trip to Hunza",
];
export default function ChatWindow() {
  const {
    activeConversation,
    isStreaming,
    sendMessage,
    createConversation,
    editMessage,
  } = useChat();
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const attachMenuRef = useRef(null);
  const textareaRef = useRef(null);
  const imagePreviews = useMemo(() => {
    const previews = {};
    attachments.forEach((file) => {
      if (file.type.startsWith("image/")) {
        previews[`${file.name}-${file.size}-${file.lastModified}`] =
          URL.createObjectURL(file);
      }
    });
    return previews;
  }, [attachments]);
  useEffect(
    () => () =>
      Object.values(imagePreviews).forEach((url) => URL.revokeObjectURL(url)),
    [imagePreviews],
  );
  const messages = activeConversation?.messages || [];
  const isEmpty = messages.length === 0;
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputValue]);
  // Close attach menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        attachMenuRef.current &&
        !attachMenuRef.current.contains(event.target)
      ) {
        setShowAttachMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  const prepareImage = async (file) => {
    const source = await fileToDataUrl(file);
    const image = new Image();
    image.src = source;
    await new Promise((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error(`Could not read ${file.name}`));
    });
    const maxSide = 1600;
    const scale = Math.min(
      1,
      maxSide / Math.max(image.naturalWidth, image.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    canvas
      .getContext("2d")
      ?.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.82);
  };
  const handleSend = async () => {
    if (inputValue.trim() || attachments.length > 0) {
      const message = inputValue.trim() || "Check this out";
      const images = await Promise.all(
        attachments
          .filter((file) => file.type.startsWith("image/"))
          .map(prepareImage),
      );
      await sendMessage(message, images);
      setInputValue("");
      setAttachments([]);
      setShowAttachMenu(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
    setShowAttachMenu(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };
  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };
  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return ImageIcon;
    return File;
  };
  return _jsxs("main", {
    className:
      "relative flex min-h-0 min-w-0 flex-1 flex-col bg-[#212121] text-[#ececec]",
    children: [
      _jsxs("header", {
        className:
          "flex h-14 shrink-0 items-center justify-between border-b border-white/5 px-4 md:px-6",
        children: [
          _jsxs("div", {
            className: "flex items-center gap-2 pl-10 md:pl-0",
            children: [
              _jsx("span", {
                className: "text-sm font-semibold tracking-tight",
                children: activeConversation?.title || "New chat",
              }),
              _jsx("span", {
                className:
                  "hidden rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white/45 sm:inline",
                children: user?.model || "GPT-4o mini",
              }),
            ],
          }),
          _jsx("div", {
            className: "flex items-center gap-2",
            children: _jsxs("button", {
              type: "button",
              onClick: createConversation,
              className:
                "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white",
              children: [_jsx(Plus, { className: "h-4 w-4" }), "New chat"],
            }),
          }),
        ],
      }),
      _jsx("div", {
        className:
          "min-h-0 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent",
        children: isEmpty
          ? _jsxs("div", {
              className:
                "mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center px-4 py-10 md:px-6",
              children: [
                _jsx("div", {
                  className: "mb-6 animate-in zoom-in duration-500",
                  children: _jsx(Logo, {}),
                }),
                _jsx("h1", {
                  className:
                    "mb-2 text-center text-3xl font-semibold tracking-tight animate-in slide-in-from-bottom-4 duration-500 delay-100",
                  children: "KhostiGPT",
                }),
                _jsx("p", {
                  className:
                    "mb-10 max-w-md text-center text-sm text-white/50 animate-in slide-in-from-bottom-4 duration-500 delay-200",
                  children:
                    "Ask anything \u2014 chat streams live, just like KhostiGPT.",
                }),
                _jsx("div", {
                  className:
                    "grid w-full gap-3 sm:grid-cols-2 animate-in slide-in-from-bottom-4 duration-500 delay-300",
                  children: SUGGESTIONS.map((suggestion) =>
                    _jsx(
                      "button",
                      {
                        type: "button",
                        disabled: isStreaming,
                        onClick: () => void sendMessage(suggestion),
                        className:
                          "group rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-left text-sm text-white/75 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white disabled:opacity-50",
                        children: _jsxs("span", {
                          className: "relative",
                          children: [
                            suggestion,
                            _jsx("span", {
                              className:
                                "absolute -right-1 -top-1 text-[10px] text-white/20 opacity-0 transition-opacity group-hover:opacity-100",
                              children: "\u2192",
                            }),
                          ],
                        }),
                      },
                      suggestion,
                    ),
                  ),
                }),
              ],
            })
          : _jsx(MessageList, {
              messages: messages,
              isStreaming: isStreaming,
              conversationId: activeConversation?.id || "",
              onEditMessage: editMessage,
            }),
      }),
      _jsx("div", {
        className: "border-t border-white/5 bg-[#1a1a1a] px-4 py-4",
        children: _jsxs("div", {
          className: "mx-auto max-w-3xl",
          children: [
            attachments.length > 0 &&
              _jsx("div", {
                className: "mb-2 flex flex-wrap gap-2",
                children: attachments.map((file, index) => {
                  const Icon = getFileIcon(file);
                  const isImage = file.type.startsWith("image/");
                  return _jsxs(
                    "div",
                    {
                      className:
                        "group relative flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm",
                      children: [
                        isImage
                          ? _jsx("img", {
                              src: imagePreviews[
                                `${file.name}-${file.size}-${file.lastModified}`
                              ],
                              alt: file.name,
                              className: "h-8 w-8 rounded object-cover",
                            })
                          : _jsx(Icon, { className: "h-4 w-4 text-white/40" }),
                        _jsx("span", {
                          className:
                            "max-w-[120px] truncate text-white/80 text-xs",
                          children: file.name,
                        }),
                        _jsx("span", {
                          className: "text-[10px] text-white/30",
                          children: formatFileSize(file.size),
                        }),
                        _jsx("button", {
                          type: "button",
                          onClick: () => removeAttachment(index),
                          className:
                            "absolute -right-1 -top-1 rounded-full bg-[#2a2a2a] p-0.5 text-white/50 hover:bg-white/10 hover:text-white",
                          children: _jsx(X, { className: "h-3 w-3" }),
                        }),
                      ],
                    },
                    index,
                  );
                }),
              }),
            _jsxs("div", {
              className:
                "relative flex items-end gap-2 rounded-2xl border border-white/10 bg-[#212121] px-3 py-2 focus-within:border-[#10a37f]/50 focus-within:shadow-[0_0_0_4px_rgba(16,163,127,0.1)] transition-all",
              children: [
                _jsxs("div", {
                  className: "relative",
                  ref: attachMenuRef,
                  children: [
                    _jsx("button", {
                      type: "button",
                      onClick: () => setShowAttachMenu(!showAttachMenu),
                      className:
                        "rounded-lg p-2 text-white/40 transition hover:bg-white/10 hover:text-white",
                      "aria-label": "Attach file",
                      children: _jsx(Paperclip, {
                        className: "h-5 w-5",
                        strokeWidth: 1.5,
                      }),
                    }),
                    showAttachMenu &&
                      _jsxs("div", {
                        className:
                          "absolute bottom-full left-0 mb-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#2a2a2a] p-1 shadow-2xl shadow-black/50 animate-in fade-in-0 zoom-in-95",
                        children: [
                          _jsxs("button", {
                            type: "button",
                            onClick: () => imageInputRef.current?.click(),
                            className:
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors",
                            children: [
                              _jsx(ImageIcon, {
                                className: "h-4 w-4 text-white/40",
                              }),
                              _jsx("span", { children: "Upload image" }),
                            ],
                          }),
                          _jsxs("button", {
                            type: "button",
                            onClick: () => fileInputRef.current?.click(),
                            className:
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors",
                            children: [
                              _jsx(File, {
                                className: "h-4 w-4 text-white/40",
                              }),
                              _jsx("span", { children: "Upload file" }),
                            ],
                          }),
                          _jsxs("button", {
                            type: "button",
                            className:
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors",
                            children: [
                              _jsx(Link, {
                                className: "h-4 w-4 text-white/40",
                              }),
                              _jsx("span", { children: "Add link" }),
                            ],
                          }),
                          _jsx("div", {
                            className: "border-t border-white/5 my-1",
                          }),
                          _jsxs("button", {
                            type: "button",
                            className:
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors",
                            children: [
                              _jsx(Smile, {
                                className: "h-4 w-4 text-white/40",
                              }),
                              _jsx("span", { children: "Add emoji" }),
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
                _jsx("textarea", {
                  ref: textareaRef,
                  value: inputValue,
                  onChange: (e) => setInputValue(e.target.value),
                  onKeyDown: handleKeyDown,
                  placeholder:
                    attachments.length > 0
                      ? "Add a message..."
                      : "Message KhostiGPT...",
                  className:
                    "max-h-[200px] min-h-[24px] flex-1 resize-none bg-transparent py-1.5 text-sm text-white outline-none placeholder:text-white/30",
                  rows: 1,
                  disabled: isStreaming,
                }),
                _jsx("div", {
                  className: "flex items-center gap-1",
                  children:
                    inputValue.trim() || attachments.length > 0
                      ? _jsx("button", {
                          type: "button",
                          onClick: handleSend,
                          disabled: isStreaming,
                          className:
                            "rounded-lg bg-[#10a37f] p-2 text-white transition hover:bg-[#0d8c6c] disabled:opacity-50",
                          "aria-label": "Send message",
                          children: _jsx(Send, {
                            className: "h-4 w-4",
                            strokeWidth: 2,
                          }),
                        })
                      : user?.dictation
                        ? _jsx("button", {
                            type: "button",
                            onClick: () => setIsRecording(!isRecording),
                            className: `rounded-lg p-2 transition ${
                              isRecording
                                ? "bg-red-500/20 text-red-400 animate-pulse"
                                : "text-white/40 hover:bg-white/10 hover:text-white"
                            }`,
                            "aria-label": "Voice input",
                            children: _jsx(Mic, {
                              className: "h-5 w-5",
                              strokeWidth: 1.5,
                            }),
                          })
                        : null,
                }),
              ],
            }),
            _jsx("p", {
              className: "mt-2 text-center text-[10px] text-white/20",
              children:
                "KhostiGPT can make mistakes. Consider checking important information.",
            }),
          ],
        }),
      }),
      _jsx("input", {
        ref: imageInputRef,
        type: "file",
        accept: "image/*",
        multiple: true,
        onChange: handleFileSelect,
        className: "hidden",
      }),
      _jsx("input", {
        ref: fileInputRef,
        type: "file",
        multiple: true,
        onChange: handleFileSelect,
        className: "hidden",
      }),
    ],
  });
}
