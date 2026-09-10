'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  fetchMe,
  loginUser,
  registerUser,
  updateProfile,
  type AuthUser,
} from '@/lib/auth-api';

const TOKEN_KEY = 'khosti-gpt-token';

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  saveSettings: (
    input: Partial<Omit<AuthUser, 'id' | 'email' | 'created_at' | 'updated_at'>>,
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (!saved) {
      setLoading(false);
      return;
    }

    setToken(saved);
    fetchMe(saved)
      .then((profile) => setUser(profile))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const accentColors: Record<string, string> = {
      default: '#10a37f',
      blue: '#3b82f6',
      purple: '#8b5cf6',
      pink: '#ec4899',
      orange: '#f97316',
    };
    document.documentElement.style.setProperty(
      '--accent',
      accentColors[user?.accent_color || 'default'] || accentColors.default,
    );
    document.documentElement.dataset.accent = user?.accent_color || 'default';

    const selectedTheme = user?.theme || 'system';
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
    const applyTheme = () => {
      document.documentElement.dataset.theme =
        selectedTheme === 'system' ? systemTheme : selectedTheme;
    };
    applyTheme();

    if (selectedTheme !== 'system') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleThemeChange = () => {
      document.documentElement.dataset.theme = mediaQuery.matches ? 'light' : 'dark';
    };
    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, [user?.accent_color, user?.theme]);

  const persist = useCallback((nextToken: string, nextUser: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await loginUser({ email, password });
      persist(result.token, result.user);
    },
    [persist],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const result = await registerUser({ name, email, password });
      persist(result.token, result.user);
    },
    [persist],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    const profile = await fetchMe(token);
    setUser(profile);
  }, [token]);

  const saveSettings = useCallback(
    async (input: Partial<Pick<AuthUser, 'name' | 'model' | 'theme'>>) => {
      if (!token) throw new Error('Not authenticated');
      const result = await updateProfile(token, input);
      setUser(result.user);
    },
    [token],
  );

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      refreshUser,
      saveSettings,
    }),
    [user, token, loading, login, register, logout, refreshUser, saveSettings],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
