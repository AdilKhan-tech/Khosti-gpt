'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from 'react';
import { fetchMe, loginUser, logoutUser, registerUser, updateProfile, } from '@/lib/auth-api';
const TOKEN_KEY = 'khosti-gpt-token';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => typeof window === 'undefined' ? null : localStorage.getItem(TOKEN_KEY));
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchMe(token)
            .then((profile) => {
            setUser(profile);
            if (token) {
                localStorage.removeItem(TOKEN_KEY);
                setToken(null);
            }
        })
            .catch(() => {
            if (token) {
                localStorage.removeItem(TOKEN_KEY);
                setToken(null);
            }
            setUser(null);
        })
            .finally(() => setLoading(false));
    }, [token]);
    useEffect(() => {
        const accentColors = {
            default: '#10a37f',
            blue: '#3b82f6',
            purple: '#8b5cf6',
            pink: '#ec4899',
            orange: '#f97316',
        };
        document.documentElement.style.setProperty('--accent', accentColors[user?.accent_color || 'default'] || accentColors.default);
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
        if (selectedTheme !== 'system')
            return;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        const handleThemeChange = () => {
            document.documentElement.dataset.theme = mediaQuery.matches ? 'light' : 'dark';
        };
        mediaQuery.addEventListener('change', handleThemeChange);
        return () => mediaQuery.removeEventListener('change', handleThemeChange);
    }, [user?.accent_color, user?.theme]);
    const persist = useCallback((_nextToken, nextUser) => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(nextUser);
    }, []);
    const login = useCallback(async (email, password) => {
        const result = await loginUser({ email, password });
        persist(result.token, result.user);
    }, [persist]);
    const register = useCallback(async (name, email, password) => {
        const result = await registerUser({ name, email, password });
        persist(result.token, result.user);
    }, [persist]);
    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        void logoutUser();
        setToken(null);
        setUser(null);
    }, []);
    const refreshUser = useCallback(async () => {
        const profile = await fetchMe(token);
        setUser(profile);
    }, [token]);
    const saveSettings = useCallback(async (input) => {
        const result = await updateProfile(token, input);
        setUser(result.user);
    }, [token]);
    const value = useMemo(() => ({
        user,
        token,
        loading,
        login,
        register,
        logout,
        refreshUser,
        saveSettings,
    }), [user, token, loading, login, register, logout, refreshUser, saveSettings]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
