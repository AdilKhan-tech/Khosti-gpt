'use client';

import { useEffect, useRef, useState } from 'react';
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
  FolderKanban,
  Code2,
  ChevronDown,
  Pin,
  Sparkles,
  User,
  HelpCircle,
  Crown,
  Plus,
} from 'lucide-react';

import { useChat } from './ChatProvider';
import { useAuth } from './AuthProvider';
import SettingsModal from './SettingsModal';

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

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    recents: true,
  });

  const menuRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Keyboard shortcut for new chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        createConversation();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [createConversation]);

  const startRename = (id: string, title: string) => {
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
    setDraftTitle('');
  };

  const handleDelete = (id: string) => {
    setOpenMenuId(null);
    deleteConversation(id);
  };

  const handleCreateChat = () => {
    createConversation();
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const toggleSection = (section: 'recents') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Filter conversations based on search
  const filteredConversations = conversations.filter((chat) =>
    (chat.title || 'New chat').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const initials = (user?.name || 'U')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Navigation items - KhostiGPT style
  const navItems = [
    { icon: Image, label: 'Images (UPDATED)', badge: 'NEW' },
    { icon: Library, label: 'Library' },
    { icon: CalendarClock, label: 'Scheduled' },
    { icon: Puzzle, label: 'Plugins' },
    { icon: Code2, label: 'Codex' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          flex w-[260px] flex-col
          bg-[#212121] text-[#ececec]
          transition-transform duration-300 ease-in-out
          md:static md:translate-x-0
          ${
            sidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
          border-r border-white/5
        `}
      >
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#10a37f] flex items-center justify-center shadow-lg shadow-[#10a37f]/20">
              <span className="text-sm font-bold text-white">AI</span>
            </div>
            <span className="text-sm font-medium text-white/90">KhostiGPT</span>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="
              rounded-lg p-1.5
              text-white/40
              hover:bg-white/10
              hover:text-white
              transition-colors
              md:flex
            "
          >
            <PanelLeftClose className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
        </div>

        {/* ================= NEW CHAT BUTTON ================= */}
        <div className="px-3 py-3">
          <button
            type="button"
            onClick={handleCreateChat}
            className="
              group flex w-full items-center gap-3
              rounded-xl px-3 py-2.5
              text-sm text-white
              bg-[#10a37f] hover:bg-[#0d8c6c]
              transition-all duration-200
              shadow-lg shadow-[#10a37f]/20
              hover:shadow-[#10a37f]/30
            "
          >
            <MessageSquarePlus className="h-[18px] w-[18px]" strokeWidth={1.8} />
            <span className="flex-1 text-left">New chat</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-white/50 bg-white/10 rounded border border-white/5">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full rounded-lg
                bg-white/5
                border border-white/5
                px-8 py-2
                text-sm text-white/80
                placeholder:text-white/20
                focus:outline-none focus:border-[#10a37f]/50
                transition-colors
              "
            />
          </div>
        </div>

        {/* ================= NAVIGATION ITEMS ================= */}
        <div className="px-2 py-1 border-b border-white/5">
          <div className="space-y-0.5">
            {navItems.map((item, index) => (
              <button
                key={index}
                type="button"
                className="
                  flex w-full items-center gap-3
                  rounded-xl px-3 py-2
                  text-sm text-white/70
                  hover:bg-white/5 hover:text-white
                  transition-all duration-150
                  group
                "
              >
                <item.icon className="h-4 w-4 text-white/40 group-hover:text-white/70" strokeWidth={1.5} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-medium text-[#10a37f] bg-[#10a37f]/10 px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ================= CHAT HISTORY ================= */}
        <div className="flex-1 overflow-y-auto px-2 py-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {/* RECENTS SECTION - NOW USING REAL CONVERSATIONS */}
          <div className="mb-1">
            <button
              type="button"
              onClick={() => toggleSection('recents')}
              className="
                flex w-full items-center gap-1
                px-2 py-1.5
                text-[10px] font-medium text-white/30 uppercase tracking-wider
                hover:text-white/50
                transition-colors
              "
            >
              <ChevronDown 
                className={`h-3 w-3 transition-transform duration-200 ${expandedSections.recents ? '' : '-rotate-90'}`} 
                strokeWidth={2} 
              />
              <span>Recents</span>
              {conversations.length > 0 && (
                <span className="ml-auto text-white/20 text-[9px]">{conversations.length}</span>
              )}
            </button>

            {expandedSections.recents && (
              <div className="space-y-[2px] mt-0.5">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((chat) => (
                    <ChatRow
                      key={chat.id}
                      chat={chat}
                      active={chat.id === activeId}
                      editing={editingId === chat.id}
                      menuOpen={openMenuId === chat.id}
                      draftTitle={draftTitle}
                      setDraftTitle={setDraftTitle}
                      startRename={startRename}
                      commitRename={commitRename}
                      handleDelete={handleDelete}
                      setOpenMenuId={setOpenMenuId}
                      selectConversation={selectConversation}
                      setEditingId={setEditingId}
                      menuRef={menuRef}
                    />
                  ))
                ) : (
                  <div className="px-3 py-4 text-center">
                    <p className="text-sm text-white/30">
                      {searchQuery ? 'No results found' : 'No conversations yet'}
                    </p>
                    {!searchQuery && (
                      <button
                        type="button"
                        onClick={handleCreateChat}
                        className="mt-1 text-sm text-[#10a37f] hover:underline"
                      >
                        Start a new chat
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ================= ACCOUNT MENU ================= */}
        <div className="border-t border-white/5">
          {/* Account Popup Menu */}
          {accountMenuOpen && (
            <div
              ref={accountMenuRef}
              className="
                absolute
                bottom-[72px]
                left-2
                right-2
                overflow-hidden
                rounded-xl
                border border-white/10
                bg-[#2a2a2a]
                shadow-2xl shadow-black/50
                animate-in fade-in-0 slide-in-from-bottom-2
              "
            >
              {/* Upgrade Plan */}
              <button
                type="button"
                className="
                  flex w-full items-center gap-3
                  rounded-t-xl
                  px-3 py-2.5
                  text-sm
                  text-white/80
                  hover:bg-white/5
                  transition-colors
                  border-b border-white/5
                "
              >
                <Crown className="h-4 w-4 text-yellow-400" />
                <span>Upgrade plan</span>
              </button>

              {/* Divider */}
              <div className="border-b border-white/5" />

              {/* Personalization */}
              <button
                type="button"
                className="
                  flex w-full items-center gap-3
                  px-3 py-2.5
                  text-sm
                  text-white/70
                  hover:bg-white/5
                  transition-colors
                "
              >
                <Sparkles className="h-4 w-4 text-white/40" />
                <span>Personalization</span>
              </button>

              {/* Profile */}
              <button
                type="button"
                className="
                  flex w-full items-center gap-3
                  px-3 py-2.5
                  text-sm
                  text-white/70
                  hover:bg-white/5
                  transition-colors
                "
              >
                <User className="h-4 w-4 text-white/40" />
                <span>Profile</span>
              </button>

              {/* Settings */}
              <button
                type="button"
                onClick={() => {
                  setAccountMenuOpen(false);
                  setSettingsOpen(true);
                }}
                className="
                  flex w-full items-center gap-3
                  px-3 py-2.5
                  text-sm
                  text-white/70
                  hover:bg-white/5
                  transition-colors
                "
              >
                <Settings className="h-4 w-4 text-white/40" />
                <span>Settings</span>
              </button>

              {/* Divider */}
              <div className="border-b border-white/5" />

              {/* Help */}
              <button
                type="button"
                className="
                  flex w-full items-center gap-3
                  px-3 py-2.5
                  text-sm
                  text-white/70
                  hover:bg-white/5
                  transition-colors
                "
              >
                <HelpCircle className="h-4 w-4 text-white/40" />
                <span>Help</span>
              </button>

              {/* Log out */}
              <button
                type="button"
                onClick={() => {
                  setAccountMenuOpen(false);
                  logout();
                }}
                className="
                  flex w-full items-center gap-3
                  rounded-b-xl
                  px-3 py-2.5
                  text-sm
                  text-red-300/70
                  hover:bg-red-500/10
                  transition-colors
                "
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>
          )}

          {/* Account Button */}
          <button
            type="button"
            onClick={() => setAccountMenuOpen((value) => !value)}
            className="
              flex w-full
              items-center gap-3
              rounded-none
              px-2.5 py-2.5
              text-left
              transition-all duration-200
              hover:bg-white/5
            "
          >
            {/* Avatar */}
            <div
              className="
                flex h-8 w-8
                shrink-0
                items-center justify-center
                rounded-full
                bg-gradient-to-br from-[#10a37f] to-[#0d8c6c]
                text-xs font-semibold text-white
                shadow-lg shadow-[#10a37f]/20
              "
            >
              {initials}
            </div>

            {/* User info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user?.name || 'Account'}
              </p>
              <p className="truncate text-xs text-white/30">
                {user?.email || 'Signed in'}
              </p>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[9px] font-medium text-white/30 bg-white/5 px-2 py-0.5 rounded-full">
                Free
              </span>
              <span className="text-[9px] text-[#10a37f] mt-0.5">Upgrade</span>
            </div>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE OPEN BUTTON ================= */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
        className={`
          fixed left-3 top-3 z-20
          rounded-xl
          border border-white/10
          bg-[#212121]
          p-2.5
          text-white/80
          shadow-lg shadow-black/30
          transition-all duration-200
          hover:bg-[#2a2a2a]
          md:hidden
          ${
            sidebarOpen
              ? 'pointer-events-none opacity-0 scale-90'
              : 'opacity-100 scale-100'
          }
        `}
      >
        <PanelLeftOpen className="h-4 w-4" strokeWidth={1.8} />
      </button>

      {/* Settings Modal */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
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
}: any) {
  return (
    <div className="group relative">
      {editing ? (
        <div
          className="
            flex items-center gap-1
            rounded-xl
            bg-white/5
            px-2 py-1
            border border-[#10a37f]/20
          "
        >
          <input
            autoFocus
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitRename();
              if (e.key === 'Escape') {
                setEditingId(null);
                setDraftTitle('');
              }
            }}
            className="
              min-w-0 flex-1
              bg-transparent
              px-1 py-1.5
              text-sm text-white
              outline-none
            "
          />
          <button
            type="button"
            onClick={commitRename}
            className="
              rounded-md px-2.5 py-1
              text-xs font-medium
              text-[#10a37f]
              hover:bg-[#10a37f]/10
              transition-colors
            "
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              selectConversation(chat.id);
              setOpenMenuId(null);
            }}
            className={`
              flex w-full items-center
              rounded-xl
              px-3 py-2
              pr-10
              text-left
              text-sm
              transition-all duration-150
              ${
                active
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }
            `}
          >
            <span className="min-w-0 flex-1 truncate">
              {chat.title || 'New chat'}
            </span>
          </button>

          <button
            type="button"
            aria-label="Chat options"
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId(menuOpen ? null : chat.id);
            }}
            className={`
              absolute right-2 top-1/2
              -translate-y-1/2
              rounded-md
              p-1
              text-white/30
              transition-all duration-150
              hover:bg-white/10
              hover:text-white
              ${
                menuOpen
                  ? 'opacity-100'
                  : 'opacity-0 group-hover:opacity-100'
              }
            `}
          >
            <MoreHorizontal className="h-[16px] w-[16px]" />
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              className="
                absolute
                right-1
                top-[38px]
                z-50
                w-[180px]
                overflow-hidden
                rounded-xl
                border border-white/10
                bg-[#2a2a2a]
                p-1
                shadow-2xl shadow-black/50
                animate-in fade-in-0 zoom-in-95
              "
            >
              <button
                type="button"
                onClick={() => startRename(chat.id, chat.title)}
                className="
                  flex w-full
                  items-center gap-3
                  rounded-lg
                  px-3 py-2
                  text-sm
                  text-white/80
                  hover:bg-white/10
                  transition-colors
                "
              >
                <Pencil className="h-3.5 w-3.5" />
                <span>Rename</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(chat.id)}
                className="
                  flex w-full
                  items-center gap-3
                  rounded-lg
                  px-3 py-2
                  text-sm
                  text-red-300/80
                  hover:bg-red-500/10
                  transition-colors
                "
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}