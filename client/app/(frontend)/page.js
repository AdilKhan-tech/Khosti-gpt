import Link from "next/link";
import {
  ArrowRight,
  Code2,
  MessageSquareText,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Logo from "@/components/frontend/Logo";

const features = [
  {
    icon: MessageSquareText,
    title: "Think out loud",
    text: "Turn rough ideas into clear answers, plans, drafts, and next steps.",
  },
  {
    icon: Code2,
    title: "Build faster",
    text: "Debug code, explain unfamiliar systems, and move from question to solution.",
  },
  {
    icon: ShieldCheck,
    title: "Stay in control",
    text: "Your preferences, conversations, and experience belong to your account.",
  },
];

const useCases = [
  [
    "Writing and editing",
    "Draft emails, refine your voice, summarize long notes, and turn scattered thoughts into clear communication.",
  ],
  [
    "Research and learning",
    "Break down difficult ideas, compare options, create study plans, and ask follow-up questions naturally.",
  ],
  [
    "Coding and problem solving",
    "Understand errors, explore implementation ideas, and work through technical decisions step by step.",
  ],
  [
    "Planning and everyday work",
    "Build itineraries, organize projects, prepare meetings, and find the next useful action.",
  ],
];

const workflow = [
  [
    "01",
    "Start with the rough idea",
    "Type what is on your mind. It does not need to be polished or perfectly structured.",
  ],
  [
    "02",
    "Shape the conversation",
    "Ask follow-up questions, add context, and guide the response toward what you actually need.",
  ],
  [
    "03",
    "Leave with something useful",
    "Save the conversation, refine the result, and take the next step with more clarity.",
  ],
];

const faqs = [
  [
    "What can I use KhostiGPT for?",
    "You can use it for writing, research, learning, coding, planning, brainstorming, and everyday questions.",
  ],
  [
    "Do I need an account?",
    "You can explore the public page without an account. Create a free account to start conversations and save your preferences.",
  ],
  [
    "Can I customize the experience?",
    "Yes. Your account includes settings for appearance, language, accent color, response preferences, voice, safety, and data controls.",
  ],
  [
    "Is KhostiGPT free to start?",
    "Yes. You can create a free account and begin chatting without entering payment details.",
  ],
];

export const metadata = {
  title: "AI chat for ideas, writing, research, and code",
  description:
    "KhostiGPT is a focused AI assistant for writing, research, coding, and everyday questions.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI chat for ideas, writing, research, and code",
    description:
      "KhostiGPT is a focused AI assistant for writing, research, coding, and everyday questions.",
    url: "/",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-[#031017] text-[#f4f7f5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "KhostiGPT",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "A focused AI assistant for writing, research, coding, and everyday questions.",
            url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          }),
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_34%,rgba(0,224,191,0.17),transparent_30%),linear-gradient(135deg,#031017_0%,#06151d_55%,#021017_100%)]" />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1600px] flex-col px-5 sm:px-8 lg:px-16">
        <section
          id="home"
          className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:py-20"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#00dcb9]/40 bg-[#00dcb9]/10 px-4 py-2 text-sm font-medium text-[#55f0d0]">
              <Sparkles className="h-4 w-4" />
              Powered by Advanced AI
            </div>
            <h1 className="text-5xl font-semibold leading-[1.03] tracking-tight sm:text-7xl lg:text-[clamp(4rem,6vw,6.5rem)]">
              Your AI Assistant
              <br />
              <span className="bg-gradient-to-r from-[#08bfff] via-[#00d9cd] to-[#08ed9c] bg-clip-text text-transparent">
                for a Smarter Tomorrow
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#c1d2dc] sm:text-xl">
              KhostiGPT helps you write, research, code, and solve problems with
              the power of AI. Fast, reliable, and always ready when you are.
            </p>
            <div className="mt-9 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                [Sparkles, "Write & Create", "Emails, blogs, ideas"],
                [Code2, "Code & Debug", "Better, faster, smarter"],
                [Search, "Research", "Get accurate answers"],
                [Zap, "Be More Productive", "Save time, do more"],
              ].map(([Icon, title, text]) => (
                <div key={title} className="flex items-start gap-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00dcb9]/15 text-[#00e6c0]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <b className="block text-xs text-white">{title}</b>
                    <small className="mt-1 block text-[10px] text-white/50">
                      {text}
                    </small>
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#18d8dc] to-[#11e9b8] px-7 py-4 text-sm font-semibold text-[#021017] shadow-[0_0_35px_rgba(18,233,193,0.25)] transition hover:brightness-110"
              >
                <MessageSquareText className="h-5 w-5" />
                Start Chatting
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#use-cases"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white transition hover:border-[#12e9c1]"
              >
                <Play className="h-4 w-4" />
                Watch Demo
              </a>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-white/55">
              <span className="flex -space-x-2">
                <span className="h-7 w-7 rounded-full border-2 border-[#031017] bg-[#edb090]" />
                <span className="h-7 w-7 rounded-full border-2 border-[#031017] bg-[#a5d4c8]" />
                <span className="h-7 w-7 rounded-full border-2 border-[#031017] bg-[#c596cf]" />
              </span>
              <span className="h-2 w-2 rounded-full bg-[#19df9e]" />
              Trusted by thousands of users
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-3xl lg:-mr-12">
            <div className="absolute inset-10 rounded-full bg-[#00dcb9]/20 blur-3xl" />
            <div className="absolute -inset-4 rounded-[45%] border border-[#00dcb9]/30 bg-[#00dcb9]/10 blur-[1px] [transform:rotate(-14deg)]" />
            <div className="relative rotate-[2deg] overflow-hidden rounded-2xl border border-[#00dcb9]/70 bg-[#08141c] shadow-[0_0_50px_rgba(0,220,185,0.2)]">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#0b1821] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-auto text-[10px] text-white/40">
                  KhostiGPT
                </span>
              </div>
              <div className="grid min-h-[340px] grid-cols-[145px_1fr] sm:min-h-[430px] sm:grid-cols-[185px_1fr]">
                <aside className="border-r border-white/10 bg-[#07121a] p-3 text-[10px] text-white/55">
                  <div className="mb-5 flex items-center gap-2 text-white">
                    <Logo compact />
                    <b>KhostiGPT</b>
                  </div>
                  <div className="space-y-1">
                    <div className="rounded-lg bg-white/10 px-2 py-2 text-[#1be5c0]">
                      ▣ New Chat
                    </div>
                    <div className="px-2 py-2">⌕ Search</div>
                    <div className="px-2 py-2">▢ Library</div>
                    <div className="px-2 py-2">♧ Tools</div>
                  </div>
                  <p className="mt-7 px-2 text-[9px] uppercase text-white/30">
                    Recent Chats
                  </p>
                  <div className="mt-2 space-y-3 px-2 text-[9px]">
                    <div>◌ Website Development Help</div>
                    <div>◌ Python Learning Plan</div>
                    <div>◌ Marketing Strategy</div>
                    <div>◌ Study Plan</div>
                  </div>
                </aside>
                <div className="relative flex flex-col items-center justify-center p-5 text-center">
                  <div className="absolute left-5 top-4 text-xs text-white/75">
                    KhostiGPT
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00dcb9]/20 text-2xl font-bold text-[#12e9c1] shadow-[0_0_25px_rgba(0,220,185,0.35)]">
                    K
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white sm:text-2xl">
                    Hello, I&apos;m KhostiGPT
                  </h3>
                  <p className="mt-2 text-xs text-white/45">
                    How can I help you today?
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-2 text-[9px] text-white/60">
                    <span className="rounded-full border border-white/15 px-3 py-2">
                      Write a blog post
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-2">
                      Explain a concept
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-2">
                      Help me code
                    </span>
                  </div>
                  <div className="mt-10 flex w-full items-center rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-left text-[10px] text-white/30">
                    Type your message here...
                    <span className="ml-auto rounded-lg bg-[#13dfbd] px-3 py-2 text-base text-[#021017]">
                      ›
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-2 rounded-xl border border-[#00dcb9]/35 bg-[#092229]/90 px-4 py-3 shadow-[0_0_25px_rgba(0,220,185,0.2)]">
              <b className="flex items-center gap-2 text-xs text-white">
                <Zap className="h-4 w-4 text-[#16e8be]" />
                Fast &amp; Reliable
              </b>
              <small className="ml-6 text-[10px] text-white/50">
                Get instant responses
              </small>
            </div>
            <div className="absolute -bottom-5 -left-4 rounded-xl border border-[#00dcb9]/35 bg-[#092229]/90 px-4 py-3 shadow-[0_0_25px_rgba(0,220,185,0.2)]">
              <b className="flex items-center gap-2 text-xs text-white">
                <Sparkles className="h-4 w-4 text-[#16e8be]" />
                Smart
              </b>
              <small className="ml-6 text-[10px] text-white/50">
                Powered by latest AI models
              </small>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#12e9c1]">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Everything You Need, In One Place
          </h2>
          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#66d8b3]" />
                <div>
                  <h2 className="text-base font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/45">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="use-cases"
          className="border-t border-white/10 py-20 lg:py-28"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#66d8b3]">
              Built for the work between ideas
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              One assistant, many useful directions.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/50">
              The best conversations do more than answer a question. They help
              you understand the problem, make a decision, and keep moving.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {useCases.map(([title, text]) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-[#10a37f]/40"
              >
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#66d8b3]">
                  Explore your idea <ArrowRight className="h-4 w-4" />
                </span>
              </article>
            ))}
          </div>
        </section>

        <section
          id="workflow"
          className="grid gap-12 border-t border-white/10 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28"
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#66d8b3]">
              A simple workflow
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              From blank page to next step.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/50">
              Keep the conversation natural. KhostiGPT is designed to meet you
              where your thinking is, then help you make progress.
            </p>
          </div>
          <div className="space-y-4">
            {workflow.map(([number, title, text]) => (
              <div
                key={number}
                className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10a37f]/15 text-sm font-semibold text-[#66d8b3]">
                  {number}
                </span>
                <div>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-white/45">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="border-t border-white/10 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#66d8b3]">
              Questions, answered
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              A clear start, without the ceremony.
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <article
                key={question}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="text-base font-semibold">{question}</h3>
                <p className="mt-3 text-sm leading-6 text-white/45">{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 overflow-hidden rounded-[2rem] border border-[#10a37f]/25 bg-[#10a37f]/10 px-6 py-14 text-center sm:px-12 lg:mb-16 lg:py-20">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Bring the next idea.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/55">
            Create a free account and turn the thought you have been carrying
            into something you can use.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#101312] transition hover:bg-[#d8f4e9]"
          >
            Get started with KhostiGPT <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
