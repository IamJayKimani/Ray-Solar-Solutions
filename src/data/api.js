const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

export const getApiUrl = (path) => `${API_BASE_URL}${path}`;

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL.replace('/api', '')}/${imagePath}`;
};

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('ray-solar-access-token');
  const headers = new Headers(options.headers);

  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (!(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');

  const response = await fetch(getApiUrl(path), { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.msg || 'Request failed');
  }

  return data;
}