/** Same-origin /api on Vercel (proxy) and Render; optional direct URL in dev. */
export function getApiBase() {
  const fromEnv = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  if (!import.meta.env.PROD) return fromEnv
  if (typeof window === 'undefined') return fromEnv
  if (import.meta.env.VITE_API_DIRECT === 'true' && fromEnv) return fromEnv
  return ''
}

const API_BASE = getApiBase()

export function mediaUrl(src) {
  if (!src) return ''
  if (/^https?:\/\//i.test(src)) return src
  const path = src.startsWith('/') ? src : `/${src}`
  return API_BASE ? `${API_BASE}${path}` : path
}

function getToken() {
  return localStorage.getItem('admin_token')
}

export function setToken(token) {
  if (token) localStorage.setItem('admin_token', token)
  else localStorage.removeItem('admin_token')
  window.dispatchEvent(new Event('admin-token-changed'))
}

async function request(path, options = {}) {
  const headers = { ...options.headers }
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      credentials: API_BASE ? 'include' : 'same-origin',
    })
  } catch {
    throw new Error(
      'Cannot reach the server. On Vercel set VITE_API_URL to your Render URL and redeploy. On Render set ALLOW_VERCEL_PREVIEWS=true or fix ALLOWED_ORIGIN.',
    )
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status === 405) {
      throw new Error(
        'API not available on this host. Set VITE_API_URL on Vercel to your Render backend and redeploy.',
      )
    }
    if (res.status === 401) {
      throw new Error(data.error || 'Not signed in or session expired.')
    }
    throw new Error(data.error || res.statusText || `Request failed (${res.status})`)
  }
  return data
}

export const api = {
  health: () => request('/api/health'),
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
