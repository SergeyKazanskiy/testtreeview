const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://your-server.com/api';

let token: string | null = null;

export const api = {
  setToken(newToken: string) {
    token = newToken;
  },

  async get(endpoint: string) {
    return await makeRequest('GET', endpoint);
  },

  async post(endpoint: string, body?: any) {
    return await makeRequest('POST', endpoint, body);
  },

  async put(endpoint: string, body?: any) {
    return await makeRequest('PUT', endpoint, body);
  },

  async delete(endpoint: string) {
    return await makeRequest('DELETE', endpoint);
  },
};

async function makeRequest(method: string, endpoint: string, body?: any) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const error: any = new Error(`HTTP ${response.status}`);
    error.response = { status: response.status, data };
    throw error;
  }

  return { data, status: response.status };
}

export function setToken(newToken: string) {
  api.setToken(newToken);
}
