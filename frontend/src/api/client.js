/** Backend URL from build env; empty in dev uses Vite proxy. */
export function getApiBase() {
  const fromEnv = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (
    import.meta.env.PROD &&
    typeof window !== 'undefined' &&
    window.location.hostname.includes('onrender.com')
  ) {
    return ''
  }
  return ''
}

const API_BASE = getApiBase()

function resolveMediaPath(src) {
  if (!src) return ''
  if (/^https?:\/\//i.test(src)) return src
  const path = src.startsWith('/') ? src : `/${src}`
  if (path.startsWith('/gallery/') || path.startsWith('/founder/')) return path
  if (path.startsWith('/uploads/') && API_BASE) return `${API_BASE}${path}`
  return API_BASE ? `${API_BASE}${path}` : path
}

function applyCloudinaryTransform(url, variant) {
  if (!url.includes('res.cloudinary.com') || variant === 'full') return url

  const isVideo = url.includes('/video/upload/')
  const transforms = {
    thumb: isVideo ? 'so_0,w_480,h_360,c_fill,q_auto,f_jpg' : 'w_480,h_360,c_fill,q_auto,f_auto',
    lightbox: isVideo ? null : 'w_1200,q_auto,f_auto',
  }
  const transform = transforms[variant]
  if (!transform) return url

  return url.replace(/\/upload\//, `/upload/${transform}/`)
}

/** @param {'thumb'|'lightbox'|'full'} [variant] */
export function mediaUrl(src, variant = 'full') {
  return applyCloudinaryTransform(resolveMediaPath(src), variant)
}

const TOKEN_KEY = 'admin_token'

function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token)
  else sessionStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(TOKEN_KEY)
  window.dispatchEvent(new Event('admin-token-changed'))
}

function isJsonResponse(res) {
  const type = res.headers.get('content-type') || ''
  return type.includes('application/json')
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
      'Cannot reach the server. Confirm Render is running and VITE_API_URL matches your Render URL, then redeploy Vercel.',
    )
  }

  if (path.startsWith('/api') && !isJsonResponse(res)) {
    if (res.status === 405 || res.status === 404) {
      throw new Error(
        'API not available on this site. Redeploy Vercel with VITE_API_URL set to your Render backend URL.',
      )
    }
    throw new Error(
      'Server returned an invalid response (expected JSON). Check VITE_API_URL and redeploy.',
    )
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      setToken(null)
      throw new Error(data.error || 'Session expired. Sign in again.')
    }
    if (res.status === 405) {
      throw new Error(
        'API not available (405). Set VITE_API_URL on Vercel to your Render URL and redeploy.',
      )
    }
    throw new Error(data.error || res.statusText || `Request failed (${res.status})`)
  }

  if (path === '/api/auth/check' && data.ok !== true) {
    setToken(null)
    throw new Error('Session expired. Sign in again.')
  }

  return data
}

function asArray(data) {
  if (Array.isArray(data)) return data
  return []
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

  getGallery: () => request('/api/gallery').then(asArray),
  getGalleryAll: () => request('/api/gallery/all').then(asArray),
  postGallery: (formData) => request('/api/gallery', { method: 'POST', body: formData }),
  publishToGallery: (body) =>
    request('/api/admin/gallery/publish', { method: 'POST', body: JSON.stringify(body) }),
  patchGallery: (id, body) =>
    request(`/api/gallery/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deleteGallery: (id) => request(`/api/gallery/${id}`, { method: 'DELETE' }),

  getComments: (galleryId) =>
    request(`/api/comments/${encodeURIComponent(galleryId)}`).then(asArray),
  getCommentsBatch: () => request('/api/comments/public'),
  postComment: (body) => request('/api/comments', { method: 'POST', body: JSON.stringify(body) }),
  postAdminComment: (body) =>
    request('/api/admin/comments', { method: 'POST', body: JSON.stringify(body) }),
  getCommentsAll: () => request('/api/admin/comments').then(asArray),
  patchComment: (id, status) =>
    request(`/api/comments/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteComment: (id) => request(`/api/comments/${id}`, { method: 'DELETE' }),

  postMessage: (body) => request('/api/messages', { method: 'POST', body: JSON.stringify(body) }),
  postEvidence: (formData) => request('/api/evidence', { method: 'POST', body: formData }),
  getMessages: () => request('/api/admin/messages').then(asArray),
  patchMessage: (id, status) =>
    request(`/api/messages/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteMessage: (id) => request(`/api/messages/${id}`, { method: 'DELETE' }),

  getStats: () => request('/api/admin/stats'),
}
