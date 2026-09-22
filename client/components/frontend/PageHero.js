import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  actionLabel = "Get started",
  actionHref = "/register",
  metric,
  visualTitle,
  visualText,
}) {
  return (
    <section className="grid items-center gap-14 border-b border-white/10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:py-24">
      <div className="max-w-2xl">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#00dcb9]/40 bg-[#00dcb9]/10 px-4 py-2 text-sm font-medium text-[#55f0d0]">
          <Sparkles className="h-4 w-4" />
          {eyebrow}
        </div>
        <h1 className="text-5xl font-semibold leading-[1.03] tracking-tight sm:text-7xl">
          {title}
          <br />
          <span className="bg-gradient-to-r from-[#08bfff] via-[#00d9cd] to-[#08ed9c] bg-clip-text text-transparent">
            {highlight}
          </span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[#c1d2dc] sm:text-xl">
          {description}
        </p>
        <Link
          href={actionHref}
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#18d8dc] to-[#11e9b8] px-7 py-4 text-sm font-semibold text-[#021017] shadow-[0_0_35px_rgba(18,233,193,0.25)] transition hover:brightness-110"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {metric && (
          <p className="mt-7 text-sm text-white/50">
            <span className="mr-2 text-[#12e9c1]">●</span>
            {metric}
          </p>
        )}
      </div>
      <div className="relative mx-auto w-full max-w-2xl">
        <div className="absolute inset-10 rounded-full bg-[#00dcb9]/20 blur-3xl" />
        <div className="relative overflow-hidden rounded-2xl border border-[#00dcb9]/60 bg-[#08141c] shadow-[0_0_50px_rgba(0,220,185,0.2)]">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#0b1821] px-5 py-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-auto text-xs text-white/40">
              KhostiGPT workspace
            </span>
          </div>
          <div className="min-h-[290px] p-7 sm:min-h-[350px]">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00dcb9]/15 text-xl font-bold text-[#12e9c1]">
                K
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  {visualTitle}
                </p>
                <p className="mt-1 text-xs text-white/40">{visualText}</p>
              </div>
            </div>
            <div className="mt-9 space-y-3">
              <div className="h-3 w-4/5 rounded-full bg-white/10" />
              <div className="h-3 w-3/5 rounded-full bg-[#00dcb9]/30" />
              <div className="h-3 w-2/3 rounded-full bg-white/10" />
            </div>
            <div className="mt-12 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <span className="text-lg font-semibold text-[#12e9c1]">
                  24/7
                </span>
                <small className="mt-1 block text-[10px] text-white/40">
                  Available
                </small>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <span className="text-lg font-semibold text-[#12e9c1]">
                  Fast
                </span>
                <small className="mt-1 block text-[10px] text-white/40">
                  Responses
                </small>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <span className="text-lg font-semibold text-[#12e9c1]">
                  Smart
                </span>
                <small className="mt-1 block text-[10px] text-white/40">
                  Context
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
