const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim()
const uploadPreset = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '').trim()

export function isCloudinaryUploadEnabled() {
  return Boolean(cloudName && uploadPreset)
}

/**
 * Upload a file directly to Cloudinary (unsigned preset).
 * Returns a permanent public HTTPS URL — works without backend disk storage.
 */
export async function uploadToCloudinary(file) {
  if (!isCloudinaryUploadEnabled()) {
    throw new Error(
      'Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET on Vercel, then redeploy.',
    )
  }

  const resourceType = file.type?.startsWith('video/') ? 'video' : 'image'
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`

  const body = new FormData()
  body.append('file', file)
  body.append('upload_preset', uploadPreset)
  body.append('folder', 'beyond-silence')

  const res = await fetch(url, { method: 'POST', body })
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const msg = data.error?.message || data.message || `Cloudinary upload failed (${res.status})`
    if (/upload preset/i.test(msg)) {
      throw new Error(
        `${msg}. In Cloudinary Dashboard → Settings → Upload → add an unsigned preset named "${uploadPreset}".`,
      )
    }
    throw new Error(msg)
  }

  if (!data.secure_url) {
    throw new Error('Cloudinary did not return a public URL')
  }

  return data.secure_url
}
