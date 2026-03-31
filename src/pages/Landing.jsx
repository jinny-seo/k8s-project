const variations = [
  { hash: 'v1', name: 'Three-panel cards',     desc: 'Organized layout: cost hero bar + Cost Breakdown, Workload Optimization, and Node Health panels' },
  { hash: 'v2', name: 'Dark mode',             desc: 'Same three-panel structure with a dark theme' },
  { hash: 'v3', name: 'Compact status bar',    desc: 'All metrics in a single dense horizontal strip — no panels, no scroll' },
  { hash: 'v4', name: 'KPI card grid',         desc: 'Eight individual metric cards in a grid — every number gets equal weight' },
  { hash: 'v5', name: 'Circular gauges',       desc: 'Three key percentages as SVG ring gauges with supporting stats below' },
  { hash: 'v6', name: 'Executive summary',     desc: 'Five headline numbers only — no charts, no labels beyond the minimum' },
]

export default function Landing() {
  return (
    <div style={{ maxWidth: 640, margin: '60px auto', padding: '0 24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Cluster dashboard — variations</h1>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32 }}>Six takes on the same data. Click to preview.</p>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {variations.map((v, i) => (
          <li key={v.hash}>
            <a
              href={`#${v.hash}`}
              style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '12px 16px', borderRadius: 8, textDecoration: 'none', color: 'inherit', transition: 'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: 13, color: '#9ca3af', minWidth: 20 }}>{i + 1}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#111827', marginBottom: 2 }}>{v.name}</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>{v.desc}</div>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
