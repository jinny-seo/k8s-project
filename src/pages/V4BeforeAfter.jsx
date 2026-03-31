import { data } from '../data.js'
import NavBar from '../components/NavBar.jsx'

function DeltaBadge({ value, positive }) {
  const isGood = positive ? value > 0 : value < 0
  const color = isGood ? '#16a34a' : '#ef4444'
  const bg = isGood ? '#f0fdf4' : '#fef2f2'
  const sign = value > 0 ? '+' : ''
  return (
    <span style={{ fontSize: 12, fontWeight: 600, color, background: bg, padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap' }}>
      {sign}{typeof value === 'number' ? value + '%' : value}
    </span>
  )
}

function CompareRow({ label, before, after, delta, deltaPositive, last }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 80px', gap: 8, alignItems: 'center', padding: '10px 0', borderBottom: last ? 'none' : '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 13, color: '#6b7280' }}>{label}</span>
      <span style={{ fontSize: 14, color: '#9ca3af', fontWeight: 500 }}>{before}</span>
      <span style={{ fontSize: 14, color: '#111827', fontWeight: 600 }}>{after}</span>
      <div>{delta !== undefined && <DeltaBadge value={delta} positive={deltaPositive} />}</div>
    </div>
  )
}

function Panel({ title, headerBefore = 'Before', headerAfter = 'After', children }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px' }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 16 }}>{title}</div>
      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 80px', gap: 8, paddingBottom: 8, borderBottom: '1px solid #e5e7eb', marginBottom: 2 }}>
        <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>Metric</span>
        <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>{headerBefore}</span>
        <span style={{ fontSize: 11, color: '#111827', fontWeight: 600 }}>{headerAfter}</span>
        <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>Change</span>
      </div>
      {children}
    </div>
  )
}

export default function V4BeforeAfter() {
  const cpuRed = -Math.round(((data.workloads.cpu.previous - data.workloads.cpu.requested) / data.workloads.cpu.previous) * 100)
  const memRed = -Math.round(((data.workloads.memory.previous - data.workloads.memory.requested) / data.workloads.memory.previous) * 100)
  const savingsPct = Math.round((data.cost.realizedSavings / data.cost.potentialSavings) * 100)
  const workloadPct = Math.round((data.workloads.optimized / data.workloads.total) * 100)
  const efficientNodes = data.nodes.current - data.nodes.underutilized

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#f5f6f8', minHeight: '100vh' }}>
      <NavBar title="Before / After" />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#111827' }}>Cluster Overview</h1>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Showing impact of optimizations applied so far</span>
        </div>

        {/* Cost summary hero */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 24px', marginBottom: 16, display: 'flex', gap: 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Unoptimized spend</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#9ca3af', letterSpacing: '-0.5px', textDecoration: 'line-through' }}>
              ${(data.cost.monthly + data.cost.realizedSavings).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 28px', fontSize: 20, color: '#d1d5db' }}>→</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Current spend</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#111827', letterSpacing: '-0.5px' }}>
              ${data.cost.monthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div style={{ width: 1, background: '#e5e7eb', margin: '0 28px' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Saved</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#16a34a', letterSpacing: '-0.5px' }}>${data.cost.realizedSavings.toFixed(2)}/mo</div>
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{savingsPct}% of ${data.cost.potentialSavings.toFixed(0)} potential</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <Panel title="Compute resources">
            <CompareRow label="CPU requests" before={`${data.workloads.cpu.previous} vCPU`} after={`${data.workloads.cpu.requested} vCPU`} delta={cpuRed} deltaPositive={false} />
            <CompareRow label="Memory requests" before={`${data.workloads.memory.previous} GiB`} after={`${data.workloads.memory.requested} GiB`} delta={memRed} deltaPositive={false} />
            <CompareRow label="Workload savings" before="$0" after={`$${data.workloads.savings.toFixed(2)}`} />
            <CompareRow label="Potential remaining" before="—" after={`$${(data.workloads.savingsPotential - data.workloads.savings).toFixed(2)}`} last />
          </Panel>

          <Panel title="Workload coverage">
            <CompareRow label="Optimized" before="0" after={`${data.workloads.optimized}`} />
            <CompareRow label="Unoptimized" before={`${data.workloads.total}`} after={`${data.workloads.total - data.workloads.optimized}`} delta={-workloadPct} deltaPositive={false} />
            <CompareRow label="Coverage" before="0%" after={`${workloadPct}%`} />
            <CompareRow label="Savings rate" before="$0/mo" after={`$${data.workloads.savings.toFixed(0)}/mo`} last />
          </Panel>

          <Panel title="Node fleet">
            <CompareRow label="Total nodes" before="—" after={`${data.nodes.current}`} />
            <CompareRow label="Efficient" before="—" after={`${efficientNodes}`} />
            <CompareRow label="Underutilized" before="—" after={`${data.nodes.underutilized}`} delta={undefined} />
            <CompareRow label="Utilization" before="—" after={`${data.nodes.utilization}%`} />
            <CompareRow label="Node savings" before="$0" after={`$${data.nodes.savings.toFixed(2)}`} last />
          </Panel>
        </div>
      </div>
    </div>
  )
}
