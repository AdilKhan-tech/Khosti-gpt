"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useEffectEvent, useState } from "react";
import {
  X,
  Sparkles,
  Bell,
  User,
  Puzzle,
  Volume2,
  CreditCard,
  BarChart3,
  Database,
  HardDrive,
  Shield,
  Moon,
  Sun,
  Monitor,
  Crown,
  ChevronRight,
  Search,
} from "lucide-react";
import { useAuth } from "../providers/AuthProvider";
import { useChat } from "./ChatProvider";
// Settings navigation items - KhostiGPT style
const SETTINGS_SECTIONS = [
  { id: "general", label: "General", icon: Sparkles },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "personalization", label: "Personalization", icon: User },
  { id: "plugins", label: "Plugins", icon: Puzzle },
  { id: "voice", label: "Voice", icon: Volume2 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "usage", label: "Usage", icon: BarChart3 },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "data-controls", label: "Data controls", icon: Database },
  { id: "storage", label: "Storage", icon: HardDrive },
  { id: "safety", label: "Safety", icon: Shield },
  { id: "security-login", label: "Security and login", icon: Shield },
];
const APPEARANCE_OPTIONS = [
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
];
const ACCENT_COLORS = [
  { value: "default", label: "Default", color: "var(--accent)" },
  { value: "blue", label: "Blue", color: "#3b82f6" },
  { value: "purple", label: "Purple", color: "#8b5cf6" },
  { value: "pink", label: "Pink", color: "#ec4899" },
  { value: "orange", label: "Orange", color: "#f97316" },
];
const LANGUAGES = [
  { value: "auto", label: "Auto-detect" },
  { value: "en", label: "English" },
  { value: "ur", label: "Urdu" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
];
const DEFAULT_TOGGLE_SETTINGS = {
  email_notifications: true,
  push_notifications: true,
  chat_updates: true,
  product_announcements: true,
  remember_preferences: true,
  personalized_suggestions: true,
  content_customization: true,
  adaptive_responses: true,
  web_search: true,
  code_interpreter: true,
  data_analysis: true,
  image_generation: true,
  voice_input: true,
  voice_output: true,
  voice_activation: true,
  language_detection: true,
  content_filtering: true,
  safety_warnings: true,
  parental_controls: false,
  safe_search: true,
};
export default function SettingsModal({ open, onClose }) {
  const { user, saveSettings } = useAuth();
  const { conversations } = useChat();
  const [activeSection, setActiveSection] = useState("general");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Settings state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [appearance, setAppearance] = useState(user?.theme || "dark");
  const [accentColor, setAccentColor] = useState(
    user?.accent_color || "default",
  );
  const [language, setLanguage] = useState(user?.language || "en");
  const [higherIntelligence, setHigherIntelligence] = useState(
    user?.higher_intelligence ?? true,
  );
  const [dictation, setDictation] = useState(user?.dictation ?? true);
  const [featureSettings, setFeatureSettings] = useState(
    DEFAULT_TOGGLE_SETTINGS,
  );
  const [dataRetentionDays, setDataRetentionDays] = useState(30);
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const syncFormFromUser = useEffectEvent((profile) => {
    if (!profile) return;
    setName(profile.name || "");
    setEmail(profile.email || "");
    setAppearance(profile.theme || "dark");
    setAccentColor(profile.accent_color || "default");
    setLanguage(profile.language || "en");
    setHigherIntelligence(profile.higher_intelligence ?? true);
    setDictation(profile.dictation ?? true);
    setFeatureSettings({
      email_notifications: profile.email_notifications ?? true,
      push_notifications: profile.push_notifications ?? true,
      chat_updates: profile.chat_updates ?? true,
      product_announcements: profile.product_announcements ?? true,
      remember_preferences: profile.remember_preferences ?? true,
      personalized_suggestions: profile.personalized_suggestions ?? true,
      content_customization: profile.content_customization ?? true,
      adaptive_responses: profile.adaptive_responses ?? true,
      web_search: profile.web_search ?? true,
      code_interpreter: profile.code_interpreter ?? true,
      data_analysis: profile.data_analysis ?? true,
      image_generation: profile.image_generation ?? true,
      voice_input: profile.voice_input ?? true,
      voice_output: profile.voice_output ?? true,
      voice_activation: profile.voice_activation ?? true,
      language_detection: profile.language_detection ?? true,
      content_filtering: profile.content_filtering ?? true,
      safety_warnings: profile.safety_warnings ?? true,
      parental_controls: profile.parental_controls ?? false,
      safe_search: profile.safe_search ?? true,
    });
    setDataRetentionDays(profile.data_retention_days ?? 30);
    setCacheEnabled(profile.cache_enabled ?? true);
    setError("");
    setSaved(false);
    setSearchQuery("");
  });
  useEffect(() => {
    if (!open || !user) return;
    let active = true;
    queueMicrotask(() => {
      if (active) syncFormFromUser(user);
    });
    return () => {
      active = false;
    };
  }, [open, user]);
  if (!open) return null;
  // Filter settings sections based on search
  const filteredSections = SETTINGS_SECTIONS.filter((section) =>
    section.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const onSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      await saveSettings({
        name,
        theme: appearance,
        language,
        accent_color: accentColor,
        higher_intelligence: higherIntelligence,
        dictation,
        ...featureSettings,
        data_retention_days: dataRetentionDays,
        cache_enabled: cacheEnabled,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };
  const upgradePlan = async () => {
    setSaving(true);
    setError("");
    try {
      await saveSettings({ plan: "pro" });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upgrade plan");
    } finally {
      setSaving(false);
    }
  };
  const toggleSetting = (key) => {
    setFeatureSettings((current) => ({ ...current, [key]: !current[key] }));
  };
  const renderToggleRows = (items) =>
    _jsx("div", {
      className: "space-y-3",
      children: items.map((item) => {
        const enabled = featureSettings[item.key];
        return _jsxs(
          "div",
          {
            className:
              "flex items-center justify-between border-b border-white/5 py-2",
            children: [
              _jsx("span", {
                className: "text-sm text-white/80",
                children: item.label,
              }),
              _jsx("button", {
                type: "button",
                "aria-pressed": enabled,
                onClick: () => toggleSetting(item.key),
                className: `relative h-5 w-9 rounded-full transition-colors ${enabled ? "bg-[var(--accent)]" : "bg-white/20"}`,
                children: _jsx("span", {
                  className: `absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${enabled ? "right-0.5" : "left-0.5"}`,
                }),
              }),
            ],
          },
          item.key,
        );
      }),
    });
  const renderGeneralSettings = () =>
    _jsxs("div", {
      className: "space-y-6",
      children: [
        _jsx("div", {
          className:
            "rounded-xl bg-gradient-to-r from-[#10a37f]/10 to-[#10a37f]/5 border border-[#10a37f]/20 p-4",
          children: _jsxs("div", {
            className: "flex items-start justify-between",
            children: [
              _jsxs("div", {
                children: [
                  _jsx("h4", {
                    className: "text-sm font-medium text-white",
                    children: "Do more with KhostiGPT",
                  }),
                  _jsx("p", {
                    className: "text-xs text-white/50 mt-0.5",
                    children: "Get higher limits and advanced features.",
                  }),
                ],
              }),
              _jsxs("button", {
                type: "button",
                className:
                  "\n              flex items-center gap-1.5\n              rounded-lg bg-[#10a37f] px-3 py-1.5\n              text-xs font-medium text-white\n              hover:bg-[#0d8c6c] transition-colors\n            ",
                children: [
                  _jsx(Crown, { className: "h-3.5 w-3.5" }),
                  "Upgrade",
                ],
              }),
            ],
          }),
        }),
        _jsxs("div", {
          className: "space-y-3",
          children: [
            _jsxs("div", {
              children: [
                _jsx("label", {
                  className: "mb-1.5 block text-xs text-white/40",
                  children: "Name",
                }),
                _jsx("input", {
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  className:
                    "w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-white outline-none focus:border-[#10a37f] transition-colors",
                }),
              ],
            }),
            _jsxs("div", {
              children: [
                _jsx("label", {
                  className: "mb-1.5 block text-xs text-white/40",
                  children: "Email",
                }),
                _jsx("input", {
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  type: "email",
                  className:
                    "w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-white outline-none focus:border-[#10a37f] transition-colors",
                }),
              ],
            }),
          ],
        }),
        _jsxs("div", {
          children: [
            _jsx("p", {
              className: "mb-2 text-xs text-white/40",
              children: "Appearance",
            }),
            _jsx("div", {
              className: "grid grid-cols-3 gap-2",
              children: APPEARANCE_OPTIONS.map((option) =>
                _jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAppearance(option.value),
                    className: `
                flex items-center justify-center gap-2
                rounded-lg border px-3 py-2
                text-sm transition-all
                ${
                  appearance === option.value
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-white"
                    : "border-white/10 text-white/60 hover:bg-white/5"
                }
              `,
                    children: [
                      _jsx(option.icon, { className: "h-4 w-4" }),
                      option.label,
                    ],
                  },
                  option.value,
                ),
              ),
            }),
          ],
        }),
        _jsxs("div", {
          children: [
            _jsx("p", {
              className: "mb-2 text-xs text-white/40",
              children: "Accent color",
            }),
            _jsx("div", {
              className: "flex gap-2 flex-wrap",
              children: ACCENT_COLORS.map((option) =>
                _jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setAccentColor(option.value),
                    className: `
                flex items-center gap-2
                rounded-lg border px-3 py-2
                text-sm transition-all
                ${
                  accentColor === option.value
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-white"
                    : "border-white/10 text-white/60 hover:bg-white/5"
                }
              `,
                    children: [
                      _jsx("div", {
                        className: "h-4 w-4 rounded-full shrink-0",
                        style: { backgroundColor: option.color },
                      }),
                      option.label,
                    ],
                  },
                  option.value,
                ),
              ),
            }),
          ],
        }),
        _jsxs("div", {
          children: [
            _jsx("p", {
              className: "mb-2 text-xs text-white/40",
              children: "Language",
            }),
            _jsx("div", {
              className: "grid grid-cols-2 gap-2",
              children: LANGUAGES.map((option) =>
                _jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setLanguage(option.value),
                    className: `
                rounded-lg border px-3 py-2
                text-sm transition-all text-left
                ${
                  language === option.value
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-white"
                    : "border-white/10 text-white/60 hover:bg-white/5"
                }
              `,
                    children: option.label,
                  },
                  option.value,
                ),
              ),
            }),
          ],
        }),
        _jsxs("div", {
          className:
            "flex items-start justify-between gap-4 border-t border-white/5 pt-4",
          children: [
            _jsxs("div", {
              children: [
                _jsx("p", {
                  className: "text-sm text-white",
                  children: "Higher intelligence",
                }),
                _jsx("p", {
                  className: "text-xs text-white/40",
                  children:
                    "KhostiGPT can automatically use a higher intelligence setting when you ask a complex question.",
                }),
              ],
            }),
            _jsx("button", {
              type: "button",
              onClick: () => setHigherIntelligence(!higherIntelligence),
              className: `
            relative h-6 w-11 shrink-0 rounded-full transition-colors
            ${higherIntelligence ? "bg-[var(--accent)]" : "bg-white/20"}
          `,
              children: _jsx("span", {
                className: `
              absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform
              ${higherIntelligence ? "translate-x-5" : "translate-x-0.5"}
            `,
              }),
            }),
          ],
        }),
        _jsxs("div", {
          className:
            "flex items-start justify-between gap-4 border-t border-white/5 pt-4",
          children: [
            _jsxs("div", {
              children: [
                _jsx("p", {
                  className: "text-sm text-white",
                  children: "Enable Dictation",
                }),
                _jsx("p", {
                  className: "text-xs text-white/40",
                  children: "Use dictation in the chat composer.",
                }),
              ],
            }),
            _jsx("button", {
              type: "button",
              onClick: () => setDictation(!dictation),
              className: `
            relative h-6 w-11 shrink-0 rounded-full transition-colors
            ${dictation ? "bg-[var(--accent)]" : "bg-white/20"}
          `,
              children: _jsx("span", {
                className: `
              absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform
              ${dictation ? "translate-x-5" : "translate-x-0.5"}
            `,
              }),
            }),
          ],
        }),
        error &&
          _jsx("p", {
            className:
              "rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300",
            children: error,
          }),
        saved &&
          _jsx("p", {
            className:
              "rounded-lg bg-[#10a37f]/15 px-3 py-2 text-sm text-[#7ddec4]",
            children: "Settings saved successfully",
          }),
      ],
    });
  const renderNotifications = () =>
    _jsxs("div", {
      className: "space-y-4",
      children: [
        _jsx("p", {
          className: "text-sm text-white/60",
          children: "Manage your notification preferences.",
        }),
        renderToggleRows([
          { key: "email_notifications", label: "Email notifications" },
          { key: "push_notifications", label: "Push notifications" },
          { key: "chat_updates", label: "Chat updates" },
          { key: "product_announcements", label: "Product announcements" },
        ]),
      ],
    });
  const renderPersonalization = () =>
    _jsxs("div", {
      className: "space-y-4",
      children: [
        _jsx("p", {
          className: "text-sm text-white/60",
          children: "Personalize your KhostiGPT experience.",
        }),
        renderToggleRows([
          { key: "remember_preferences", label: "Remember my preferences" },
          {
            key: "personalized_suggestions",
            label: "Personalized suggestions",
          },
          { key: "content_customization", label: "Content customization" },
          { key: "adaptive_responses", label: "Adaptive responses" },
        ]),
      ],
    });
  const renderPlugins = () =>
    _jsxs("div", {
      className: "space-y-4",
      children: [
        _jsx("p", {
          className: "text-sm text-white/60",
          children: "Manage your plugins and integrations.",
        }),
        renderToggleRows([
          { key: "web_search", label: "Web Search" },
          { key: "code_interpreter", label: "Code Interpreter" },
          { key: "data_analysis", label: "Data Analysis" },
          { key: "image_generation", label: "Image Generation" },
        ]),
      ],
    });
  const renderVoice = () =>
    _jsxs("div", {
      className: "space-y-4",
      children: [
        _jsx("p", {
          className: "text-sm text-white/60",
          children: "Configure your voice settings.",
        }),
        renderToggleRows([
          { key: "voice_input", label: "Voice input" },
          { key: "voice_output", label: "Voice output" },
          { key: "voice_activation", label: "Voice activation" },
          { key: "language_detection", label: "Language detection" },
        ]),
      ],
    });
  const renderBilling = () =>
    _jsxs("div", {
      className: "space-y-4",
      children: [
        _jsx("div", {
          className:
            "rounded-xl bg-gradient-to-r from-[#10a37f]/10 to-[#10a37f]/5 border border-[#10a37f]/20 p-4",
          children: _jsxs("div", {
            className: "flex items-start justify-between",
            children: [
              _jsxs("div", {
                children: [
                  _jsxs("h4", {
                    className: "text-sm font-medium capitalize text-white",
                    children: ["Current plan: ", user?.plan || "Free"],
                  }),
                  _jsx("p", {
                    className: "text-xs text-white/50 mt-0.5",
                    children:
                      user?.plan === "pro"
                        ? "Pro features are enabled for this account."
                        : "Upgrade to unlock higher limits and advanced features.",
                  }),
                ],
              }),
              user?.plan !== "pro" &&
                _jsxs("button", {
                  type: "button",
                  onClick: () => void upgradePlan(),
                  disabled: saving,
                  className:
                    "flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:opacity-90 disabled:opacity-60",
                  children: [
                    _jsx(Crown, { className: "h-3.5 w-3.5" }),
                    saving ? "Upgrading..." : "Upgrade",
                  ],
                }),
            ],
          }),
        }),
        _jsxs("div", {
          className: "rounded-lg border border-white/5 px-3 py-3",
          children: [
            _jsx("p", {
              className: "text-sm text-white/80",
              children: "Plan status",
            }),
            _jsx("p", {
              className: "mt-1 text-xs text-white/40",
              children:
                user?.plan === "pro"
                  ? "Your Pro plan is active."
                  : "Your account is currently on the Free plan.",
            }),
          ],
        }),
      ],
    });
  const renderUsage = () =>
    _jsxs("div", {
      className: "space-y-4",
      children: [
        _jsx("p", {
          className: "text-sm text-white/60",
          children: "Monitor your usage and limits.",
        }),
        _jsxs("div", {
          className: "space-y-3",
          children: [
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Messages used",
                }),
                _jsx("span", {
                  className: "text-sm text-white/40",
                  children: conversations.reduce(
                    (total, chat) => total + chat.messages.length,
                    0,
                  ),
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Conversations",
                }),
                _jsx("span", {
                  className: "text-sm text-white/40",
                  children: conversations.length,
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "User messages",
                }),
                _jsx("span", {
                  className: "text-sm text-white/40",
                  children: conversations.reduce(
                    (total, chat) =>
                      total +
                      chat.messages.filter((message) => message.role === "user")
                        .length,
                    0,
                  ),
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Data retention",
                }),
                _jsxs("span", {
                  className: "text-sm text-white/40",
                  children: [dataRetentionDays, " days"],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  const renderAnalytics = () => {
    const assistantMessages = conversations.flatMap((chat) =>
      chat.messages.filter((message) => message.role === "assistant"),
    );
    const completedReplies = assistantMessages.filter((message) =>
      message.content.trim(),
    ).length;
    return _jsxs("div", {
      className: "space-y-4",
      children: [
        _jsx("p", {
          className: "text-sm text-white/60",
          children: "View your analytics and insights.",
        }),
        _jsxs("div", {
          className: "space-y-3",
          children: [
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Completed replies",
                }),
                _jsx("span", {
                  className: "text-sm text-[var(--accent)]",
                  children: completedReplies,
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Average messages / chat",
                }),
                _jsx("span", {
                  className: "text-sm text-[var(--accent)]",
                  children: conversations.length
                    ? (
                        conversations.reduce(
                          (total, chat) => total + chat.messages.length,
                          0,
                        ) / conversations.length
                      ).toFixed(1)
                    : "0.0",
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Last activity",
                }),
                _jsx("span", {
                  className: "text-sm text-white/40",
                  children: conversations[0]
                    ? new Date(conversations[0].updatedAt).toLocaleDateString()
                    : "No activity",
                }),
              ],
            }),
          ],
        }),
      ],
    });
  };
  const renderDataControls = () =>
    _jsxs("div", {
      className: "space-y-4",
      children: [
        _jsx("p", {
          className: "text-sm text-white/60",
          children: "Control your data and privacy.",
        }),
        _jsxs("div", {
          className: "space-y-3",
          children: [
            _jsxs("div", {
              className:
                "flex items-center justify-between rounded-lg border border-white/5 px-3 py-2",
              children: [
                _jsxs("div", {
                  children: [
                    _jsx("p", {
                      className: "text-sm text-white/80",
                      children: "Data retention",
                    }),
                    _jsx("p", {
                      className: "text-xs text-white/35",
                      children: "Days to keep conversation data",
                    }),
                  ],
                }),
                _jsx("input", {
                  type: "number",
                  min: 1,
                  max: 3650,
                  value: dataRetentionDays,
                  onChange: (event) =>
                    setDataRetentionDays(Number(event.target.value) || 1),
                  className:
                    "w-20 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-right text-sm text-white outline-none focus:border-[var(--accent)]",
                }),
              ],
            }),
            _jsxs("button", {
              type: "button",
              onClick: () => {
                const file = new Blob(
                  [JSON.stringify(conversations, null, 2)],
                  { type: "application/json" },
                );
                const url = URL.createObjectURL(file);
                const link = document.createElement("a");
                link.href = url;
                link.download = "khosti-gpt-conversations.json";
                link.click();
                URL.revokeObjectURL(url);
              },
              className:
                "flex w-full items-center justify-between rounded-lg border border-white/5 px-3 py-2 hover:bg-white/5 transition-colors",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Export data",
                }),
                _jsx(ChevronRight, { className: "h-4 w-4 text-white/30" }),
              ],
            }),
            _jsxs("div", {
              className:
                "flex items-center justify-between rounded-lg border border-white/5 px-3 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Saved conversations",
                }),
                _jsx("span", {
                  className: "text-sm text-white/40",
                  children: conversations.length,
                }),
              ],
            }),
            _jsxs("button", {
              type: "button",
              className:
                "flex w-full items-center justify-between rounded-lg border border-white/5 px-3 py-2 hover:bg-white/5 transition-colors",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Privacy settings",
                }),
                _jsx(ChevronRight, { className: "h-4 w-4 text-white/30" }),
              ],
            }),
          ],
        }),
      ],
    });
  const renderStorage = () =>
    _jsxs("div", {
      className: "space-y-4",
      children: [
        _jsx("p", {
          className: "text-sm text-white/60",
          children: "Manage your storage.",
        }),
        _jsxs("div", {
          className: "space-y-3",
          children: [
            ["Total storage", "Used storage", "File storage"].map(
              (item, index) =>
                _jsxs(
                  "div",
                  {
                    className:
                      "flex items-center justify-between py-2 border-b border-white/5",
                    children: [
                      _jsx("span", {
                        className: "text-sm text-white/80",
                        children: item,
                      }),
                      _jsx("span", {
                        className: "text-sm text-white/40",
                        children:
                          index === 0
                            ? "Local"
                            : index === 1
                              ? `${new Blob([JSON.stringify(conversations)]).size} bytes`
                              : `${conversations.length} chats`,
                      }),
                    ],
                  },
                  item,
                ),
            ),
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Cache settings",
                }),
                _jsx("button", {
                  type: "button",
                  "aria-pressed": cacheEnabled,
                  onClick: () => setCacheEnabled((value) => !value),
                  className: `relative h-5 w-9 rounded-full transition-colors ${cacheEnabled ? "bg-[var(--accent)]" : "bg-white/20"}`,
                  children: _jsx("span", {
                    className: `absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${cacheEnabled ? "right-0.5" : "left-0.5"}`,
                  }),
                }),
              ],
            }),
          ],
        }),
      ],
    });
  const renderSafety = () =>
    _jsxs("div", {
      className: "space-y-4",
      children: [
        _jsx("p", {
          className: "text-sm text-white/60",
          children: "Configure safety settings.",
        }),
        renderToggleRows([
          { key: "content_filtering", label: "Content filtering" },
          { key: "safety_warnings", label: "Safety warnings" },
          { key: "parental_controls", label: "Parental controls" },
          { key: "safe_search", label: "Safe search" },
        ]),
      ],
    });
  const renderSecurityLogin = () =>
    _jsxs("div", {
      className: "space-y-4",
      children: [
        _jsx("p", {
          className: "text-sm text-white/60",
          children: "Manage your security and login settings.",
        }),
        _jsxs("div", {
          className: "space-y-3",
          children: [
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Signed-in email",
                }),
                _jsx("span", {
                  className: "text-sm text-white/40",
                  children: user?.email || "Unavailable",
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Account created",
                }),
                _jsx("span", {
                  className: "text-sm text-white/40",
                  children: user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "Unavailable",
                }),
              ],
            }),
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 py-2",
              children: [
                _jsx("span", {
                  className: "text-sm text-white/80",
                  children: "Current session",
                }),
                _jsx("span", {
                  className: "text-sm text-[var(--accent)]",
                  children: "Active",
                }),
              ],
            }),
            _jsx("p", {
              className: "pt-2 text-xs text-white/35",
              children:
                "Password changes and two-factor authentication require backend security endpoints.",
            }),
          ],
        }),
      ],
    });
  const renderSectionContent = () => {
    switch (activeSection) {
      case "general":
        return renderGeneralSettings();
      case "notifications":
        return renderNotifications();
      case "personalization":
        return renderPersonalization();
      case "plugins":
        return renderPlugins();
      case "voice":
        return renderVoice();
      case "billing":
        return renderBilling();
      case "usage":
        return renderUsage();
      case "analytics":
        return renderAnalytics();
      case "data-controls":
        return renderDataControls();
      case "storage":
        return renderStorage();
      case "safety":
        return renderSafety();
      case "security-login":
        return renderSecurityLogin();
      default:
        return _jsx("div", {
          className: "flex h-64 items-center justify-center",
          children: _jsx("p", {
            className: "text-sm text-white/30",
            children: "Section coming soon",
          }),
        });
    }
  };
  return _jsx("div", {
    className:
      "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm",
    children: _jsxs("div", {
      className:
        "flex h-[600px] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-2xl",
      children: [
        _jsxs("div", {
          className:
            "flex w-[220px] shrink-0 flex-col border-r border-white/5 bg-[#212121]",
          children: [
            _jsx("div", {
              className: "border-b border-white/5 px-4 py-4",
              children: _jsx("h2", {
                className: "text-base font-semibold text-white",
                children: "Settings",
              }),
            }),
            _jsx("div", {
              className: "px-3 py-3",
              children: _jsxs("div", {
                className: "relative",
                children: [
                  _jsx(Search, {
                    className:
                      "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30",
                  }),
                  _jsx("input", {
                    type: "text",
                    placeholder: "Search settings",
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    className:
                      "\n                  w-full rounded-lg\n                  bg-white/5\n                  border border-white/5\n                  pl-8 pr-3 py-1.5\n                  text-sm text-white/80\n                  placeholder:text-white/20\n                  focus:outline-none focus:border-[#10a37f]/50\n                  transition-colors\n                ",
                  }),
                ],
              }),
            }),
            _jsx("div", {
              className:
                "flex-1 overflow-y-auto px-2 pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent",
              children: _jsx("div", {
                className: "space-y-0.5",
                children: filteredSections.map((section) =>
                  _jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveSection(section.id),
                      className: `
                    flex w-full items-center gap-3
                    rounded-lg px-3 py-2
                    text-sm transition-all
                    ${
                      activeSection === section.id
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }
                  `,
                      children: [
                        _jsx(section.icon, {
                          className: "h-4 w-4 shrink-0",
                          strokeWidth: 1.5,
                        }),
                        _jsx("span", {
                          className: "flex-1 text-left truncate",
                          children: section.label,
                        }),
                        activeSection === section.id &&
                          _jsx(ChevronRight, {
                            className: "h-3.5 w-3.5 text-white/30",
                          }),
                      ],
                    },
                    section.id,
                  ),
                ),
              }),
            }),
          ],
        }),
        _jsxs("div", {
          className: "flex flex-1 flex-col min-w-0",
          children: [
            _jsxs("div", {
              className:
                "flex items-center justify-between border-b border-white/5 px-6 py-3.5",
              children: [
                _jsx("h3", {
                  className: "text-sm font-medium text-white",
                  children:
                    SETTINGS_SECTIONS.find((s) => s.id === activeSection)
                      ?.label || "Settings",
                }),
                _jsx("button", {
                  type: "button",
                  onClick: onClose,
                  className:
                    "rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors",
                  "aria-label": "Close settings",
                  children: _jsx(X, { className: "h-4 w-4" }),
                }),
              ],
            }),
            _jsx("div", {
              className:
                "flex-1 overflow-y-auto px-6 py-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent",
              children: renderSectionContent(),
            }),
            _jsxs("div", {
              className:
                "flex items-center justify-end gap-2 border-t border-white/5 px-6 py-3",
              children: [
                _jsx("button", {
                  type: "button",
                  onClick: onClose,
                  className:
                    "rounded-lg px-4 py-1.5 text-sm text-white/60 hover:bg-white/5 transition-colors",
                  children: "Cancel",
                }),
                _jsx("button", {
                  type: "button",
                  disabled: saving,
                  onClick: () => void onSave(),
                  className:
                    "rounded-lg bg-[#10a37f] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#0d8c6c] disabled:opacity-60 transition-colors",
                  children: saving ? "Saving…" : "Save",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
