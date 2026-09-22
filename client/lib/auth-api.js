const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";
async function parseError(response) {
  try {
    const data = await response.json();
    if (typeof data.message === "string") return data.message;
    if (Array.isArray(data.message)) return data.message.join(", ");
  } catch {
    // ignore
  }
  return `Request failed (${response.status})`;
}
export async function registerUser(input) {
  const response = await fetch(`${API_BASE}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}
export async function loginUser(input) {
  const response = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}
export async function fetchMe(token) {
  const response = await fetch(`${API_BASE}/users/me`, {
    credentials: "include",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}
export async function updateProfile(token, input) {
  const response = await fetch(`${API_BASE}/users/me`, {
    method: "PATCH",
    headers: Object.assign(
      { "Content-Type": "application/json" },
      token ? { Authorization: `Bearer ${token}` } : {},
    ),
    credentials: "include",
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}
export async function logoutUser() {
  await fetch(`${API_BASE}/users/logout`, {
    method: "POST",
    credentials: "include",
  });
}
