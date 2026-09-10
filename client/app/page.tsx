import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Check, Code2, MessageSquareText, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import Logo from '@/components/Logo';

const features = [
  { icon: MessageSquareText, title: 'Think out loud', text: 'Turn rough ideas into clear answers, plans, drafts, and next steps.' },
  { icon: Code2, title: 'Build faster', text: 'Debug code, explain unfamiliar systems, and move from question to solution.' },
  { icon: ShieldCheck, title: 'Stay in control', text: 'Your preferences, conversations, and experience belong to your account.' },
];

const useCases = [
  ['Writing and editing', 'Draft emails, refine your voice, summarize long notes, and turn scattered thoughts into clear communication.'],
  ['Research and learning', 'Break down difficult ideas, compare options, create study plans, and ask follow-up questions naturally.'],
  ['Coding and problem solving', 'Understand errors, explore implementation ideas, and work through technical decisions step by step.'],
  ['Planning and everyday work', 'Build itineraries, organize projects, prepare meetings, and find the next useful action.'],
];

const workflow = [
  ['01', 'Start with the rough idea', 'Type what is on your mind. It does not need to be polished or perfectly structured.'],
  ['02', 'Shape the conversation', 'Ask follow-up questions, add context, and guide the response toward what you actually need.'],
  ['03', 'Leave with something useful', 'Save the conversation, refine the result, and take the next step with more clarity.'],
];

const faqs = [
  ['What can I use KhostiGPT for?', 'You can use it for writing, research, learning, coding, planning, brainstorming, and everyday questions.'],
  ['Do I need an account?', 'You can explore the public page without an account. Create a free account to start conversations and save your preferences.'],
  ['Can I customize the experience?', 'Yes. Your account includes settings for appearance, language, accent color, response preferences, voice, safety, and data controls.'],
  ['Is KhostiGPT free to start?', 'Yes. You can create a free account and begin chatting without entering payment details.'],
];

export const metadata: Metadata = {
  title: 'AI chat for ideas, writing, research, and code',
  description:
    'KhostiGPT is a focused AI assistant for writing, research, coding, and everyday questions.',
};

export default function LandingPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-[#101312] text-[#f4f7f5]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_16%,rgba(16,163,127,0.2),transparent_34%),linear-gradient(135deg,#101312_0%,#15211d_52%,#0b0e0d_100%)]" />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1500px] flex-col px-5 sm:px-8 lg:px-16">
        <header className="flex items-center justify-between border-b border-white/10 py-6 lg:py-7">
          <Link href="/" aria-label="KhostiGPT home"><Logo compact showName /></Link>
          <nav className="flex items-center gap-2" aria-label="Main navigation"><Link href="/login" className="rounded-lg px-3 py-2 text-sm text-white/65 transition hover:bg-white/5 hover:text-white">Log in</Link><Link href="/register" className="rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-[#101312] transition hover:bg-[#d8f4e9]">Get started</Link></nav>
        </header>

        <section className="grid flex-1 items-center gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24 lg:py-28">
          <div className="max-w-3xl"><div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#10a37f]/30 bg-[#10a37f]/10 px-4 py-2 text-sm font-medium text-[#8ee0c5]"><Sparkles className="h-4 w-4" />A calmer way to work with AI</div><h1 className="max-w-4xl text-6xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-8xl lg:text-[clamp(4.5rem,7vw,7.5rem)]">Make your next thought <span className="text-[#66d8b3]">useful.</span></h1><p className="mt-9 max-w-2xl text-xl leading-9 text-white/60 sm:text-2xl">KhostiGPT helps you write, research, code, and reason through the work in front of you, without getting in the way.</p><div className="mt-11 flex flex-wrap items-center gap-4"><Link href="/register" className="group inline-flex items-center gap-2 rounded-xl bg-[#10a37f] px-6 py-4 text-base font-semibold text-white shadow-[0_12px_35px_rgba(16,163,127,0.25)] transition hover:-translate-y-0.5 hover:bg-[#13b88e]">Start chatting free<ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" /></Link><Link href="/login" className="rounded-xl border border-white/15 px-6 py-4 text-base font-medium text-white/75 transition hover:border-white/30 hover:bg-white/5 hover:text-white">I have an account</Link></div><div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/45">{['Fast responses', 'Personal settings', 'No credit card required'].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#66d8b3]" />{item}</span>)}</div></div>

          <div className="relative mx-auto w-full max-w-xl lg:ml-auto"><div className="absolute -inset-8 rounded-[2rem] bg-[#10a37f]/10 blur-3xl" /><div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#1a211e]/90 shadow-2xl backdrop-blur"><div className="flex items-center gap-2 border-b border-white/10 px-6 py-5"><span className="h-3 w-3 rounded-full bg-[#ff6b5f]" /><span className="h-3 w-3 rounded-full bg-[#f2c14e]" /><span className="h-3 w-3 rounded-full bg-[#5ed38c]" /><span className="ml-auto text-sm text-white/35">New conversation</span></div><div className="space-y-8 px-7 py-10 sm:px-9 sm:py-12"><div className="flex gap-4"><span className="mt-1 h-10 w-10 shrink-0 rounded-xl bg-white/10" /><p className="rounded-2xl rounded-tl-sm bg-white/5 px-5 py-4 text-base leading-7 text-white/70">Help me turn this idea into a focused plan.</p></div><div className="flex gap-4"><span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10a37f] text-xs font-bold">AI</span><p className="rounded-2xl rounded-tl-sm border border-[#10a37f]/20 bg-[#10a37f]/10 px-5 py-4 text-base leading-7 text-[#d5f6e9]">Absolutely. Let&apos;s give it shape, priorities, and a first step.</p></div><div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/30"><Zap className="h-4 w-4 text-[#66d8b3]" />Ready when you are</div></div></div></div>
        </section>

        <section className="grid gap-4 border-t border-white/10 py-10 md:grid-cols-3">{features.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-6"><Icon className="mt-0.5 h-6 w-6 shrink-0 text-[#66d8b3]" /><div><h2 className="text-base font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-white/45">{text}</p></div></div>)}</section>

        <section id="use-cases" className="border-t border-white/10 py-20 lg:py-28">
          <div className="max-w-2xl"><p className="text-sm font-medium uppercase tracking-[0.18em] text-[#66d8b3]">Built for the work between ideas</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">One assistant, many useful directions.</h2><p className="mt-5 text-lg leading-8 text-white/50">The best conversations do more than answer a question. They help you understand the problem, make a decision, and keep moving.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">{useCases.map(([title, text]) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-[#10a37f]/40"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/50">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm text-[#66d8b3]">Explore your idea <ArrowRight className="h-4 w-4" /></span></article>)}</div>
        </section>

        <section id="workflow" className="grid gap-12 border-t border-white/10 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <div><p className="text-sm font-medium uppercase tracking-[0.18em] text-[#66d8b3]">A simple workflow</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">From blank page to next step.</h2><p className="mt-5 text-lg leading-8 text-white/50">Keep the conversation natural. KhostiGPT is designed to meet you where your thinking is, then help you make progress.</p></div>
          <div className="space-y-4">{workflow.map(([number, title, text]) => <div key={number} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10a37f]/15 text-sm font-semibold text-[#66d8b3]">{number}</span><div><h3 className="text-base font-semibold">{title}</h3><p className="mt-1.5 text-sm leading-6 text-white/45">{text}</p></div></div>)}</div>
        </section>

        <section id="faq" className="border-t border-white/10 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-medium uppercase tracking-[0.18em] text-[#66d8b3]">Questions, answered</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">A clear start, without the ceremony.</h2></div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">{faqs.map(([question, answer]) => <article key={question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><h3 className="text-base font-semibold">{question}</h3><p className="mt-3 text-sm leading-6 text-white/45">{answer}</p></article>)}</div>
        </section>

        <section className="mb-10 overflow-hidden rounded-[2rem] border border-[#10a37f]/25 bg-[#10a37f]/10 px-6 py-14 text-center sm:px-12 lg:mb-16 lg:py-20"><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Bring the next idea.</h2><p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/55">Create a free account and turn the thought you have been carrying into something you can use.</p><Link href="/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#101312] transition hover:bg-[#d8f4e9]">Get started with KhostiGPT <ArrowRight className="h-4 w-4" /></Link></section>

        <footer className="grid gap-10 border-t border-white/10 py-10 text-sm sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="KhostiGPT home"><Logo compact showName /></Link>
            <p className="mt-4 max-w-xs leading-6 text-white/40">A focused AI assistant for writing, research, coding, and everyday questions.</p>
          </div>
          <div><h3 className="font-semibold text-white/80">Product</h3><div className="mt-4 space-y-3 text-white/45"><a href="#use-cases" className="block transition hover:text-white">Use cases</a><a href="#workflow" className="block transition hover:text-white">How it works</a><a href="#faq" className="block transition hover:text-white">FAQ</a></div></div>
          <div><h3 className="font-semibold text-white/80">Account</h3><div className="mt-4 space-y-3 text-white/45"><Link href="/register" className="block transition hover:text-white">Create account</Link><Link href="/login" className="block transition hover:text-white">Log in</Link></div></div>
          <div><h3 className="font-semibold text-white/80">Get started</h3><p className="mt-4 leading-6 text-white/40">Start with one question. Build from there.</p><Link href="/register" className="mt-4 inline-flex items-center gap-2 text-[#66d8b3] transition hover:text-white">Start chatting <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="border-t border-white/10 pt-6 text-xs text-white/30 sm:col-span-2 lg:col-span-4">© 2026 KhostiGPT. Built for clearer thinking.</div>
        </footer>
      </div>
    </main>
  );
}
