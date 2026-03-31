export default function NavBar({ title, dark = false }) {
  const bg = dark ? '#161b22' : '#fff'
  const border = dark ? '#30363d' : '#e5e7eb'
  const muted = dark ? '#8b949e' : '#6b7280'
  const lighter = dark ? '#6e7681' : '#9ca3af'

  return (
    <div style={{ background: bg, borderBottom: `1px solid ${border}`, padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <a href="#" style={{ fontSize: 13, color: muted, textDecoration: 'none' }}>← All variations</a>
      <span style={{ fontSize: 13, color: lighter }}>{title}</span>
    </div>
  )
}
