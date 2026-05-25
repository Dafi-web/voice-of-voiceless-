export default function ContentWarning({ children }) {
  return (
    <div className="content-warning" role="note">
      <strong>Content notice:</strong> {children}
    </div>
  )
}
