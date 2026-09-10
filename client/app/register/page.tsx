'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';

export default function RegisterPage() {
  const { register, user, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    router.replace('/');
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(name, email, password);
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#212121] px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#171717] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10a37f] text-lg font-bold text-white">
            K
          </div>
          <h1 className="text-2xl font-semibold text-white">Create account</h1>
          <p className="mt-2 text-sm text-white/50">Sign up to start chatting with KhostiGPT</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Name</label>
            <input
              type="text"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#212121] px-3 py-2.5 text-sm text-white outline-none focus:border-[#10a37f]"
              placeholder="Your name"
            />
          </div>
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
              placeholder="At least 6 characters"
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
            {submitting ? 'Creating…' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/45">
          Already have an account?{' '}
          <Link href="/login" className="text-[#10a37f] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
