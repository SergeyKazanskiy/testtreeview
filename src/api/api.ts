import Constants from "expo-constants";

const appRole = Constants.expoConfig?.extra?.appRole;
let token: string | null = null;
let testUrl: string = '';


export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://admin.dinivrey.com';

export var BACKEND_APP_IMAGES_URL =
  process.env.EXPO_PUBLIC_IMAGES_URL ?? "";

export function setTestDestUrl(url: string) {
  testUrl = url;
  BACKEND_APP_IMAGES_URL =  testUrl.length > 0  ? `${testUrl}/images` : process.env.EXPO_PUBLIC_IMAGES_URL ?? "";
}


export const api = {

  setToken(newToken: string) {
    token = newToken;
  },

  setTestUrl(url: string) {
    testUrl = url;
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
  const destUrl = testUrl.length > 0 ? testUrl : API_BASE_URL
  const url = `${destUrl}/${appRole}_api/${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  //alert(`Making ${method} request to ${url} and Bearer ${token}`);


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

// export function setTestDestUrl(url: string) {
//   api.setTestUrl(url);
// }