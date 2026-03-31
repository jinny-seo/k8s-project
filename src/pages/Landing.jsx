const variations = [
  { hash: 'v1', name: 'Three-panel cards',    desc: 'Cost hero bar + Cost Breakdown, Workload Optimization, and Node Health panels — the baseline' },
  { hash: 'v2', name: 'Savings waterfall',    desc: 'Leads with how much of the savings potential is captured, broken out by workload vs. node source' },
  { hash: 'v3', name: 'Health-first',         desc: 'Node and workload health are the hero — cost appears as the outcome of those decisions' },
  { hash: 'v4', name: 'Before / After',       desc: 'Side-by-side comparison showing what changed across compute, workload coverage, and node fleet' },
  { hash: 'v5', name: 'Opportunity view',     desc: 'Flips the lens — leads with what\'s unrealized, showing the gap and backlog by source' },
  { hash: 'v6', name: 'Allocation view',      desc: 'Proportional segment bars showing how workloads, nodes, and savings are distributed' },
]

export default function Landing() {
  return (
    <div style={{ maxWidth: 640, margin: '60px auto', padding: '0 24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, color: '#111827', marginBottom: 6 }}>Cluster dashboard — variations</h1>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 32 }}>Six layouts of the same data, each emphasizing a different aspect.</p>
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
