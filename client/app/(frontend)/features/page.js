import Link from "next/link";
import {
  ArrowRight,
  Code2,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import PageHero from "@/components/frontend/PageHero";

export const metadata = {
  title: "Features",
  description:
    "Explore the writing, research, coding, and productivity features in KhostiGPT.",
};

const features = [
  [
    MessageSquareText,
    "Write and create",
    "Draft emails, articles, plans, and ideas with a clear starting point.",
  ],
  [
    Code2,
    "Code and debug",
    "Understand errors, explore solutions, and move from problem to working code.",
  ],
  [
    Search,
    "Research faster",
    "Break down complex topics, compare options, and keep useful context in one conversation.",
  ],
  [
    Zap,
    "Stay productive",
    "Turn everyday questions into focused next steps, decisions, and finished work.",
  ],
  [
    Sparkles,
    "Personal responses",
    "Tune language, model, appearance, and response preferences around your workflow.",
  ],
  [
    ShieldCheck,
    "Your experience",
    "Keep control of your account settings, preferences, and conversations.",
  ],
];

export default function FeaturesPage() {
  return (
    <main className="min-h-dvh bg-[#031017] px-5 text-[#f4f7f5] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <PageHero
          eyebrow="Built for better work"
          title="Everything you need"
          highlight="to move ideas forward."
          description="KhostiGPT brings writing, research, coding, and everyday problem solving into one calm, capable workspace."
          metric="One workspace for the questions that keep you moving."
          visualTitle="A clearer way to work"
          visualText="Your ideas, shaped into useful next steps."
        />
        <section className="grid gap-5 border-b border-white/10 py-14 md:grid-cols-3">
          <div>
            <p className="text-3xl font-semibold text-[#12e9c1]">6+</p>
            <p className="mt-2 text-sm text-white/45">ways to make progress</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[#12e9c1]">One</p>
            <p className="mt-2 text-sm text-white/45">focused AI workspace</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[#12e9c1]">Anytime</p>
            <p className="mt-2 text-sm text-white/45">ready when you are</p>
          </div>
        </section>
        <div className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#12e9c1]">
            Explore the toolkit
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
            Small prompts. Serious momentum.
          </h2>
        </div>
        <section className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title, text]) => (
            <article
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-[#12e9c1]/50"
            >
              <Icon className="h-7 w-7 text-[#12e9c1]" />
              <h2 className="mt-7 text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
            </article>
          ))}
        </section>
        <div className="mt-14">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#18d8dc] to-[#11e9b8] px-6 py-3.5 text-sm font-semibold text-[#021017]"
          >
            Start chatting <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
