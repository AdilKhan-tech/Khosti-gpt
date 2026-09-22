import Link from "next/link";
import { ArrowRight, Compass, Heart, Target } from "lucide-react";
import PageHero from "@/components/frontend/PageHero";

export const metadata = {
  title: "About KhostiGPT",
  description: "Learn about the thinking behind KhostiGPT.",
};

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-[#031017] px-5 text-[#f4f7f5] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <PageHero
          eyebrow="The idea behind KhostiGPT"
          title="AI that helps you"
          highlight="think clearly and keep moving."
          description="KhostiGPT is built as a focused assistant for the work between ideas: the questions, drafts, decisions, and next steps that make progress possible."
          metric="Designed around clarity, usefulness, and control."
          visualTitle="A calmer conversation"
          visualText="Less friction between a thought and a next step."
        />
        <section className="grid gap-10 border-b border-white/10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#12e9c1]">
              Our approach
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Technology should feel helpful, not heavy.
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/50">
            The best assistant does not take over your thinking. It gives you a
            clearer starting point, helps you explore the problem, and leaves
            you with something you can use.
          </p>
        </section>
        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            [
              Compass,
              "Stay focused",
              "A calmer workspace for turning rough thoughts into useful outcomes.",
            ],
            [
              Target,
              "Be useful",
              "Answers should help you understand the problem and take the next action.",
            ],
            [
              Heart,
              "Keep control",
              "Your preferences should shape the experience, not get in the way.",
            ],
          ].map(([Icon, title, text]) => (
            <article
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
            >
              <Icon className="h-7 w-7 text-[#12e9c1]" />
              <h2 className="mt-7 text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/50">{text}</p>
            </article>
          ))}
        </section>
        <section className="mt-16 rounded-2xl border border-[#12e9c1]/25 bg-[#00dcb9]/10 p-8 sm:p-12">
          <p className="text-sm uppercase tracking-[0.2em] text-[#12e9c1]">
            Keep moving
          </p>
          <h2 className="mt-4 text-3xl font-semibold">
            Bring your next idea into focus.
          </h2>
          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#18d8dc] to-[#11e9b8] px-6 py-3.5 text-sm font-semibold text-[#021017]"
          >
            Try KhostiGPT <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
        <Link
          href="/register"
          className="mt-14 inline-flex items-center gap-2 text-sm font-semibold text-[#12e9c1]"
        >
          Try KhostiGPT <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
