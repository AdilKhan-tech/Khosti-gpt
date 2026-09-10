'use client';

import { HelpCircle, Sparkles, User, X } from 'lucide-react';
import { useAuth } from './AuthProvider';

export type AccountPanel = 'profile' | 'personalization' | 'help';

const PANEL_CONTENT: Record<
  AccountPanel,
  { title: string; description: string; icon: typeof User }
> = {
  profile: {
    title: 'Profile',
    description: 'Your KhostiGPT account information.',
    icon: User,
  },
  personalization: {
    title: 'Personalization',
    description: 'Customize how KhostiGPT responds to you.',
    icon: Sparkles,
  },
  help: {
    title: 'Help',
    description: 'Find answers and support for KhostiGPT.',
    icon: HelpCircle,
  },
};

export default function AccountPanelModal({
  panel,
  onClose,
}: {
  panel: AccountPanel | null;
  onClose: () => void;
}) {
  const { user } = useAuth();

  if (!panel) return null;

  const content = PANEL_CONTENT[panel];
  const Icon = content.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-white/60" />
            <div>
              <h2 className="text-base font-semibold text-white">{content.title}</h2>
              <p className="mt-0.5 text-xs text-white/40">{content.description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          {panel === 'profile' && (
            <>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-white/40">Name</p>
                <p className="mt-1 text-sm text-white">{user?.name || 'Account'}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs text-white/40">Email</p>
                <p className="mt-1 text-sm text-white">{user?.email || 'Not available'}</p>
              </div>
            </>
          )}

          {panel === 'personalization' && (
            <>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-white">Response preferences</p>
                <p className="mt-1 text-xs leading-5 text-white/45">
                  Your language, model and response preferences can be managed from Settings.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                Open Settings to customize
              </button>
            </>
          )}

          {panel === 'help' && (
            <>
              <div className="space-y-3">
                {['How do I start a new chat?', 'How are my conversations saved?', 'How can I change my preferences?'].map((question) => (
                  <div key={question} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/80">{question}</p>
                    <p className="mt-1 text-xs text-white/40">Open Settings or start a new chat from the sidebar.</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-white/35">Need more help? Contact KhostiGPT support.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
