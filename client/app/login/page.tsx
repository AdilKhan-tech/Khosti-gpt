'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace('/dashboard');
  }, [loading, user, router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#212121] px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#171717] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center"><Logo /></div>
          <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-white/50">Log in to continue to KhostiGPT</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#212121] px-3 py-2.5 text-sm text-white outline-none focus:border-[#10a37f]"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#212121] px-3 py-2.5 text-sm text-white outline-none focus:border-[#10a37f]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-[#10a37f] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d8c6c] disabled:opacity-60"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/45">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#10a37f] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
