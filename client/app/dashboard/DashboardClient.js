"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatWindow from "@/components/dashboard/ChatWindow";
import { ChatProvider } from "@/components/dashboard/ChatProvider";
import { useAuth } from "@/components/providers/AuthProvider";
export default function DashboardClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);
  if (loading || !user) {
    return _jsx("div", {
      className:
        "flex h-dvh items-center justify-center bg-[#212121] text-white/60",
      children: "Loading...",
    });
  }
  return _jsx(ChatProvider, {
    children: _jsxs("div", {
      className: "flex h-dvh overflow-hidden bg-[#212121]",
      children: [_jsx(Sidebar, {}), _jsx(ChatWindow, {})],
    }),
  });
}
