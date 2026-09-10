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
import { useChat } from './ChatProvider';

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
  { value: 'default', label: 'Default', color: 'var(--accent)' },
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

type ToggleSettingKey =
  | 'email_notifications'
  | 'push_notifications'
  | 'chat_updates'
  | 'product_announcements'
  | 'remember_preferences'
  | 'personalized_suggestions'
  | 'content_customization'
  | 'adaptive_responses'
  | 'web_search'
  | 'code_interpreter'
  | 'data_analysis'
  | 'image_generation'
  | 'voice_input'
  | 'voice_output'
  | 'voice_activation'
  | 'language_detection'
  | 'content_filtering'
  | 'safety_warnings'
  | 'parental_controls'
  | 'safe_search';

const DEFAULT_TOGGLE_SETTINGS: Record<ToggleSettingKey, boolean> = {
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

export default function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user, saveSettings } = useAuth();
  const { conversations } = useChat();
  
  const [activeSection, setActiveSection] = useState('general');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Settings state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [appearance, setAppearance] = useState(user?.theme || 'dark');
  const [accentColor, setAccentColor] = useState(user?.accent_color || 'default');
  const [language, setLanguage] = useState(user?.language || 'en');
  const [higherIntelligence, setHigherIntelligence] = useState(user?.higher_intelligence ?? true);
  const [dictation, setDictation] = useState(user?.dictation ?? true);
  const [featureSettings, setFeatureSettings] = useState(DEFAULT_TOGGLE_SETTINGS);
  const [dataRetentionDays, setDataRetentionDays] = useState(30);
  const [cacheEnabled, setCacheEnabled] = useState(true);

  useEffect(() => {
    if (!open || !user) return;
    setName(user.name || '');
    setEmail(user.email || '');
    setAppearance(user.theme || 'dark');
    setAccentColor(user.accent_color || 'default');
    setLanguage(user.language || 'en');
    setHigherIntelligence(user.higher_intelligence ?? true);
    setDictation(user.dictation ?? true);
    setFeatureSettings({
      email_notifications: user.email_notifications ?? true,
      push_notifications: user.push_notifications ?? true,
      chat_updates: user.chat_updates ?? true,
      product_announcements: user.product_announcements ?? true,
      remember_preferences: user.remember_preferences ?? true,
      personalized_suggestions: user.personalized_suggestions ?? true,
      content_customization: user.content_customization ?? true,
      adaptive_responses: user.adaptive_responses ?? true,
      web_search: user.web_search ?? true,
      code_interpreter: user.code_interpreter ?? true,
      data_analysis: user.data_analysis ?? true,
      image_generation: user.image_generation ?? true,
      voice_input: user.voice_input ?? true,
      voice_output: user.voice_output ?? true,
      voice_activation: user.voice_activation ?? true,
      language_detection: user.language_detection ?? true,
      content_filtering: user.content_filtering ?? true,
      safety_warnings: user.safety_warnings ?? true,
      parental_controls: user.parental_controls ?? false,
      safe_search: user.safe_search ?? true,
    });
    setDataRetentionDays(user.data_retention_days ?? 30);
    setCacheEnabled(user.cache_enabled ?? true);
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
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const upgradePlan = async () => {
    setSaving(true);
    setError('');
    try {
      await saveSettings({ plan: 'pro' });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upgrade plan');
    } finally {
      setSaving(false);
    }
  };

  const toggleSetting = (key: ToggleSettingKey) => {
    setFeatureSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  const renderToggleRows = (items: Array<{ key: ToggleSettingKey; label: string }>) => (
    <div className="space-y-3">
      {items.map((item) => {
        const enabled = featureSettings[item.key];
        return (
          <div key={item.key} className="flex items-center justify-between border-b border-white/5 py-2">
            <span className="text-sm text-white/80">{item.label}</span>
            <button
              type="button"
              aria-pressed={enabled}
              onClick={() => toggleSetting(item.key)}
              className={`relative h-5 w-9 rounded-full transition-colors ${enabled ? 'bg-[var(--accent)]' : 'bg-white/20'}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${enabled ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        );
      })}
    </div>
  );

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
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-white'
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
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-white'
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
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-white'
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
            ${higherIntelligence ? 'bg-[var(--accent)]' : 'bg-white/20'}
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
            ${dictation ? 'bg-[var(--accent)]' : 'bg-white/20'}
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
      {renderToggleRows([
        { key: 'email_notifications', label: 'Email notifications' },
        { key: 'push_notifications', label: 'Push notifications' },
        { key: 'chat_updates', label: 'Chat updates' },
        { key: 'product_announcements', label: 'Product announcements' },
      ])}
    </div>
  );

  const renderPersonalization = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Personalize your KhostiGPT experience.</p>
      {renderToggleRows([
        { key: 'remember_preferences', label: 'Remember my preferences' },
        { key: 'personalized_suggestions', label: 'Personalized suggestions' },
        { key: 'content_customization', label: 'Content customization' },
        { key: 'adaptive_responses', label: 'Adaptive responses' },
      ])}
    </div>
  );

  const renderPlugins = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Manage your plugins and integrations.</p>
      {renderToggleRows([
        { key: 'web_search', label: 'Web Search' },
        { key: 'code_interpreter', label: 'Code Interpreter' },
        { key: 'data_analysis', label: 'Data Analysis' },
        { key: 'image_generation', label: 'Image Generation' },
      ])}
    </div>
  );

  const renderVoice = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Configure your voice settings.</p>
      {renderToggleRows([
        { key: 'voice_input', label: 'Voice input' },
        { key: 'voice_output', label: 'Voice output' },
        { key: 'voice_activation', label: 'Voice activation' },
        { key: 'language_detection', label: 'Language detection' },
      ])}
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-4">
      <div className="rounded-xl bg-gradient-to-r from-[#10a37f]/10 to-[#10a37f]/5 border border-[#10a37f]/20 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-medium capitalize text-white">Current plan: {user?.plan || 'Free'}</h4>
            <p className="text-xs text-white/50 mt-0.5">
              {user?.plan === 'pro' ? 'Pro features are enabled for this account.' : 'Upgrade to unlock higher limits and advanced features.'}
            </p>
          </div>
          {user?.plan !== 'pro' && (
            <button
              type="button"
              onClick={() => void upgradePlan()}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:opacity-90 disabled:opacity-60"
            >
              <Crown className="h-3.5 w-3.5" />
              {saving ? 'Upgrading...' : 'Upgrade'}
            </button>
          )}
        </div>
      </div>
      <div className="rounded-lg border border-white/5 px-3 py-3">
        <p className="text-sm text-white/80">Plan status</p>
        <p className="mt-1 text-xs text-white/40">
          {user?.plan === 'pro' ? 'Your Pro plan is active.' : 'Your account is currently on the Free plan.'}
        </p>
      </div>
    </div>
  );

  const renderUsage = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Monitor your usage and limits.</p>
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-sm text-white/80">Messages used</span>
          <span className="text-sm text-white/40">{conversations.reduce((total, chat) => total + chat.messages.length, 0)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-sm text-white/80">Conversations</span>
          <span className="text-sm text-white/40">{conversations.length}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-sm text-white/80">User messages</span>
          <span className="text-sm text-white/40">{conversations.reduce((total, chat) => total + chat.messages.filter((message) => message.role === 'user').length, 0)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-sm text-white/80">Data retention</span>
          <span className="text-sm text-white/40">{dataRetentionDays} days</span>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => {
    const assistantMessages = conversations.flatMap((chat) => chat.messages.filter((message) => message.role === 'assistant'));
    const completedReplies = assistantMessages.filter((message) => message.content.trim()).length;

    return (
    <div className="space-y-4">
      <p className="text-sm text-white/60">View your analytics and insights.</p>
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-sm text-white/80">Completed replies</span>
          <span className="text-sm text-[var(--accent)]">{completedReplies}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-sm text-white/80">Average messages / chat</span>
          <span className="text-sm text-[var(--accent)]">{conversations.length ? (conversations.reduce((total, chat) => total + chat.messages.length, 0) / conversations.length).toFixed(1) : '0.0'}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-sm text-white/80">Last activity</span>
          <span className="text-sm text-white/40">{conversations[0] ? new Date(conversations[0].updatedAt).toLocaleDateString() : 'No activity'}</span>
        </div>
      </div>
    </div>
    );
  };

  const renderDataControls = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Control your data and privacy.</p>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
          <div>
            <p className="text-sm text-white/80">Data retention</p>
            <p className="text-xs text-white/35">Days to keep conversation data</p>
          </div>
          <input
            type="number"
            min={1}
            max={3650}
            value={dataRetentionDays}
            onChange={(event) => setDataRetentionDays(Number(event.target.value) || 1)}
            className="w-20 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-right text-sm text-white outline-none focus:border-[var(--accent)]"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            const file = new Blob([JSON.stringify(conversations, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'khosti-gpt-conversations.json';
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="flex w-full items-center justify-between rounded-lg border border-white/5 px-3 py-2 hover:bg-white/5 transition-colors"
        >
          <span className="text-sm text-white/80">Export data</span>
          <ChevronRight className="h-4 w-4 text-white/30" />
        </button>
        <div className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2">
          <span className="text-sm text-white/80">Saved conversations</span>
          <span className="text-sm text-white/40">{conversations.length}</span>
        </div>
        <button type="button" className="flex w-full items-center justify-between rounded-lg border border-white/5 px-3 py-2 hover:bg-white/5 transition-colors">
          <span className="text-sm text-white/80">Privacy settings</span>
          <ChevronRight className="h-4 w-4 text-white/30" />
        </button>
      </div>
    </div>
  );

  const renderStorage = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Manage your storage.</p>
      <div className="space-y-3">
        {['Total storage', 'Used storage', 'File storage'].map((item, index) => (
          <div key={item} className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-sm text-white/80">{item}</span>
            <span className="text-sm text-white/40">{index === 0 ? 'Local' : index === 1 ? `${new Blob([JSON.stringify(conversations)]).size} bytes` : `${conversations.length} chats`}</span>
          </div>
        ))}
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-sm text-white/80">Cache settings</span>
          <button
            type="button"
            aria-pressed={cacheEnabled}
            onClick={() => setCacheEnabled((value) => !value)}
            className={`relative h-5 w-9 rounded-full transition-colors ${cacheEnabled ? 'bg-[var(--accent)]' : 'bg-white/20'}`}
          >
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${cacheEnabled ? 'right-0.5' : 'left-0.5'}`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderSafety = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Configure safety settings.</p>
      {renderToggleRows([
        { key: 'content_filtering', label: 'Content filtering' },
        { key: 'safety_warnings', label: 'Safety warnings' },
        { key: 'parental_controls', label: 'Parental controls' },
        { key: 'safe_search', label: 'Safe search' },
      ])}
    </div>
  );

  const renderSecurityLogin = () => (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Manage your security and login settings.</p>
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-sm text-white/80">Signed-in email</span>
          <span className="text-sm text-white/40">{user?.email || 'Unavailable'}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-sm text-white/80">Account created</span>
          <span className="text-sm text-white/40">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unavailable'}</span>
        </div>
        <div className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-sm text-white/80">Current session</span>
          <span className="text-sm text-[var(--accent)]">Active</span>
        </div>
        <p className="pt-2 text-xs text-white/35">Password changes and two-factor authentication require backend security endpoints.</p>
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