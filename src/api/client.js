const API_BASE = import.meta.env.VITE_API_URL || ''

function getToken() {
  return localStorage.getItem('admin_token')
}

export function setToken(token) {
  if (token) localStorage.setItem('admin_token', token)
  else localStorage.removeItem('admin_token')
}

async function request(path, options = {}) {
  const headers = { ...options.headers }
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status === 405) {
      throw new Error('Server error: API not available. Redeploy with latest code or use Render hosting.')
    }
    throw new Error(data.error || res.statusText)
  }
  return data
}

export const api = {
  login: (password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),
  checkAuth: () => request('/api/auth/check'),
  changePassword: (currentPassword, newPassword) =>
    request('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  getGallery: () => request('/api/gallery'),
  getGalleryAll: () => request('/api/gallery/all'),
  postGallery: (formData) => request('/api/gallery', { method: 'POST', body: formData }),
  patchGallery: (id, body) =>
    request(`/api/gallery/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deleteGallery: (id) => request(`/api/gallery/${id}`, { method: 'DELETE' }),

  getComments: (galleryId) => request(`/api/comments/${galleryId}`),
  postComment: (body) => request('/api/comments', { method: 'POST', body: JSON.stringify(body) }),
  getCommentsAll: () => request('/api/comments'),
  patchComment: (id, status) =>
    request(`/api/comments/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  postMessage: (body) => request('/api/messages', { method: 'POST', body: JSON.stringify(body) }),
  getMessages: () => request('/api/messages'),
  patchMessage: (id, status) =>
    request(`/api/messages/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  getStats: () => request('/api/admin/stats'),
}
