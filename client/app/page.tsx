'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import { ChatProvider } from '@/components/ChatProvider';
import { useAuth } from '@/components/AuthProvider';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex h-dvh items-center justify-center bg-[#212121] text-white/60">
        Loading…
      </div>
    );
  }

  return (
    <ChatProvider>
      <div className="flex h-dvh overflow-hidden bg-[#212121]">
        <Sidebar />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}
