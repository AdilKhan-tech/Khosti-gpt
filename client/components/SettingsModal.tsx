'use client';

import { useEffect, useState } from 'react';
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
  Check,
  ChevronRight,
  Search,
} from 'lucide-react';
import { useAuth } from './AuthProvider';

// Settings navigation items - KhostiGPT style
const SETTINGS_SECTIONS = [
  { id: 'general', label: 'General', icon: Sparkles },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'personalization', label: 'Personalization', icon: User },
  { id: 'plugins', label: 'Plugins', icon: Puzzle },
  { id: 'voice', label: 'Voice', icon: Volume2 },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'usage', label: 'Usage', icon: BarChart3 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'data-controls', label: 'Data controls', icon: Database },
  { id: 'storage', label: 'Storage', icon: HardDrive },
  { id: 'safety', label: 'Safety', icon: Shield },
  { id: 'security-login', label: 'Security and login', icon: Shield },
];

const APPEARANCE_OPTIONS = [
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'light', label: 'Light', icon: Sun },
];

const CONTRAST_OPTIONS = [
  { value: 'system', label: 'System' },
  { value: 'high', label: 'High' },
  { value: 'low', label: 'Low' },
];

const ACCENT_COLORS = [
  { value: 'default', label: 'Default', color: '#10a37f' },
  { value: 'blue', label: 'Blue', color: '#3b82f6' },
  { value: 'purple', label: 'Purple', color: '#8b5cf6' },
  { value: 'pink', label: 'Pink', color: '#ec4899' },
  { value: 'orange', label: 'Orange', color: '#f97316' },
];

const LANGUAGES = [
  { value: 'auto', label: 'Auto-detect' },
  { value: 'en', label: 'English' },
  { value: 'ur', label: 'Urdu' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
];

export default function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user, saveSettings } = useAuth();
  
  const [activeSection, setActiveSection] = useState('general');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Settings state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [appearance, setAppearance] = useState(user?.appearance || 'system');
  const [contrast, setContrast] = useState(user?.contrast || 'system');
  const [accentColor, setAccentColor] = useState(user?.accentColor || 'default');
  const [language, setLanguage] = useState(user?.language || 'auto');
  const [higherIntelligence, setHigherIntelligence] = useState(user?.higherIntelligence ?? true);
  const [dictation, setDictation] = useState(user?.dictation ?? true);

  useEffect(() => {
    if (!open || !user) return;
    setName(user.name || '');
    setEmail(user.email || '');
    setAppearance(user.appearance || 'system');
    setContrast(user.contrast || 'system');
    setAccentColor(user.accentColor || 'default');
    setLanguage(user.language || 'auto');
    setHigherIntelligence(user.higherIntelligence ?? true);
    setDictation(user.dictation ?? true);
    setError('');
    setSaved(false);
    setSearchQuery('');
  }, [open, user]);

  if (!open) return null;

  // Filter settings sections based on search
  const filteredSections = SETTINGS_SECTIONS.filter((section) =>
    section.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onSave = async () => {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      await saveSettings({ 
        name, 
        email,
        appearance,
        contrast,
        accentColor,
        language,
        higherIntelligence,
        dictation,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      {/* Upgrade Section */}
      <div className="rounded-xl bg-gradient-to-r from-[#10a37f]/10 to-[#10a37f]/5 border border-[#10a37f]/20 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-medium text-white">Do more with KhostiGPT</h4>
            <p className="text-xs text-white/50 mt-0.5">
              Get higher limits and advanced features.
            </p>
          </div>
          <button
            type="button"
            className="
              flex items-center gap-1.5
              rounded-lg bg-[#10a37f] px-3 py-1.5
              text-xs font-medium text-white
              hover:bg-[#0d8c6c] transition-colors
            "
          >
            <Crown className="h-3.5 w-3.5" />
            Upgrade
          </button>
        </div>
      </div>

      {/* Account Info */}
      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs text-white/40">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-white outline-none focus:border-[#10a37f] transition-colors"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-white/40">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-white outline-none focus:border-[#10a37f] transition-colors"
          />
        </div>
      </div>

      {/* Appearance */}
      <div>
        <p className="mb-2 text-xs text-white/40">Appearance</p>
        <div className="grid grid-cols-3 gap-2">
          {APPEARANCE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setAppearance(option.value)}
              className={`
                flex items-center justify-center gap-2
                rounded-lg border px-3 py-2
                text-sm transition-all
                ${
                  appearance === option.value
                    ? 'border-[#10a37f] bg-[#10a37f]/10 text-white'
                    : 'border-white/10 text-white/60 hover:bg-white/5'
                }
              `}
            >
              <option.icon className="h-4 w-4" />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contrast */}
      <div>
        <p className="mb-2 text-xs text-white/40">Contrast</p>
        <div className="flex gap-2">
          {CONTRAST_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setContrast(option.value)}
              className={`
                rounded-lg border px-4 py-2
                text-sm capitalize transition-all
                ${
                  contrast === option.value
                    ? 'border-[#10a37f] bg-[#10a37f]/10 text-white'
                    : 'border-white/10 text-white/60 hover:bg-white/5'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <p className="mb-2 text-xs text-white/40">Accent color</p>
        <div className="flex gap-2 flex-wrap">
          {ACCENT_COLORS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setAccentColor(option.value)}
              className={`
                flex items-center gap-2
                rounded-lg border px-3 py-2
                text-sm transition-all
                ${
                  accentColor === option.value
                    ? 'border-[#10a37f] bg-[#10a37f]/10 text-white'
                    : 'border-white/10 text-white/60 hover:bg-white/5'
                }
              `}
            >
              <div
                className="h-4 w-4 rounded-full shrink-0"
                style={{ backgroundColor: option.color }}
              />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <p className="mb-2 text-xs text-white/40">Language</p>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setLanguage(option.value)}
              className={`
                rounded-lg border px-3 py-2
                text-sm transition-all text-left
                ${
                  language === option.value
                    ? 'border-[#10a37f] bg-[#10a37f]/10 text-white'
                    : 'border-white/10 text-white/60 hover:bg-white/5'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Higher Intelligence Toggle */}
      <div className="flex items-start justify-between gap-4 border-t border-white/5 pt-4">
        <div>
          <p className="text-sm text-white">Higher intelligence</p>
          <p className="text-xs text-white/40">
            KhostiGPT can automatically use a higher intelligence setting when you ask a complex question.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setHigherIntelligence(!higherIntelligence)}
          className={`
            relative h-6 w-11 shrink-0 rounded-full transition-colors
            ${higherIntelligence ? 'bg-[#10a37f]' : 'bg-white/20'}
          `}
        >
          <span
            className={`
              absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform
              ${higherIntelligence ? 'translate-x-5' : 'translate-x-0.5'}
            `}
          />
        </button>
      </div>

      {/* Enable Dictation Toggle */}
      <div className="flex items-start justify-between gap-4 border-t border-white/5 pt-4">
        <div>
          <p className="text-sm text-white">Enable Dictation</p>
          <p className="text-xs text-white/40">
            Use dictation in the chat composer.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDictation(!dictation)}
          className={`
            relative h-6 w-11 shrink-0 rounded-full transition-colors
            ${dictation ? 'bg-[#10a37f]' : 'bg-white/20'}
          `}
        >
          <span
            className={`
              absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform
              ${dictation ? 'translate-x-5' : 'translate-x-0.5'}
            `}
          />
        </button>
      </div>

      {/* Save Status */}
      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}
      {saved && (
        <p className="rounded-lg bg-[#10a37f]/15 px-3 py-2 text-sm text-[#7ddec4]">
          Settings saved successfully
        </p>
      )}
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Manage your notification preferences.</p>
      <div className="space-y-3">
        {['Email notifications', 'Push notifications', 'Chat updates', 'Product announcements'].map((item) => (
          <div key={item} className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-sm text-white/80">{item}</span>
            <button
              type="button"
              className="relative h-5 w-9 rounded-full bg-[#10a37f] transition-colors"
            >
              <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPersonalization = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Personalize your KhostiGPT experience.</p>
      <div className="space-y-3">
        {['Remember my preferences', 'Personalized suggestions', 'Content customization', 'Adaptive responses'].map((item) => (
          <div key={item} className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-sm text-white/80">{item}</span>
            <button
              type="button"
              className="relative h-5 w-9 rounded-full bg-[#10a37f] transition-colors"
            >
              <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlugins = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Manage your plugins and integrations.</p>
      <div className="space-y-2">
        {['Web Search', 'Code Interpreter', 'Data Analysis', 'Image Generation'].map((item) => (
          <div key={item} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
            <span className="text-sm text-white/80">{item}</span>
            <button
              type="button"
              className="relative h-5 w-9 rounded-full bg-[#10a37f] transition-colors"
            >
              <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVoice = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Configure your voice settings.</p>
      <div className="space-y-3">
        {['Voice input', 'Voice output', 'Voice activation', 'Language detection'].map((item) => (
          <div key={item} className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-sm text-white/80">{item}</span>
            <button
              type="button"
              className="relative h-5 w-9 rounded-full bg-[#10a37f] transition-colors"
            >
              <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-4">
      <div className="rounded-xl bg-gradient-to-r from-[#10a37f]/10 to-[#10a37f]/5 border border-[#10a37f]/20 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-medium text-white">Current plan: Free</h4>
            <p className="text-xs text-white/50 mt-0.5">
              Upgrade to access more features and higher limits.
            </p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-[#10a37f] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0d8c6c] transition-colors">
            <Crown className="h-3.5 w-3.5" />
            Upgrade
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {['Payment method', 'Billing history', 'Invoices', 'Subscription settings'].map((item) => (
          <button key={item} className="flex w-full items-center justify-between rounded-lg border border-white/5 px-3 py-2 hover:bg-white/5 transition-colors">
            <span className="text-sm text-white/80">{item}</span>
            <ChevronRight className="h-4 w-4 text-white/30" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderUsage = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Monitor your usage and limits.</p>
      <div className="space-y-3">
        {['Messages used', 'API calls', 'Storage used', 'Monthly limits'].map((item) => (
          <div key={item} className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-sm text-white/80">{item}</span>
            <span className="text-sm text-white/40">0 / Unlimited</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">View your analytics and insights.</p>
      <div className="space-y-3">
        {['Conversation analytics', 'Response time', 'User satisfaction', 'Feature usage'].map((item) => (
          <div key={item} className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-sm text-white/80">{item}</span>
            <span className="text-sm text-[#10a37f]">View</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDataControls = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Control your data and privacy.</p>
      <div className="space-y-3">
        {['Export data', 'Delete data', 'Data retention', 'Privacy settings'].map((item) => (
          <button key={item} className="flex w-full items-center justify-between rounded-lg border border-white/5 px-3 py-2 hover:bg-white/5 transition-colors">
            <span className="text-sm text-white/80">{item}</span>
            <ChevronRight className="h-4 w-4 text-white/30" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderStorage = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Manage your storage.</p>
      <div className="space-y-3">
        {['Total storage', 'Used storage', 'File storage', 'Cache settings'].map((item) => (
          <div key={item} className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-sm text-white/80">{item}</span>
            <span className="text-sm text-white/40">0 MB / 1 GB</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSafety = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Configure safety settings.</p>
      <div className="space-y-3">
        {['Content filtering', 'Safety warnings', 'Parental controls', 'Safe search'].map((item) => (
          <div key={item} className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-sm text-white/80">{item}</span>
            <button
              type="button"
              className="relative h-5 w-9 rounded-full bg-[#10a37f] transition-colors"
            >
              <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurityLogin = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Manage your security and login settings.</p>
      <div className="space-y-3">
        {['Password', 'Two-factor authentication', 'Login history', 'Active sessions', 'Security keys'].map((item) => (
          <button key={item} className="flex w-full items-center justify-between rounded-lg border border-white/5 px-3 py-2 hover:bg-white/5 transition-colors">
            <span className="text-sm text-white/80">{item}</span>
            <ChevronRight className="h-4 w-4 text-white/30" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotifications();
      case 'personalization':
        return renderPersonalization();
      case 'plugins':
        return renderPlugins();
      case 'voice':
        return renderVoice();
      case 'billing':
        return renderBilling();
      case 'usage':
        return renderUsage();
      case 'analytics':
        return renderAnalytics();
      case 'data-controls':
        return renderDataControls();
      case 'storage':
        return renderStorage();
      case 'safety':
        return renderSafety();
      case 'security-login':
        return renderSecurityLogin();
      default:
        return (
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-white/30">Section coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex h-[600px] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-2xl">
        {/* ================= LEFT SIDEBAR ================= */}
        <div className="flex w-[220px] shrink-0 flex-col border-r border-white/5 bg-[#212121]">
          {/* Header */}
          <div className="border-b border-white/5 px-4 py-4">
            <h2 className="text-base font-semibold text-white">Settings</h2>
          </div>

          {/* Search */}
          <div className="px-3 py-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
              <input
                type="text"
                placeholder="Search settings"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full rounded-lg
                  bg-white/5
                  border border-white/5
                  pl-8 pr-3 py-1.5
                  text-sm text-white/80
                  placeholder:text-white/20
                  focus:outline-none focus:border-[#10a37f]/50
                  transition-colors
                "
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="space-y-0.5">
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    flex w-full items-center gap-3
                    rounded-lg px-3 py-2
                    text-sm transition-all
                    ${
                      activeSection === section.id
                        ? 'bg-white/10 text-white'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <section.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <span className="flex-1 text-left truncate">{section.label}</span>
                  {activeSection === section.id && (
                    <ChevronRight className="h-3.5 w-3.5 text-white/30" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-3.5">
            <h3 className="text-sm font-medium text-white">
              {SETTINGS_SECTIONS.find(s => s.id === activeSection)?.label || 'Settings'}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close settings"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {renderSectionContent()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-white/5 px-6 py-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-1.5 text-sm text-white/60 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => void onSave()}
              className="rounded-lg bg-[#10a37f] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#0d8c6c] disabled:opacity-60 transition-colors"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}