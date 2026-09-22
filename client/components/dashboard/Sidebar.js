/* eslint-disable react-hooks/refs */
"use client";
import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquarePlus,
  PanelLeftClose,
  PanelLeftOpen,
  MoreHorizontal,
  Pencil,
  Trash2,
  Settings,
  LogOut,
  Search,
  Image,
  Library,
  CalendarClock,
  Puzzle,
  Code2,
  ChevronDown,
  Sparkles,
  User,
  HelpCircle,
  Crown,
} from "lucide-react";
import { useChat } from "./ChatProvider";
import { useAuth } from "../providers/AuthProvider";
import SettingsModal from "./SettingsModal";
import AccountPanelModal from "./AccountPanelModal";
import Logo from "../frontend/Logo";
export default function Sidebar() {
  const {
    conversations,
    activeId,
    sidebarOpen,
    setSidebarOpen,
    createConversation,
    selectConversation,
    deleteConversation,
    renameConversation,
  } = useChat();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [editingId, setEditingId] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accountPanel, setAccountPanel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    recents: true,
  });
  const menuRef = useRef(null);
  const accountMenuRef = useRef(null);
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Keyboard shortcut for new chat
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        createConversation();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [createConversation]);
  const startRename = (id, title) => {
    setEditingId(id);
    setDraftTitle(title);
    setOpenMenuId(null);
  };
  const commitRename = () => {
    if (!editingId) return;
    const title = draftTitle.trim();
    if (title) {
      renameConversation(editingId, title);
    }
    setEditingId(null);
    setDraftTitle("");
  };
  const handleDelete = (id) => {
    setOpenMenuId(null);
    deleteConversation(id);
  };
  const handleCreateChat = () => {
    createConversation();
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  // Filter conversations based on search
  const filteredConversations = conversations.filter((chat) =>
    (chat.title || "New chat")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );
  const initials = (user?.name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  // Navigation items - KhostiGPT style
  const navItems = [
    { icon: Image, label: "Images (UPDATED)", badge: "NEW" },
    { icon: Library, label: "Library" },
    { icon: CalendarClock, label: "Scheduled" },
    { icon: Puzzle, label: "Plugins" },
    { icon: Code2, label: "Codex" },
  ];
  return _jsxs(_Fragment, {
    children: [
      sidebarOpen &&
        _jsx("button", {
          type: "button",
          "aria-label": "Close sidebar",
          onClick: () => setSidebarOpen(false),
          className:
            "fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden",
        }),
      _jsxs("aside", {
        "data-collapsed": !sidebarOpen,
        className: `
          fixed inset-y-0 left-0 z-40
          flex w-[260px] flex-col
          bg-[#212121] text-[#ececec]
          overflow-hidden
          transition-all duration-300 ease-in-out
          md:static
          ${
            sidebarOpen
              ? "translate-x-0 md:w-[260px]"
              : "-translate-x-full md:translate-x-0 md:w-[68px]"
          }
          border-r border-white/5
        `,
        children: [
          _jsxs("div", {
            className: `flex items-center justify-between px-3 py-2.5 border-b border-white/5 ${!sidebarOpen ? "md:justify-center" : ""}`,
            children: [
              _jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  _jsx(Logo, { compact: true }),
                  _jsx("span", {
                    className: `text-sm font-medium text-white/90 ${!sidebarOpen ? "md:hidden" : ""}`,
                    children: "KhostiGPT",
                  }),
                ],
              }),
              _jsx("button", {
                type: "button",
                onClick: () => setSidebarOpen(false),
                "aria-label": "Close sidebar",
                className:
                  "\n              rounded-lg p-1.5\n              text-white/40\n              hover:bg-white/10\n              hover:text-white\n              transition-colors\n              md:flex\n            ",
                children: _jsx(PanelLeftClose, {
                  className: "h-[18px] w-[18px]",
                  strokeWidth: 1.5,
                }),
              }),
            ],
          }),
          _jsx("div", {
            className: "px-3 py-3",
            children: _jsxs("button", {
              type: "button",
              onClick: handleCreateChat,
              className:
                "\n              group flex w-full items-center gap-3\n              ${!sidebarOpen ? 'md:justify-center' : ''}\n              rounded-xl px-3 py-2.5\n              text-sm text-white\n              bg-[#10a37f] hover:bg-[#0d8c6c]\n              transition-all duration-200\n              shadow-lg shadow-[#10a37f]/20\n              hover:shadow-[#10a37f]/30\n            ",
              children: [
                _jsx(MessageSquarePlus, {
                  className: "h-[18px] w-[18px]",
                  strokeWidth: 1.8,
                }),
                _jsx("span", {
                  className: `flex-1 text-left ${!sidebarOpen ? "md:hidden" : ""}`,
                  children: "New chat",
                }),
                _jsx("kbd", {
                  className: `hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-white/50 bg-white/10 rounded border border-white/5 ${!sidebarOpen ? "md:hidden" : ""}`,
                  children: "\u2318K",
                }),
              ],
            }),
          }),
          _jsx("div", {
            className: `px-3 pb-2 ${!sidebarOpen ? "md:hidden" : ""}`,
            children: _jsxs("div", {
              className: "relative",
              children: [
                _jsx(Search, {
                  className:
                    "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30",
                }),
                _jsx("input", {
                  type: "text",
                  placeholder: "Search conversations...",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className:
                    "\n                w-full rounded-lg\n                bg-white/5\n                border border-white/5\n                px-8 py-2\n                text-sm text-white/80\n                placeholder:text-white/20\n                focus:outline-none focus:border-[#10a37f]/50\n                transition-colors\n              ",
                }),
              ],
            }),
          }),
          _jsx("div", {
            className: "px-2 py-1 border-b border-white/5",
            children: _jsx("div", {
              className: "space-y-0.5",
              children: navItems.map((item, index) =>
                _jsxs(
                  "button",
                  {
                    type: "button",
                    className:
                      "\n                  flex w-full items-center gap-3\n                  ${!sidebarOpen ? 'md:justify-center' : ''}\n                  rounded-xl px-3 py-2\n                  text-sm text-white/70\n                  hover:bg-white/5 hover:text-white\n                  transition-all duration-150\n                  group\n                ",
                    children: [
                      _jsx(item.icon, {
                        className:
                          "h-4 w-4 text-white/40 group-hover:text-white/70",
                        strokeWidth: 1.5,
                      }),
                      _jsx("span", {
                        className: `flex-1 text-left ${!sidebarOpen ? "md:hidden" : ""}`,
                        children: item.label,
                      }),
                      item.badge &&
                        _jsx("span", {
                          className:
                            "text-[9px] font-medium text-[#10a37f] bg-[#10a37f]/10 px-1.5 py-0.5 rounded-full",
                          children: item.badge,
                        }),
                    ],
                  },
                  index,
                ),
              ),
            }),
          }),
          _jsx("div", {
            className: `flex-1 overflow-y-auto px-2 py-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent ${!sidebarOpen ? "md:hidden" : ""}`,
            children: _jsxs("div", {
              className: "mb-1",
              children: [
                _jsxs("button", {
                  type: "button",
                  onClick: () => toggleSection("recents"),
                  className:
                    "\n                flex w-full items-center gap-1\n                px-2 py-1.5\n                text-[10px] font-medium text-white/30 uppercase tracking-wider\n                hover:text-white/50\n                transition-colors\n              ",
                  children: [
                    _jsx(ChevronDown, {
                      className: `h-3 w-3 transition-transform duration-200 ${expandedSections.recents ? "" : "-rotate-90"}`,
                      strokeWidth: 2,
                    }),
                    _jsx("span", { children: "Recents" }),
                    conversations.length > 0 &&
                      _jsx("span", {
                        className: "ml-auto text-white/20 text-[9px]",
                        children: conversations.length,
                      }),
                  ],
                }),
                expandedSections.recents &&
                  _jsx("div", {
                    className: "space-y-[2px] mt-0.5",
                    children:
                      filteredConversations.length > 0
                        ? filteredConversations.map((chat) =>
                            _jsx(
                              ChatRow,
                              {
                                chat: chat,
                                active: chat.id === activeId,
                                editing: editingId === chat.id,
                                menuOpen: openMenuId === chat.id,
                                draftTitle: draftTitle,
                                setDraftTitle: setDraftTitle,
                                startRename: startRename,
                                commitRename: commitRename,
                                handleDelete: handleDelete,
                                setOpenMenuId: setOpenMenuId,
                                selectConversation: selectConversation,
                                setEditingId: setEditingId,
                                menuRef: menuRef,
                              },
                              chat.id,
                            ),
                          )
                        : _jsxs("div", {
                            className: "px-3 py-4 text-center",
                            children: [
                              _jsx("p", {
                                className: "text-sm text-white/30",
                                children: searchQuery
                                  ? "No results found"
                                  : "No conversations yet",
                              }),
                              !searchQuery &&
                                _jsx("button", {
                                  type: "button",
                                  onClick: handleCreateChat,
                                  className:
                                    "mt-1 text-sm text-[#10a37f] hover:underline",
                                  children: "Start a new chat",
                                }),
                            ],
                          }),
                  }),
              ],
            }),
          }),
          _jsxs("div", {
            className: "border-t border-white/5",
            children: [
              accountMenuOpen &&
                _jsxs("div", {
                  ref: accountMenuRef,
                  className:
                    "\n                absolute\n                bottom-[72px]\n                left-2\n                right-2\n                overflow-hidden\n                rounded-xl\n                border border-white/10\n                bg-[#2a2a2a]\n                shadow-2xl shadow-black/50\n                animate-in fade-in-0 slide-in-from-bottom-2\n              ",
                  children: [
                    _jsxs("button", {
                      type: "button",
                      onClick: () => {
                        setAccountMenuOpen(false);
                        router.push("/dashboard/upgrade");
                      },
                      className:
                        "\n                  flex w-full items-center gap-3\n                  rounded-t-xl\n                  px-3 py-2.5\n                  text-sm\n                  text-white/80\n                  hover:bg-white/5\n                  transition-colors\n                  border-b border-white/5\n                ",
                      children: [
                        _jsx(Crown, { className: "h-4 w-4 text-yellow-400" }),
                        _jsx("span", { children: "Upgrade plan" }),
                      ],
                    }),
                    _jsx("div", { className: "border-b border-white/5" }),
                    _jsxs("button", {
                      type: "button",
                      onClick: () => {
                        setAccountMenuOpen(false);
                        setAccountPanel("personalization");
                      },
                      className:
                        "\n                  flex w-full items-center gap-3\n                  px-3 py-2.5\n                  text-sm\n                  text-white/70\n                  hover:bg-white/5\n                  transition-colors\n                ",
                      children: [
                        _jsx(Sparkles, { className: "h-4 w-4 text-white/40" }),
                        _jsx("span", { children: "Personalization" }),
                      ],
                    }),
                    _jsxs("button", {
                      type: "button",
                      onClick: () => {
                        setAccountMenuOpen(false);
                        setAccountPanel("profile");
                      },
                      className:
                        "\n                  flex w-full items-center gap-3\n                  px-3 py-2.5\n                  text-sm\n                  text-white/70\n                  hover:bg-white/5\n                  transition-colors\n                ",
                      children: [
                        _jsx(User, { className: "h-4 w-4 text-white/40" }),
                        _jsx("span", { children: "Profile" }),
                      ],
                    }),
                    _jsxs("button", {
                      type: "button",
                      onClick: () => {
                        setAccountMenuOpen(false);
                        setSettingsOpen(true);
                      },
                      className:
                        "\n                  flex w-full items-center gap-3\n                  px-3 py-2.5\n                  text-sm\n                  text-white/70\n                  hover:bg-white/5\n                  transition-colors\n                ",
                      children: [
                        _jsx(Settings, { className: "h-4 w-4 text-white/40" }),
                        _jsx("span", { children: "Settings" }),
                      ],
                    }),
                    _jsx("div", { className: "border-b border-white/5" }),
                    _jsxs("button", {
                      type: "button",
                      onClick: () => {
                        setAccountMenuOpen(false);
                        setAccountPanel("help");
                      },
                      className:
                        "\n                  flex w-full items-center gap-3\n                  px-3 py-2.5\n                  text-sm\n                  text-white/70\n                  hover:bg-white/5\n                  transition-colors\n                ",
                      children: [
                        _jsx(HelpCircle, {
                          className: "h-4 w-4 text-white/40",
                        }),
                        _jsx("span", { children: "Help" }),
                      ],
                    }),
                    _jsxs("button", {
                      type: "button",
                      onClick: () => {
                        setAccountMenuOpen(false);
                        logout();
                      },
                      className:
                        "\n                  flex w-full items-center gap-3\n                  rounded-b-xl\n                  px-3 py-2.5\n                  text-sm\n                  text-red-300/70\n                  hover:bg-red-500/10\n                  transition-colors\n                ",
                      children: [
                        _jsx(LogOut, { className: "h-4 w-4" }),
                        _jsx("span", { children: "Log out" }),
                      ],
                    }),
                  ],
                }),
              _jsxs("button", {
                type: "button",
                onClick: () => setAccountMenuOpen((value) => !value),
                className:
                  "\n              flex w-full\n              items-center gap-3\n              ${!sidebarOpen ? 'md:justify-center' : ''}\n              rounded-none\n              px-2.5 py-2.5\n              text-left\n              transition-all duration-200\n              hover:bg-white/5\n            ",
                children: [
                  _jsx("div", {
                    className:
                      "\n                flex h-8 w-8\n                shrink-0\n                items-center justify-center\n                rounded-full\n                bg-gradient-to-br from-[#10a37f] to-[#0d8c6c]\n                text-xs font-semibold text-white\n                shadow-lg shadow-[#10a37f]/20\n              ",
                    children: initials,
                  }),
                  _jsxs("div", {
                    className: `min-w-0 flex-1 ${!sidebarOpen ? "md:hidden" : ""}`,
                    children: [
                      _jsx("p", {
                        className: "truncate text-sm font-medium text-white",
                        children: user?.name || "Account",
                      }),
                      _jsx("p", {
                        className: "truncate text-xs text-white/30",
                        children: user?.email || "Signed in",
                      }),
                    ],
                  }),
                  _jsxs("div", {
                    className: `flex flex-col items-end ${!sidebarOpen ? "md:hidden" : ""}`,
                    children: [
                      _jsx("span", {
                        className:
                          "text-[9px] font-medium text-white/30 bg-white/5 px-2 py-0.5 rounded-full",
                        children: "Free",
                      }),
                      _jsx("span", {
                        className: "text-[9px] text-[#10a37f] mt-0.5",
                        children: "Upgrade",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      _jsx("button", {
        type: "button",
        onClick: () => setSidebarOpen(true),
        "aria-label": "Open sidebar",
        className: `
          fixed left-3 top-3 z-50 md:left-[76px]
          rounded-xl
          border border-white/10
          bg-[#212121]
          p-2.5
          text-white/80
          shadow-lg shadow-black/30
          transition-all duration-200
          hover:bg-[#2a2a2a]
          ${
            sidebarOpen
              ? "pointer-events-none opacity-0 scale-90"
              : "opacity-100 scale-100"
          }
        `,
        children: _jsx(PanelLeftOpen, {
          className: "h-4 w-4",
          strokeWidth: 1.8,
        }),
      }),
      _jsx(SettingsModal, {
        open: settingsOpen,
        onClose: () => setSettingsOpen(false),
      }),
      _jsx(AccountPanelModal, {
        panel: accountPanel,
        onClose: () => setAccountPanel(null),
      }),
    ],
  });
}
// ================= CHAT ROW COMPONENT =================
function ChatRow({
  chat,
  active,
  editing,
  menuOpen,
  draftTitle,
  setDraftTitle,
  startRename,
  commitRename,
  handleDelete,
  setOpenMenuId,
  selectConversation,
  setEditingId,
  menuRef,
}) {
  return _jsx("div", {
    className: "group relative",
    children: editing
      ? _jsxs("div", {
          className:
            "\n            flex items-center gap-1\n            rounded-xl\n            bg-white/5\n            px-2 py-1\n            border border-[#10a37f]/20\n          ",
          children: [
            _jsx("input", {
              autoFocus: true,
              value: draftTitle,
              onChange: (e) => setDraftTitle(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") commitRename();
                if (e.key === "Escape") {
                  setEditingId(null);
                  setDraftTitle("");
                }
              },
              className:
                "\n              min-w-0 flex-1\n              bg-transparent\n              px-1 py-1.5\n              text-sm text-white\n              outline-none\n            ",
            }),
            _jsx("button", {
              type: "button",
              onClick: commitRename,
              className:
                "\n              rounded-md px-2.5 py-1\n              text-xs font-medium\n              text-[#10a37f]\n              hover:bg-[#10a37f]/10\n              transition-colors\n            ",
              children: "Save",
            }),
          ],
        })
      : _jsxs(_Fragment, {
          children: [
            _jsx("button", {
              type: "button",
              onClick: () => {
                selectConversation(chat.id);
                setOpenMenuId(null);
              },
              className: `
              flex w-full items-center
              rounded-xl
              px-3 py-2
              pr-10
              text-left
              text-sm
              transition-all duration-150
              ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }
            `,
              children: _jsx("span", {
                className: "min-w-0 flex-1 truncate",
                children: chat.title || "New chat",
              }),
            }),
            _jsx("button", {
              type: "button",
              "aria-label": "Chat options",
              onClick: (e) => {
                e.stopPropagation();
                setOpenMenuId(menuOpen ? null : chat.id);
              },
              className: `
              absolute right-2 top-1/2
              -translate-y-1/2
              rounded-md
              p-1
              text-white/30
              transition-all duration-150
              hover:bg-white/10
              hover:text-white
              ${menuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
            `,
              children: _jsx(MoreHorizontal, {
                className: "h-[16px] w-[16px]",
              }),
            }),
            menuOpen &&
              _jsxs("div", {
                ref: menuRef,
                className:
                  "\n                absolute\n                right-1\n                top-[38px]\n                z-50\n                w-[180px]\n                overflow-hidden\n                rounded-xl\n                border border-white/10\n                bg-[#2a2a2a]\n                p-1\n                shadow-2xl shadow-black/50\n                animate-in fade-in-0 zoom-in-95\n              ",
                children: [
                  _jsxs("button", {
                    type: "button",
                    onClick: () => startRename(chat.id, chat.title),
                    className:
                      "\n                  flex w-full\n                  items-center gap-3\n                  rounded-lg\n                  px-3 py-2\n                  text-sm\n                  text-white/80\n                  hover:bg-white/10\n                  transition-colors\n                ",
                    children: [
                      _jsx(Pencil, { className: "h-3.5 w-3.5" }),
                      _jsx("span", { children: "Rename" }),
                    ],
                  }),
                  _jsxs("button", {
                    type: "button",
                    onClick: () => handleDelete(chat.id),
                    className:
                      "\n                  flex w-full\n                  items-center gap-3\n                  rounded-lg\n                  px-3 py-2\n                  text-sm\n                  text-red-300/80\n                  hover:bg-red-500/10\n                  transition-colors\n                ",
                    children: [
                      _jsx(Trash2, { className: "h-3.5 w-3.5" }),
                      _jsx("span", { children: "Delete" }),
                    ],
                  }),
                ],
              }),
          ],
        }),
  });
}
