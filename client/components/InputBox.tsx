'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Square } from 'lucide-react';
import { useChat } from './ChatProvider';

export default function InputBox() {
  const { sendMessage, isStreaming, stopStreaming } = useChat();
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  const submit = async () => {
    const text = value.trim();
    if (!text || isStreaming) return;
    setValue('');
    await sendMessage(text);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-4 md:px-6 md:pb-6">
      <div className="rounded-[28px] border border-white/10 bg-[#2f2f2f] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] focus-within:border-white/20">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void submit();
            }
          }}
          rows={1}
          placeholder="Message KhostiGPT…"
          className="max-h-[200px] min-h-[44px] w-full resize-none bg-transparent px-3 py-2.5 text-[15px] leading-6 text-[#ececec] outline-none placeholder:text-white/35"
        />
        <div className="flex items-center justify-between gap-2 px-1 pb-1">
          <p className="px-2 text-[11px] text-white/35">
            Enter to send · Shift+Enter for new line
          </p>
          {isStreaming ? (
            <button
              type="button"
              onClick={stopStreaming}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/90"
              aria-label="Stop generating"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void submit()}
              disabled={!value.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition enabled:hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-white/30">
        KhostiGPT can make mistakes. Check important info.
      </p>
    </div>
  );
}
