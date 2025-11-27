import { Platform } from 'react-native';

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

// Allow an app-level override for the API base URL (useful when testing on a physical device)
// You can set `global.__API_BASE_URL__ = 'http://192.168.x.y:8080'` from the debugger or App entrypoint.
const OVERRIDE_BASE = (global as any)?.__API_BASE_URL__ as string | undefined;

const BASE_URL =
  OVERRIDE_BASE ||
  Platform.select({
    ios: 'http://127.0.0.1:8080',
    android: 'http://10.0.2.2:8080',
    default: 'http://localhost:8080',
  }) || 'http://localhost:8080';

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
};

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await res.json()) as T;
  }
  return (await res.text()) as unknown as T;
}

export const get = <T>(path: string) => request<T>(path);
export const post = <T>(path: string, body?: any) => request<T>(path, { method: 'POST', body });
export const put = <T>(path: string, body?: any) => request<T>(path, { method: 'PUT', body });
export const del = <T>(path: string) => request<T>(path, { method: 'DELETE' });
