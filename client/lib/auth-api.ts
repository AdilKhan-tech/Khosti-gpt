const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  plan: string;
  model: string;
  theme: string;
  language: string;
  accent_color: string;
  higher_intelligence: boolean;
  dictation: boolean;
  created_at?: string;
  updated_at?: string;
  custom_instructions?: string;
  email_notifications: boolean;
  push_notifications: boolean;
  chat_updates: boolean;
  product_announcements: boolean;
  remember_preferences: boolean;
  personalized_suggestions: boolean;
  content_customization: boolean;
  adaptive_responses: boolean;
  web_search: boolean;
  code_interpreter: boolean;
  data_analysis: boolean;
  image_generation: boolean;
  voice_input: boolean;
  voice_output: boolean;
  voice_activation: boolean;
  language_detection: boolean;
  content_filtering: boolean;
  safety_warnings: boolean;
  parental_controls: boolean;
  safe_search: boolean;
  data_retention_days: number;
  cache_enabled: boolean;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

async function parseError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as {
      message?: string | string[];
    };
    if (typeof data.message === 'string') return data.message;
    if (Array.isArray(data.message)) return data.message.join(', ');
  } catch {
    // ignore
  }
  return `Request failed (${response.status})`;
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}

export async function loginUser(input: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}

export async function fetchMe(token: string): Promise<AuthUser> {
  const response = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}

export async function updateProfile(
  token: string,
  input: Partial<Omit<AuthUser, 'id' | 'email' | 'created_at' | 'updated_at'>>,
): Promise<{ message: string; user: AuthUser }> {
  const response = await fetch(`${API_BASE}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}
