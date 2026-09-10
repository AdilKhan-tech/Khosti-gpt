'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check } from 'lucide-react';
import type { Message } from '@/lib/types';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] text-white/60 transition hover:bg-white/10 hover:text-white"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function MessageBubble({
  message,
  isStreaming,
}: {
  message: Message;
  isStreaming?: boolean;
}) {
  const isUser = message.role === 'user';
  const showCursor =
    !isUser && isStreaming && message.content.length > 0;

  return (
    <div
      className={`group flex w-full gap-3 md:gap-4 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#10a37f] text-xs font-bold text-white">
          K
        </div>
      )}

      <div
        className={`max-w-[min(100%,42rem)] ${
          isUser
            ? 'rounded-3xl bg-[#2f2f2f] px-5 py-3 text-[#ececec]'
            : 'min-w-0 flex-1 text-[#ececec]'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-[15px] leading-7">
            {message.content}
          </p>
        ) : (
          <div className="prose-chat relative text-[15px] leading-7">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0 whitespace-pre-wrap">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-3 list-disc space-y-1 pl-5">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-3 list-decimal space-y-1 pl-5">{children}</ol>
                ),
                li: ({ children }) => <li className="leading-7">{children}</li>,
                h1: ({ children }) => (
                  <h1 className="mb-3 mt-4 text-xl font-semibold">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-2 mt-4 text-lg font-semibold">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-2 mt-3 text-base font-semibold">{children}</h3>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#7dcfff] underline underline-offset-2"
                  >
                    {children}
                  </a>
                ),
                code: ({ className, children, ...props }) => {
                  const inline = !className;
                  const text = String(children).replace(/\n$/, '');
                  if (inline) {
                    return (
                      <code
                        className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em]"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <div className="my-3 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">
                      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-1.5">
                        <span className="text-[11px] uppercase tracking-wide text-white/45">
                          {className?.replace('language-', '') || 'code'}
                        </span>
                        <CopyButton text={text} />
                      </div>
                      <pre className="overflow-x-auto p-4">
                        <code className="font-mono text-[13px] leading-6 text-[#e6e6e6]">
                          {text}
                        </code>
                      </pre>
                    </div>
                  );
                },
                blockquote: ({ children }) => (
                  <blockquote className="mb-3 border-l-2 border-white/20 pl-4 text-white/75">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="my-3 overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-white/10 bg-white/5 px-3 py-2 text-left font-medium">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-white/10 px-3 py-2">{children}</td>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
            {showCursor && (
              <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-[#10a37f] align-middle" />
            )}
            {!message.content && isStreaming && (
              <span className="inline-flex gap-1 py-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" />
              </span>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8b5cf6] text-xs font-bold text-white">
          U
        </div>
      )}
    </div>
  );
}

export function MessageList({
  messages,
  isStreaming,
}: {
  messages: Message[];
  isStreaming: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isStreaming]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 md:px-6">
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          isStreaming={
            isStreaming &&
            index === messages.length - 1 &&
            message.role === 'assistant'
          }
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
