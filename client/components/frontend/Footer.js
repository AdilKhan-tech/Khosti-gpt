import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#031017] px-5 py-10 text-sm sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-[1600px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="KhostiGPT home">
            <Logo compact showName />
          </Link>
          <p className="mt-4 max-w-xs leading-6 text-white/40">
            A focused AI assistant for writing, research, coding, and everyday
            questions.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white/80">Product</h3>
          <div className="mt-4 space-y-3 text-white/45">
            <Link
              href="/features"
              className="block transition hover:text-white"
            >
              Use cases
            </Link>
            <Link href="/about" className="block transition hover:text-white">
              How it works
            </Link>
            <Link href="/contact" className="block transition hover:text-white">
              FAQ
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white/80">Account</h3>
          <div className="mt-4 space-y-3 text-white/45">
            <Link
              href="/register"
              className="block transition hover:text-white"
            >
              Create account
            </Link>
            <Link href="/login" className="block transition hover:text-white">
              Log in
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white/80">Get started</h3>
          <p className="mt-4 leading-6 text-white/40">
            Start with one question. Build from there.
          </p>
          <Link
            href="/register"
            className="mt-4 inline-flex items-center gap-2 text-[#66d8b3] transition hover:text-white"
          >
            Start chatting <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="border-t border-white/10 pt-6 text-xs text-white/30 sm:col-span-2 lg:col-span-4">
          © 2026 KhostiGPT. Built for clearer thinking.
        </div>
      </div>
    </footer>
  );
}
