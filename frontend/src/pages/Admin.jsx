import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { api, setToken, mediaUrl } from '../api/client'
import { uploadToCloudinary, isCloudinaryUploadEnabled } from '../api/cloudinary'
import '../admin.css'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'comments', label: 'Comments' },
  { id: 'messages', label: 'Messages' },
  { id: 'settings', label: 'Password' },
]

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [gallery, setGallery] = useState([])
  const [comments, setComments] = useState([])
  const [messages, setMessages] = useState([])
  const [notice, setNotice] = useState('')

  const showNotice = useCallback((msg) => {
    setNotice(msg)
    setTimeout(() => setNotice(''), 3000)
  }, [])

  const loadAll = useCallback(async () => {
    try {
      const [s, g, c, m] = await Promise.all([
        api.getStats(),
        api.getGalleryAll(),
        api.getCommentsAll(),
        api.getMessages(),
      ])
      setStats(s && typeof s === 'object' ? s : null)
      setGallery(Array.isArray(g) ? g : [])
      setComments(Array.isArray(c) ? c : [])
      setMessages(Array.isArray(m) ? m : [])
    } catch (err) {
      showNotice(err.message || 'Could not load admin data')
      setGallery([])
      setComments([])
      setMessages([])
    }
  }, [showNotice])

  useEffect(() => {
    const token = sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token')
    if (!token) {
      localStorage.removeItem('admin_token')
      setLoading(false)
      return
    }
    if (localStorage.getItem('admin_token') && !sessionStorage.getItem('admin_token')) {
      sessionStorage.setItem('admin_token', localStorage.getItem('admin_token'))
      localStorage.removeItem('admin_token')
    }

    api
      .checkAuth()
      .then(() => {
        setAuthed(true)
        return loadAll()
      })
      .catch(() => {
        setToken(null)
        setAuthed(false)
      })
      .finally(() => setLoading(false))
  }, [loadAll])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    try {
      const { token } = await api.login(password)
      setToken(token)
      setAuthed(true)
      await loadAll()
    } catch (err) {
      setLoginError(err.message || 'Wrong password. Try again.')
    }
  }

  const logout = () => {
    setToken(null)
    setAuthed(false)
  }

  if (loading) {
    return (
      <div className="admin admin--center">
        <p>Loading…</p>
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="admin admin--login">
        <div className="admin-login">
          <h1>Beyond Silence</h1>
          <p className="admin-login__subtitle">Private admin area</p>
          <form onSubmit={handleLogin}>
            <label className="admin-login__label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            {loginError && <p className="admin-error">{loginError}</p>}
            <button type="submit" className="btn btn--primary">
              Sign in
            </button>
          </form>
          <Link to="/" className="admin-back">
            ← Back to site
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="admin">
      <header className="admin-header">
        <div>
          <h1>Admin</h1>
          <p>Beyond Silence · Rahwa Kahsay Tesfamariam</p>
        </div>
        <div className="admin-header__actions">
          <Link to="/" className="btn btn--outline btn--sm">
            View site
          </Link>
          <button type="button" className="btn btn--sm admin-btn-muted" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      {notice && <div className="admin-notice">{notice}</div>}

      <nav className="admin-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`admin-tabs__btn ${tab === t.id ? 'is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.id === 'comments' && stats?.pendingComments > 0 && (
              <span className="admin-badge">{stats.pendingComments}</span>
            )}
            {t.id === 'messages' && stats?.pendingMessages > 0 && (
              <span className="admin-badge">{stats.pendingMessages}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="admin-body">
        {tab === 'overview' && <AdminOverview stats={stats} comments={comments} messages={messages} />}
        {tab === 'gallery' && (
          <AdminGallery gallery={gallery} onRefresh={loadAll} onNotice={showNotice} />
        )}
        {tab === 'comments' && (
          <AdminComments
            comments={comments}
            gallery={gallery}
            onRefresh={loadAll}
            onNotice={showNotice}
          />
        )}
        {tab === 'messages' && (
          <AdminMessages messages={messages} onRefresh={loadAll} onNotice={showNotice} />
        )}
        {tab === 'settings' && <AdminSettings onNotice={showNotice} />}
      </div>
    </div>
  )
}

function AdminOverview({ stats, comments, messages }) {
  const commentList = Array.isArray(comments) ? comments : []
  const messageList = Array.isArray(messages) ? messages : []
  const pendingC = commentList.filter((c) => c.status === 'pending')
  const pendingM = messageList.filter((m) => m.status === 'pending')

  return (
    <div className="admin-panel">
      <div className="admin-stats">
        <div className="admin-stat">
          <span className="admin-stat__num">{stats?.galleryCount ?? 0}</span>
          <span>Gallery items</span>
        </div>
        <div className="admin-stat admin-stat--warn">
          <span className="admin-stat__num">{stats?.pendingComments ?? 0}</span>
          <span>Pending comments</span>
        </div>
        <div className="admin-stat admin-stat--warn">
          <span className="admin-stat__num">{stats?.pendingMessages ?? 0}</span>
          <span>Pending messages</span>
        </div>
      </div>
      <h2>Needs your attention</h2>
      {pendingC.length === 0 && pendingM.length === 0 ? (
        <p className="admin-empty">Nothing pending. All caught up.</p>
      ) : (
        <ul className="admin-list">
          {pendingC.slice(0, 3).map((c) => (
            <li key={c.id}>
              <strong>Comment</strong> on {c.gallery_caption || c.gallery_id}: {c.text.slice(0, 80)}…
            </li>
          ))}
          {pendingM.slice(0, 3).map((m) => (
            <li key={m.id}>
              <strong>{m.type}</strong> from {m.name}: {m.subject}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function AdminGallery({ gallery, onRefresh, onNotice }) {
  const items = Array.isArray(gallery) ? gallery : []
  const [caption, setCaption] = useState('')
  const [credit, setCredit] = useState('')
  const [link, setLink] = useState('')
  const [file, setFile] = useState(null)
  const [publishPublic, setPublishPublic] = useState(true)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file || !caption.trim()) {
      onNotice('Choose an image or video and add a caption.')
      return
    }
    setUploading(true)
    try {
      const publicUrl = await uploadToCloudinary(file)

      const fd = new FormData()
      fd.append('src', publicUrl)
      fd.append('type', file.type.startsWith('video/') ? 'video' : 'image')
      fd.append('caption', caption.trim())
      fd.append('credit', credit)
      fd.append('link', link)
      fd.append('published', publishPublic ? 'true' : 'false')
      await api.postGallery(fd)
      setCaption('')
      setCredit('')
      setLink('')
      setFile(null)
      onNotice(publishPublic ? 'Published on public gallery' : 'Saved as hidden — click Publish when ready')
      await onRefresh()
    } catch (err) {
      onNotice(err.message)
    } finally {
      setUploading(false)
    }
  }

  const togglePublish = async (item) => {
    await api.patchGallery(item.id, { published: !item.published })
    onNotice(item.published ? 'Unpublished' : 'Published')
    await onRefresh()
  }

  const remove = async (id) => {
    if (!confirm('Delete this item?')) return
    await api.deleteGallery(id)
    onNotice('Deleted')
    await onRefresh()
  }

  return (
    <div className="admin-panel">
      <h2>Post image or video</h2>
      <form className="admin-form" onSubmit={handleUpload}>
        <label>
          File (image or video)
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
        <label>
          Caption *
          <textarea
            className="admin-caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={6}
            required
          />
        </label>
        <label>
          Credit
          <input value={credit} onChange={(e) => setCredit(e.target.value)} />
        </label>
        <label>
          Link
          <input value={link} onChange={(e) => setLink(e.target.value)} type="url" />
        </label>
        <label className="checkbox admin-checkbox">
          <input
            type="checkbox"
            checked={publishPublic}
            onChange={(e) => setPublishPublic(e.target.checked)}
          />
          <span>Visible on public gallery (uncheck to save as hidden draft)</span>
        </label>
        <button type="submit" className="btn btn--primary" disabled={uploading || !file}>
          {uploading ? 'Uploading…' : publishPublic ? 'Publish to gallery' : 'Save as hidden'}
        </button>
        {!isCloudinaryUploadEnabled() && (
          <p className="admin-hint admin-hint--warn">
            Cloudinary env vars missing — uploads may not appear on the public site.
          </p>
        )}
      </form>

      <h2>All gallery items ({items.length})</h2>
      <ul className="admin-gallery-list">
        {items.map((item) => (
          <li key={item.id} className="admin-gallery-item">
            {item.type === 'video' ? (
              <video src={mediaUrl(item.src)} className="admin-gallery-item__thumb" muted />
            ) : (
              <img src={mediaUrl(item.src)} alt="" className="admin-gallery-item__thumb" />
            )}
            <div className="admin-gallery-item__info">
              <p>{item.caption}</p>
              <span className={`admin-tag ${item.published ? 'admin-tag--ok' : 'admin-tag--off'}`}>
                {item.published ? 'Live' : 'Hidden'}
              </span>
            </div>
            <div className="admin-gallery-item__actions">
              <button type="button" className="btn btn--sm" onClick={() => togglePublish(item)}>
                {item.published ? 'Hide' : 'Publish'}
              </button>
              <button type="button" className="btn btn--sm admin-btn-danger" onClick={() => remove(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AdminComments({ comments, gallery, onRefresh, onNotice }) {
  const list = Array.isArray(comments) ? comments : []
  const galleryItems = Array.isArray(gallery) ? gallery : []
  const [postGalleryId, setPostGalleryId] = useState('')
  const [postName, setPostName] = useState('Beyond Silence')
  const [postText, setPostText] = useState('')
  const [postError, setPostError] = useState('')
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    if (!postGalleryId && galleryItems[0]?.id) {
      setPostGalleryId(galleryItems[0].id)
    }
  }, [galleryItems, postGalleryId])

  const setStatus = async (id, status) => {
    try {
      await api.patchComment(id, status)
      onNotice(status === 'approved' ? 'Comment approved — now visible on gallery' : status === 'rejected' ? 'Rejected' : 'Updated')
      await onRefresh()
    } catch (err) {
      onNotice(err.message || 'Could not update comment')
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this comment permanently?')) return
    try {
      await api.deleteComment(id)
      onNotice('Comment deleted')
      await onRefresh()
    } catch (err) {
      onNotice(err.message || 'Could not delete comment')
    }
  }

  const handlePost = async (e) => {
    e.preventDefault()
    setPostError('')
    if (!postGalleryId || !postText.trim()) {
      setPostError('Choose a gallery item and enter comment text.')
      return
    }
    setPosting(true)
    try {
      await api.postAdminComment({
        galleryId: postGalleryId,
        name: postName.trim() || 'Beyond Silence',
        text: postText.trim(),
        status: 'approved',
      })
      setPostText('')
      onNotice('Comment published on gallery')
      await onRefresh()
    } catch (err) {
      setPostError(err.message || 'Could not post comment')
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="admin-panel">
      <h2>Post a comment (admin)</h2>
      <p className="admin-settings-hint">
        Admin comments are published immediately on the gallery — no approval needed.
      </p>
      <form className="admin-form admin-form--narrow" onSubmit={handlePost}>
        <label>
          Gallery item *
          <select
            value={postGalleryId}
            onChange={(e) => setPostGalleryId(e.target.value)}
            required
          >
            {galleryItems.length === 0 && <option value="">No gallery items</option>}
            {galleryItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.caption?.slice(0, 80) || item.id}
              </option>
            ))}
          </select>
        </label>
        <label>
          Name
          <input
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            maxLength={80}
          />
        </label>
        <label>
          Comment *
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows={3}
            required
            maxLength={500}
            placeholder="Write a comment to publish on the gallery…"
          />
        </label>
        {postError && <p className="admin-error">{postError}</p>}
        <button type="submit" className="btn btn--primary" disabled={posting || galleryItems.length === 0}>
          {posting ? 'Publishing…' : 'Publish comment'}
        </button>
      </form>

      <h2>User comments ({list.length})</h2>
      {list.length === 0 ? (
        <p className="admin-empty">No comments yet.</p>
      ) : (
        <ul className="admin-card-list">
          {list.map((c) => (
            <li key={c.id} className="admin-card">
              <div className="admin-card__head">
                <strong>{c.name}</strong>
                <span className={`admin-tag admin-tag--${c.status}`}>{c.status}</span>
              </div>
              <p className="admin-card__meta">On: {c.gallery_caption || c.gallery_id}</p>
              <p>{c.text}</p>
              <time>{new Date(c.created_at).toLocaleString()}</time>
              <div className="admin-card__actions">
                {c.status === 'pending' && (
                  <>
                    <button type="button" className="btn btn--primary btn--sm" onClick={() => setStatus(c.id, 'approved')}>
                      Approve
                    </button>
                    <button type="button" className="btn btn--sm" onClick={() => setStatus(c.id, 'rejected')}>
                      Reject
                    </button>
                  </>
                )}
                {c.status === 'approved' && (
                  <button type="button" className="btn btn--sm" onClick={() => setStatus(c.id, 'rejected')}>
                    Unpublish
                  </button>
                )}
                {c.status === 'rejected' && (
                  <button type="button" className="btn btn--sm" onClick={() => setStatus(c.id, 'approved')}>
                    Approve
                  </button>
                )}
                <button type="button" className="btn btn--sm admin-btn-danger" onClick={() => remove(c.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function parseUploadPaths(body) {
  if (!body) return []
  return body.split('\n').map((l) => l.trim()).filter((line) => /^\/uploads\/.+/.test(line))
}

function isVideoPath(src) {
  return /\.(mp4|webm|mov|ogg)$/i.test(src)
}

function PublishFileToGallery({ src, defaultCaption, onNotice, onRefresh }) {
  const [caption, setCaption] = useState(defaultCaption || '')
  const [publishing, setPublishing] = useState(false)

  const publish = async (makePublic) => {
    if (!caption.trim()) {
      onNotice('Add a caption before publishing')
      return
    }
    setPublishing(true)
    try {
      await api.publishToGallery({
        src,
        caption: caption.trim(),
        published: makePublic,
      })
      onNotice(makePublic ? 'Now visible on public gallery' : 'Saved to gallery as hidden')
      await onRefresh()
    } catch (err) {
      onNotice(err.message || 'Could not publish')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className="admin-publish-file">
      {isVideoPath(src) ? (
        <video src={mediaUrl(src)} className="admin-publish-file__media" controls muted />
      ) : (
        <img src={mediaUrl(src)} alt="" className="admin-publish-file__media" />
      )}
      <label>
        Gallery caption
        <textarea
          className="admin-caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={5}
          maxLength={500}
        />
      </label>
      <div className="admin-card__actions">
        <button
          type="button"
          className="btn btn--primary btn--sm"
          disabled={publishing}
          onClick={() => publish(true)}
        >
          {publishing ? 'Publishing…' : 'Publish publicly'}
        </button>
        <button type="button" className="btn btn--sm" disabled={publishing} onClick={() => publish(false)}>
          Save hidden
        </button>
      </div>
    </div>
  )
}

function MessageBody({ body, message, onNotice, onRefresh }) {
  if (!body) return null
  const lines = body.split('\n')
  const uploadPaths = parseUploadPaths(body)
  const showPublish = message?.type === 'evidence' && uploadPaths.length > 0 && onNotice && onRefresh

  return (
    <div className="admin-card__body">
      {lines.map((line, i) => {
        const uploadMatch = line.match(/^(\/uploads\/.+)$/)
        if (uploadMatch) {
          const href = mediaUrl(uploadMatch[1])
          const name = uploadMatch[1].split('/').pop()
          const src = uploadMatch[1]
          return (
            <div key={`${i}-${line}`}>
              {isVideoPath(src) ? (
                <video src={href} className="admin-msg-media" controls muted />
              ) : (
                <img src={href} alt={name} className="admin-msg-media" />
              )}
              <p>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              </p>
            </div>
          )
        }
        if (line.startsWith('Uploaded files:') || line.startsWith('Notes about files:')) {
          return (
            <p key={`${i}-${line}`}>
              <strong>{line}</strong>
            </p>
          )
        }
        return line ? <p key={`${i}-${line}`}>{line}</p> : <br key={`${i}-br`} />
      })}
      {showPublish &&
        uploadPaths.map((src) => (
          <PublishFileToGallery
            key={src}
            src={src}
            defaultCaption={message.subject?.replace(/^Evidence submission:\s*/i, '') || ''}
            onNotice={onNotice}
            onRefresh={onRefresh}
          />
        ))}
    </div>
  )
}

function AdminMessages({ messages, onRefresh, onNotice }) {
  const list = Array.isArray(messages) ? messages : []
  const setStatus = async (id, status) => {
    await api.patchMessage(id, status)
    onNotice(status === 'accepted' ? 'Request accepted' : 'Updated')
    await onRefresh()
  }

  const remove = async (id) => {
    if (!confirm('Delete this message permanently?')) return
    await api.deleteMessage(id)
    onNotice('Message deleted')
    await onRefresh()
  }

  return (
    <div className="admin-panel">
      <h2>Messages & requests ({list.length})</h2>
      {list.length === 0 ? (
        <p className="admin-empty">No messages yet.</p>
      ) : (
        <ul className="admin-card-list">
          {list.map((m) => (
            <li key={m.id} className="admin-card">
              <div className="admin-card__head">
                <strong>{m.name}</strong>
                <span className={`admin-tag admin-tag--${m.status}`}>{m.status}</span>
                <span className="admin-tag">{m.type}</span>
              </div>
              <p className="admin-card__meta">
                <a href={`mailto:${m.email}`}>{m.email}</a> · {m.subject}
              </p>
              <MessageBody body={m.body} message={m} onNotice={onNotice} onRefresh={onRefresh} />
              <time>{new Date(m.created_at).toLocaleString()}</time>
              <div className="admin-card__actions">
                {m.status === 'pending' && (
                  <>
                    <button type="button" className="btn btn--primary btn--sm" onClick={() => setStatus(m.id, 'accepted')}>
                      Accept
                    </button>
                    <button type="button" className="btn btn--sm" onClick={() => setStatus(m.id, 'read')}>
                      Mark read
                    </button>
                    <button type="button" className="btn btn--sm" onClick={() => setStatus(m.id, 'rejected')}>
                      Reject
                    </button>
                  </>
                )}
                {m.status !== 'pending' && m.status !== 'read' && (
                  <button type="button" className="btn btn--sm" onClick={() => setStatus(m.id, 'read')}>
                    Mark read
                  </button>
                )}
                <button type="button" className="btn btn--sm admin-btn-danger" onClick={() => remove(m.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function AdminSettings({ onNotice }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (next !== confirm) {
      setError('New passwords do not match')
      return
    }
    if (next.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }
    setSaving(true)
    try {
      await api.changePassword(current, next)
      setCurrent('')
      setNext('')
      setConfirm('')
      onNotice('Password changed! Use the new password next time you log in.')
    } catch (err) {
      setError(err.message || 'Could not change password')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-panel">
      <h2>Change admin password</h2>
      <p className="admin-settings-hint">
        Log in once, then set your own password here. After you save, the old password
        (including the default) will no longer work.
      </p>
      <form className="admin-form admin-form--narrow" onSubmit={handleSubmit}>
        <label>
          Current password *
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
        <label>
          New password * (min. 6 characters)
          <input
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            autoComplete="new-password"
          />
        </label>
        <label>
          Confirm new password *
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
          />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Saving…' : 'Update password'}
        </button>
      </form>
    </div>
  )
}
