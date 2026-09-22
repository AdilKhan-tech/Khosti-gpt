"use client";

import { useState } from "react";
import { ArrowLeft, Check, Crown, Sparkles, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "A simple way to explore KhostiGPT.",
    features: [
      "Everyday AI conversations",
      "Personal preferences",
      "Saved local chat history",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "More room for serious work and deeper thinking.",
    features: [
      "Higher usage limits",
      "Advanced model access",
      "Priority responses",
      "Image and data tools",
    ],
    featured: true,
  },
];

export default function UpgradePlans() {
  const router = useRouter();
  const { user, saveSettings } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(
    user?.plan === "pro" ? "pro" : "pro",
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const choosePlan = async () => {
    if (selectedPlan === user?.plan) {
      setMessage(`You are already on the ${selectedPlan} plan.`);
      return;
    }

    setSaving(true);
    setMessage("");
    try {
      await saveSettings({ plan: selectedPlan });
      setMessage("Your plan has been updated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to update your plan.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-dvh overflow-y-auto bg-[#101312] px-5 py-6 text-[#f4f7f5] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to chat
        </button>

        <header className="mx-auto mt-12 max-w-2xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10a37f]/15 text-[#66d8b3]">
            <Crown className="h-6 w-6" />
          </div>
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-[#66d8b3]">
            Plans for your workflow
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
            Make more room for good ideas.
          </h1>
          <p className="mt-5 text-base leading-7 text-white/50 sm:text-lg">
            Choose the KhostiGPT experience that fits how you work today.
          </p>
        </header>

        <section className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {plans.map((plan) => {
            const active = selectedPlan === plan.id;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-2xl border p-7 text-left transition ${
                  active
                    ? "border-[#10a37f] bg-[#10a37f]/10 shadow-[0_18px_60px_rgba(16,163,127,0.12)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }`}
              >
                {plan.featured && (
                  <span className="absolute right-5 top-5 rounded-full bg-[#10a37f] px-2.5 py-1 text-[11px] font-semibold text-white">
                    Popular
                  </span>
                )}
                <div className="flex items-center gap-3">
                  {plan.id === "pro" ? (
                    <Sparkles className="h-5 w-5 text-[#66d8b3]" />
                  ) : (
                    <Zap className="h-5 w-5 text-white/45" />
                  )}
                  <h2 className="text-xl font-semibold">{plan.name}</h2>
                </div>
                <div className="mt-7 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">{plan.price}</span>
                  <span className="text-sm text-white/40">{plan.period}</span>
                </div>
                <p className="mt-3 min-h-12 text-sm leading-6 text-white/50">
                  {plan.description}
                </p>
                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <Check className="h-4 w-4 text-[#66d8b3]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </section>

        <div className="mx-auto mt-8 max-w-4xl text-center">
          <button
            type="button"
            onClick={choosePlan}
            disabled={saving}
            className="inline-flex min-w-48 items-center justify-center rounded-xl bg-[#10a37f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#13b88e] disabled:cursor-wait disabled:opacity-60"
          >
            {saving
              ? "Updating..."
              : selectedPlan === "pro"
                ? "Choose Pro"
                : "Keep Free plan"}
          </button>
          {message && <p className="mt-4 text-sm text-[#a9ead4]">{message}</p>}
          <p className="mt-5 text-xs text-white/30">
            Plan selection is connected to your account settings. Payment
            processing can be added when billing is configured.
          </p>
        </div>
      </div>
    </main>
  );
}
