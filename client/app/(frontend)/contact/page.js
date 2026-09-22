import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import PageHero from "@/components/frontend/PageHero";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the KhostiGPT team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-dvh bg-[#031017] px-5 text-[#f4f7f5] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <PageHero
          eyebrow="We are here to help"
          title="Let's keep the"
          highlight="conversation useful."
          description="Have a question, feedback, or an idea for KhostiGPT? Reach out and we'll help you find the right next step."
          metric="Questions, feedback, and ideas are always welcome."
          visualTitle="Support that starts clearly"
          visualText="Tell us what you need and where you are stuck."
        />
        <section className="grid gap-8 border-b border-white/10 py-14 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#12e9c1]">
              Before you write
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              A little context helps us help faster.
            </h2>
          </div>
          <p className="text-base leading-8 text-white/50">
            Share what you are trying to accomplish, what you have tried, and
            the next outcome you want. We will point you toward the most useful
            path.
          </p>
        </section>
        <section className="mt-14 grid gap-4 md:grid-cols-2">
          <a
            href="mailto:support@khostigpt.com"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[#12e9c1]/50"
          >
            <Mail className="h-7 w-7 text-[#12e9c1]" />
            <h2 className="mt-7 text-xl font-semibold">Email support</h2>
            <p className="mt-3 text-sm text-white/50">support@khostigpt.com</p>
          </a>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <MessageCircle className="h-7 w-7 text-[#12e9c1]" />
            <h2 className="mt-7 text-xl font-semibold">Start with chat</h2>
            <p className="mt-3 text-sm leading-7 text-white/50">
              Create an account and ask KhostiGPT directly for help with your
              work.
            </p>
            <Link
              href="/register"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#12e9c1]"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
        <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-7">
          <h2 className="text-2xl font-semibold">Need an answer right now?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">
            Create an account and start a conversation with KhostiGPT. It is
            often the fastest way to turn a question into a practical next step.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#12e9c1]"
          >
            Start chatting <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
