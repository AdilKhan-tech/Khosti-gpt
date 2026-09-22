/* eslint-disable react-hooks/refs */
"use client";
import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, Pencil, X } from "lucide-react";
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return _jsxs("button", {
    type: "button",
    onClick: async () => {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    },
    className:
      "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-white/60 transition hover:bg-white/10 hover:text-white",
    children: [
      copied
        ? _jsx(Check, { className: "h-3 w-3" })
        : _jsx(Copy, { className: "h-3 w-3" }),
      copied ? "Copied" : "Copy",
    ],
  });
}
export default function MessageBubble({ message, isStreaming, onEdit }) {
  const isUser = message.role === "user";
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(message.content);
  const showCursor = !isUser && isStreaming && message.content.length > 0;
  return _jsxs("div", {
    className: `group flex w-full gap-3 md:gap-4 ${isUser ? "justify-end" : "justify-start"}`,
    children: [
      !isUser &&
        _jsx("div", {
          className:
            "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#10a37f] text-xs font-bold text-white",
          children: "K",
        }),
      _jsx("div", {
        className: `max-w-[min(100%,42rem)] ${
          isUser
            ? "rounded-3xl bg-[#2f2f2f] px-5 py-3 text-[#ececec]"
            : "min-w-0 flex-1 text-[#ececec]"
        }`,
        children: isUser
          ? editing
            ? _jsxs("div", {
                className: "min-w-[260px] space-y-2",
                children: [
                  _jsx("textarea", {
                    value: draft,
                    onChange: (event) => setDraft(event.target.value),
                    className:
                      "w-full resize-y rounded-lg border border-white/15 bg-black/20 p-2 text-sm text-white outline-none focus:border-[#10a37f]",
                    rows: 3,
                    autoFocus: true,
                  }),
                  _jsxs("div", {
                    className: "flex justify-end gap-2",
                    children: [
                      _jsxs("button", {
                        type: "button",
                        onClick: () => setEditing(false),
                        className:
                          "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-white/60 hover:bg-white/10",
                        children: [_jsx(X, { className: "h-3 w-3" }), "Cancel"],
                      }),
                      _jsx("button", {
                        type: "button",
                        onClick: () => {
                          onEdit?.(draft);
                          setEditing(false);
                        },
                        className:
                          "rounded-md bg-[#10a37f] px-2.5 py-1 text-xs font-medium text-white",
                        children: "Save",
                      }),
                    ],
                  }),
                ],
              })
            : _jsxs(_Fragment, {
                children: [
                  message.images?.map((image, index) =>
                    _jsx(
                      "img",
                      {
                        src: image,
                        alt: "Attached upload",
                        className:
                          "mb-2 max-h-64 max-w-full rounded-xl object-contain",
                      },
                      `${message.id}-${index}`,
                    ),
                  ),
                  _jsx("p", {
                    className: "whitespace-pre-wrap text-[15px] leading-7",
                    children: message.content,
                  }),
                  _jsxs("div", {
                    className:
                      "mt-2 flex justify-end gap-1 opacity-0 transition group-hover:opacity-100",
                    children: [
                      _jsx(CopyButton, { text: message.content }),
                      onEdit &&
                        _jsxs("button", {
                          type: "button",
                          onClick: () => {
                            setDraft(message.content);
                            setEditing(true);
                          },
                          className:
                            "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-white/60 transition hover:bg-white/10 hover:text-white",
                          children: [
                            _jsx(Pencil, { className: "h-3 w-3" }),
                            "Edit",
                          ],
                        }),
                    ],
                  }),
                ],
              })
          : _jsxs("div", {
              className: "prose-chat relative text-[15px] leading-7",
              children: [
                _jsx(ReactMarkdown, {
                  remarkPlugins: [remarkGfm],
                  components: {
                    p: ({ children }) =>
                      _jsx("p", {
                        className: "mb-3 last:mb-0 whitespace-pre-wrap",
                        children: children,
                      }),
                    ul: ({ children }) =>
                      _jsx("ul", {
                        className: "mb-3 list-disc space-y-1 pl-5",
                        children: children,
                      }),
                    ol: ({ children }) =>
                      _jsx("ol", {
                        className: "mb-3 list-decimal space-y-1 pl-5",
                        children: children,
                      }),
                    li: ({ children }) =>
                      _jsx("li", {
                        className: "leading-7",
                        children: children,
                      }),
                    h1: ({ children }) =>
                      _jsx("h1", {
                        className: "mb-3 mt-4 text-xl font-semibold",
                        children: children,
                      }),
                    h2: ({ children }) =>
                      _jsx("h2", {
                        className: "mb-2 mt-4 text-lg font-semibold",
                        children: children,
                      }),
                    h3: ({ children }) =>
                      _jsx("h3", {
                        className: "mb-2 mt-3 text-base font-semibold",
                        children: children,
                      }),
                    a: ({ href, children }) =>
                      _jsx("a", {
                        href: href,
                        target: "_blank",
                        rel: "noreferrer",
                        className:
                          "text-[#7dcfff] underline underline-offset-2",
                        children: children,
                      }),
                    code: ({ className, children, ...props }) => {
                      const inline = !className;
                      const text = String(children).replace(/\n$/, "");
                      if (inline) {
                        return _jsx("code", {
                          className:
                            "rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em]",
                          ...props,
                          children: children,
                        });
                      }
                      return _jsxs("div", {
                        className:
                          "my-3 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]",
                        children: [
                          _jsxs("div", {
                            className:
                              "flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-1.5",
                            children: [
                              _jsx("span", {
                                className:
                                  "text-[11px] uppercase tracking-wide text-white/45",
                                children:
                                  className?.replace("language-", "") || "code",
                              }),
                              _jsx(CopyButton, { text: text }),
                            ],
                          }),
                          _jsx("pre", {
                            className: "overflow-x-auto p-4",
                            children: _jsx("code", {
                              className:
                                "font-mono text-[13px] leading-6 text-[#e6e6e6]",
                              children: text,
                            }),
                          }),
                        ],
                      });
                    },
                    blockquote: ({ children }) =>
                      _jsx("blockquote", {
                        className:
                          "mb-3 border-l-2 border-white/20 pl-4 text-white/75",
                        children: children,
                      }),
                    table: ({ children }) =>
                      _jsx("div", {
                        className: "my-3 overflow-x-auto",
                        children: _jsx("table", {
                          className: "w-full border-collapse text-sm",
                          children: children,
                        }),
                      }),
                    th: ({ children }) =>
                      _jsx("th", {
                        className:
                          "border border-white/10 bg-white/5 px-3 py-2 text-left font-medium",
                        children: children,
                      }),
                    td: ({ children }) =>
                      _jsx("td", {
                        className: "border border-white/10 px-3 py-2",
                        children: children,
                      }),
                  },
                  children: message.content,
                }),
                showCursor &&
                  _jsx("span", {
                    className:
                      "ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-[#10a37f] align-middle",
                  }),
                !message.content &&
                  isStreaming &&
                  _jsxs("span", {
                    className: "inline-flex gap-1 py-1",
                    children: [
                      _jsx("span", {
                        className:
                          "h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:-0.2s]",
                      }),
                      _jsx("span", {
                        className:
                          "h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:-0.1s]",
                      }),
                      _jsx("span", {
                        className:
                          "h-1.5 w-1.5 animate-bounce rounded-full bg-white/50",
                      }),
                    ],
                  }),
              ],
            }),
      }),
      isUser &&
        _jsx("div", {
          className:
            "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8b5cf6] text-xs font-bold text-white",
          children: "U",
        }),
    ],
  });
}
export function MessageList({
  messages,
  isStreaming,
  conversationId,
  onEditMessage,
}) {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isStreaming]);
  return _jsxs("div", {
    className: "mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 md:px-6",
    children: [
      messages.map((message, index) =>
        _jsx(
          MessageBubble,
          {
            message: message,
            onEdit: (content) =>
              onEditMessage(conversationId, message.id, content),
            isStreaming:
              isStreaming &&
              index === messages.length - 1 &&
              message.role === "assistant",
          },
          message.id,
        ),
      ),
      _jsx("div", { ref: bottomRef }),
    ],
  });
}
