'use client';

import { Sparkles } from 'lucide-react';

export default function Logo({
  compact = false,
  showName = false,
}: {
  compact?: boolean;
  showName?: boolean;
}) {
  const size = compact ? 'h-9 w-9 rounded-xl' : 'h-12 w-12 rounded-2xl';

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`relative flex shrink-0 items-center justify-center bg-gradient-to-br from-[#27d3a5] via-[#10a37f] to-[#08745d] text-white shadow-[0_10px_30px_rgba(16,163,127,0.3)] ${size}`}
      >
        <span className="absolute inset-1 rounded-[inherit] border border-white/25" />
        <Sparkles
          className={compact ? 'h-5 w-5' : 'h-6 w-6'}
          strokeWidth={2.2}
        />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-white/90" />
      </span>
      {showName && <span className="font-semibold tracking-tight">KhostiGPT</span>}
    </span>
  );
}
