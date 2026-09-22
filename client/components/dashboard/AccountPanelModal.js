"use client";
import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { HelpCircle, Sparkles, User, X } from "lucide-react";
import { useAuth } from "../providers/AuthProvider";
const PANEL_CONTENT = {
  profile: {
    title: "Profile",
    description: "Your KhostiGPT account information.",
    icon: User,
  },
  personalization: {
    title: "Personalization",
    description: "Customize how KhostiGPT responds to you.",
    icon: Sparkles,
  },
  help: {
    title: "Help",
    description: "Find answers and support for KhostiGPT.",
    icon: HelpCircle,
  },
};
export default function AccountPanelModal({ panel, onClose }) {
  const { user } = useAuth();
  if (!panel) return null;
  const content = PANEL_CONTENT[panel];
  const Icon = content.icon;
  return _jsx("div", {
    className:
      "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm",
    children: _jsxs("div", {
      className:
        "w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-2xl",
      children: [
        _jsxs("div", {
          className:
            "flex items-center justify-between border-b border-white/5 px-6 py-4",
          children: [
            _jsxs("div", {
              className: "flex items-center gap-3",
              children: [
                _jsx(Icon, { className: "h-5 w-5 text-white/60" }),
                _jsxs("div", {
                  children: [
                    _jsx("h2", {
                      className: "text-base font-semibold text-white",
                      children: content.title,
                    }),
                    _jsx("p", {
                      className: "mt-0.5 text-xs text-white/40",
                      children: content.description,
                    }),
                  ],
                }),
              ],
            }),
            _jsx("button", {
              type: "button",
              onClick: onClose,
              "aria-label": "Close",
              className:
                "rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white",
              children: _jsx(X, { className: "h-4 w-4" }),
            }),
          ],
        }),
        _jsxs("div", {
          className: "space-y-4 px-6 py-5",
          children: [
            panel === "profile" &&
              _jsxs(_Fragment, {
                children: [
                  _jsxs("div", {
                    className:
                      "rounded-xl border border-white/10 bg-white/[0.03] p-4",
                    children: [
                      _jsx("p", {
                        className: "text-xs text-white/40",
                        children: "Name",
                      }),
                      _jsx("p", {
                        className: "mt-1 text-sm text-white",
                        children: user?.name || "Account",
                      }),
                    ],
                  }),
                  _jsxs("div", {
                    className:
                      "rounded-xl border border-white/10 bg-white/[0.03] p-4",
                    children: [
                      _jsx("p", {
                        className: "text-xs text-white/40",
                        children: "Email",
                      }),
                      _jsx("p", {
                        className: "mt-1 text-sm text-white",
                        children: user?.email || "Not available",
                      }),
                    ],
                  }),
                ],
              }),
            panel === "personalization" &&
              _jsxs(_Fragment, {
                children: [
                  _jsxs("div", {
                    className:
                      "rounded-xl border border-white/10 bg-white/[0.03] p-4",
                    children: [
                      _jsx("p", {
                        className: "text-sm text-white",
                        children: "Response preferences",
                      }),
                      _jsx("p", {
                        className: "mt-1 text-xs leading-5 text-white/45",
                        children:
                          "Your language, model and response preferences can be managed from Settings.",
                      }),
                    ],
                  }),
                  _jsx("button", {
                    type: "button",
                    onClick: onClose,
                    className:
                      "w-full rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white",
                    children: "Open Settings to customize",
                  }),
                ],
              }),
            panel === "help" &&
              _jsxs(_Fragment, {
                children: [
                  _jsx("div", {
                    className: "space-y-3",
                    children: [
                      "How do I start a new chat?",
                      "How are my conversations saved?",
                      "How can I change my preferences?",
                    ].map((question) =>
                      _jsxs(
                        "div",
                        {
                          className:
                            "rounded-xl border border-white/10 bg-white/[0.03] p-4",
                          children: [
                            _jsx("p", {
                              className: "text-sm text-white/80",
                              children: question,
                            }),
                            _jsx("p", {
                              className: "mt-1 text-xs text-white/40",
                              children:
                                "Open Settings or start a new chat from the sidebar.",
                            }),
                          ],
                        },
                        question,
                      ),
                    ),
                  }),
                  _jsx("p", {
                    className: "text-center text-xs text-white/35",
                    children: "Need more help? Contact KhostiGPT support.",
                  }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
