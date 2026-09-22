"use client";
import Image from "next/image";
export default function Logo({ compact = false, showName = false }) {
  const size = compact ? "h-10 w-10 rounded-xl" : "h-14 w-14 rounded-2xl";
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={`relative block shrink-0 overflow-hidden ${size}`}>
        <Image
          src="/assets/images/logo.png"
          alt="KhostiGPT"
          fill
          sizes={compact ? "40px" : "56px"}
          className="object-contain"
          priority={compact}
        />
      </span>
      {showName && (
        <span className="font-semibold tracking-tight">KhostiGPT</span>
      )}
    </span>
  );
}
