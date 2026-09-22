import Link from "next/link";
import { ArrowRight, Check, Crown } from "lucide-react";
import PageHero from "@/components/frontend/PageHero";

export const metadata = {
  title: "Pricing",
  description: "Choose the KhostiGPT plan that fits your workflow.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    detail: "Start exploring",
    description: "For trying KhostiGPT and handling everyday questions.",
    cta: "Start free",
    href: "/register",
    features: [
      "Everyday AI conversations",
      "Personal preferences",
      "Saved local chat history",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    detail: "per month",
    description: "For deeper work, higher limits, and more capable tools.",
    cta: "Choose Pro",
    href: "/dashboard/upgrade",
    features: [
      "Higher usage limits",
      "Advanced model access",
      "Priority responses",
      "Image and data tools",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-dvh bg-[#031017] px-5 py-12 text-[#f4f7f5] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <PageHero
          eyebrow="Simple, flexible plans"
          title="A plan for"
          highlight="every pace."
          description="Start free, then choose more room when your work needs it. KhostiGPT grows with the way you think and work."
          metric="No complicated setup. Start with one useful question."
          visualTitle="Your plan, your pace"
          visualText="Choose the room your workflow needs."
        />
        <div className="py-14 text-left">
          <p className="text-sm uppercase tracking-[0.2em] text-[#12e9c1]">
            Compare plans
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            Clear value, without the ceremony.
          </h2>
        </div>
        <section className="mt-4 grid gap-5 text-left md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${plan.name === "Pro" ? "border-[#12e9c1] bg-[#00dcb9]/10 shadow-[0_0_45px_rgba(0,220,185,0.12)]" : "border-white/10 bg-white/[0.03]"}`}
            >
              {plan.name === "Pro" && (
                <span className="absolute right-7 top-7 rounded-full bg-[#12e9c1] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#021017]">
                  Most popular
                </span>
              )}
              <div className="flex items-center gap-3">
                {plan.name === "Pro" && (
                  <Crown className="h-5 w-5 text-[#12e9c1]" />
                )}
                <h2 className="text-2xl font-semibold">{plan.name}</h2>
              </div>
              <p className="mt-8 text-5xl font-semibold">{plan.price}</p>
              <p className="mt-2 text-sm text-white/45">{plan.detail}</p>
              <p className="mt-5 min-h-12 max-w-sm text-sm leading-6 text-white/55">
                {plan.description}
              </p>
              <ul className="mt-8 space-y-4 border-t border-white/10 pt-7">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 text-sm text-white/70"
                  >
                    <Check className="h-4 w-4 shrink-0 text-[#12e9c1]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-9 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${plan.name === "Pro" ? "bg-gradient-to-r from-[#18d8dc] to-[#11e9b8] text-[#021017]" : "border border-white/20 text-white hover:border-[#12e9c1]"}`}
              >
                {plan.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </section>
        <section className="mt-16 grid gap-8 border-t border-white/10 py-14 text-left md:grid-cols-3">
          <div>
            <p className="text-3xl font-semibold text-[#12e9c1]">No lock-in</p>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Change your plan as your workflow changes.
            </p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[#12e9c1]">One account</p>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Your preferences stay with you across every conversation.
            </p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[#12e9c1]">Clear start</p>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Begin free without entering payment details.
            </p>
          </div>
        </section>
        <section className="border-t border-white/10 py-14 text-left">
          <h2 className="text-3xl font-semibold">
            Questions before you choose?
          </h2>
          <p className="mt-4 max-w-2xl text-white/50">
            Start with Free and upgrade when your conversations, tools, and
            daily work call for more capacity.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#12e9c1]"
          >
            Talk to us <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
        <Link
          href="/register"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#18d8dc] to-[#11e9b8] px-7 py-4 text-sm font-semibold text-[#021017]"
        >
          Get started free <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
