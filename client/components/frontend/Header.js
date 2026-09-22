"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun } from "lucide-react";
import Logo from "./Logo";

const links = [
  ["/", "Home"],
  ["/features", "Features"],
  ["/pricing", "Pricing"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 min-h-[76px] border-b border-white/10 bg-[#031017]/95 px-5 backdrop-blur sm:px-8 lg:px-16">
      <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between">
        <Link href="/" aria-label="KhostiGPT home">
          <Logo compact showName />
        </Link>
        <nav
          className="hidden items-center gap-10 text-sm text-white/80 md:flex"
          aria-label="Main navigation"
        >
          {links.map(([href, label]) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={
                  active
                    ? "relative py-7 text-[#12e9c1] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#12e9c1]"
                    : "transition hover:text-[#12e9c1]"
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle theme"
            className="hidden rounded-full p-2 text-white/80 transition hover:bg-white/10 md:block"
          >
            <Sun className="h-5 w-5" />
          </button>
          <Link
            href="/login"
            className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition hover:border-[#12e9c1]"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-[#18d8dc] to-[#11e9b8] px-5 py-2.5 text-sm font-semibold text-[#021017] shadow-[0_0_28px_rgba(18,233,193,0.22)] transition hover:brightness-110"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
