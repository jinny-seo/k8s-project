import { data } from '../data.js'
import NavBar from '../components/NavBar.jsx'

// Horizontal proportional bar made of labeled segments
function SegmentBar({ segments, height = 32 }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0)
  return (
    <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height, gap: 1 }}>
      {segments.map((seg) => (
        <div
          key={seg.label}
          style={{ width: `${(seg.value / total) * 100}%`, background: seg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 32, position: 'relative' }}
          title={`${seg.label}: ${seg.display || seg.value}`}
        >
          <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 6px' }}>
            {seg.display || seg.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function Legend({ items }) {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
      {items.map(({ label, color, value }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: color, flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: '#6b7280' }}>{label}</span>
          {value && <span style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{value}</span>}
        </div>
      ))}
    </div>
  )
}

function StatRow({ label, value, sub, valueColor, last }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '9px 0', borderBottom: last ? 'none' : '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 13, color: '#6b7280' }}>{label}</span>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: valueColor || '#111827' }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: '#9ca3af' }}>{sub}</div>}
      </div>
    </div>
  )
}

export default function V6Allocation() {
  const savingsPct = Math.round((data.cost.realizedSavings / data.cost.potentialSavings) * 100)
  const workloadPct = Math.round((data.workloads.optimized / data.workloads.total) * 100)
  const unrealizedTotal = data.cost.potentialSavings - data.cost.realizedSavings
  const cpuRed = Math.round(((data.workloads.cpu.previous - data.workloads.cpu.requested) / data.workloads.cpu.previous) * 100)
  const memRed = Math.round(((data.workloads.memory.previous - data.workloads.memory.requested) / data.workloads.memory.previous) * 100)
  const efficientNodes = data.nodes.current - data.nodes.underutilized
  const spotNodes = Math.round((data.nodes.spotMix / 100) * data.nodes.current)
  const onDemandNodes = data.nodes.current - spotNodes

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#f5f6f8', minHeight: '100vh' }}>
      <NavBar title="Allocation view" />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#111827' }}>Cluster Overview</h1>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Last updated: just now</span>
        </div>

        {/* Cost allocation hero bar */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280' }}>Monthly spend: ${data.cost.monthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>{savingsPct}% of ${data.cost.potentialSavings.toFixed(0)} potential captured</span>
          </div>
          <SegmentBar height={36} segments={[
            { label: 'Workload savings', value: data.workloads.savings, color: '#3b82f6', display: `$${data.workloads.savings.toFixed(0)} workload` },
            { label: 'Node savings', value: data.nodes.savings, color: '#8b5cf6', display: `$${data.nodes.savings.toFixed(0)} node` },
            { label: 'Unrealized', value: unrealizedTotal, color: '#e5e7eb', display: `$${unrealizedTotal.toFixed(0)} uncaptured` },
          ]} />
          <Legend items={[
            { label: 'Workload savings', color: '#3b82f6', value: `$${data.workloads.savings.toFixed(2)}/mo` },
            { label: 'Node savings', color: '#8b5cf6', value: `$${data.nodes.savings.toFixed(2)}/mo` },
            { label: 'Unrealized potential', color: '#e5e7eb', value: `$${unrealizedTotal.toFixed(2)}/mo` },
          ]} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>

          {/* Workload allocation */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 16 }}>Workload Coverage</div>

            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Workloads: optimized vs pending</div>
              <SegmentBar segments={[
                { label: 'Optimized', value: data.workloads.optimized, color: '#3b82f6', display: `${data.workloads.optimized} done` },
                { label: 'Pending', value: data.workloads.total - data.workloads.optimized, color: '#dbeafe', display: `${data.workloads.total - data.workloads.optimized} pending` },
              ]} height={24} />
            </div>
            <Legend items={[
              { label: `Optimized (${workloadPct}%)`, color: '#3b82f6' },
              { label: `Pending (${100 - workloadPct}%)`, color: '#dbeafe' },
            ]} />

            <div style={{ borderTop: '1px solid #f3f4f6', marginTop: 14, paddingTop: 4 }}>
              <StatRow label="Workload savings" value={`$${data.workloads.savings.toFixed(2)}`} sub={`of $${data.workloads.savingsPotential.toFixed(2)} potential`} valueColor="#3b82f6" />
              <StatRow label="CPU requested" value={`${data.workloads.cpu.requested} vCPU`} sub={`−${cpuRed}% from ${data.workloads.cpu.previous}`} />
              <StatRow label="Memory requested" value={`${data.workloads.memory.requested} GiB`} sub={`−${memRed}% from ${data.workloads.memory.previous}`} last />
            </div>
          </div>

          {/* Node fleet composition */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 16 }}>Node Fleet</div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Fleet: utilization state</div>
              <SegmentBar segments={[
                { label: 'Efficient', value: efficientNodes, color: '#16a34a', display: `${efficientNodes} efficient` },
                { label: 'Underutilized', value: data.nodes.underutilized, color: '#fca5a5', display: `${data.nodes.underutilized} under` },
              ]} height={24} />
            </div>
            <Legend items={[
              { label: `Efficient (${Math.round((efficientNodes / data.nodes.current) * 100)}%)`, color: '#16a34a' },
              { label: `Underutilized (${Math.round((data.nodes.underutilized / data.nodes.current) * 100)}%)`, color: '#fca5a5' },
            ]} />

            <div style={{ marginTop: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Fleet: pricing type</div>
              <SegmentBar segments={[
                { label: 'Spot', value: spotNodes, color: '#8b5cf6', display: `${spotNodes} spot` },
                { label: 'On-demand', value: onDemandNodes, color: '#c4b5fd', display: `${onDemandNodes} on-demand` },
              ]} height={24} />
            </div>
            <Legend items={[
              { label: `Spot (${data.nodes.spotMix}%)`, color: '#8b5cf6' },
              { label: `On-demand (${100 - data.nodes.spotMix}%)`, color: '#c4b5fd' },
            ]} />

            <div style={{ borderTop: '1px solid #f3f4f6', marginTop: 14, paddingTop: 4 }}>
              <StatRow label="Node savings" value={`$${data.nodes.savings.toFixed(2)}`} sub={`of $${data.nodes.savingsPotential.toFixed(2)} potential`} valueColor="#8b5cf6" />
              <StatRow label="Utilization" value={`${data.nodes.utilization}%`} sub={`Consolidated ${data.nodes.lastConsolidated}`} last />
            </div>
          </div>

          {/* Savings attribution */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 16 }}>Savings Attribution</div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Realized savings mix</div>
              <SegmentBar segments={[
                { label: 'Workload', value: data.workloads.savings, color: '#3b82f6', display: `${Math.round((data.workloads.savings / data.cost.realizedSavings) * 100)}% workload` },
                { label: 'Node', value: data.nodes.savings, color: '#8b5cf6', display: `${Math.round((data.nodes.savings / data.cost.realizedSavings) * 100)}% node` },
              ]} height={24} />
            </div>
            <Legend items={[
              { label: 'Workload', color: '#3b82f6', value: `$${data.workloads.savings.toFixed(0)}` },
              { label: 'Node', color: '#8b5cf6', value: `$${data.nodes.savings.toFixed(0)}` },
            ]} />

            <div style={{ marginTop: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Remaining potential mix</div>
              <SegmentBar segments={[
                { label: 'Workload gap', value: data.workloads.savingsPotential - data.workloads.savings, color: '#bfdbfe', display: `$${(data.workloads.savingsPotential - data.workloads.savings).toFixed(0)} wl` },
                { label: 'Node gap', value: data.nodes.savingsPotential - data.nodes.savings, color: '#ede9fe', display: `$${(data.nodes.savingsPotential - data.nodes.savings).toFixed(0)} nd` },
              ]} height={24} />
            </div>

            <div style={{ borderTop: '1px solid #f3f4f6', marginTop: 14, paddingTop: 4 }}>
              <StatRow label="Total realized" value={`$${data.cost.realizedSavings.toFixed(2)}/mo`} valueColor="#16a34a" />
              <StatRow label="Total potential" value={`$${data.cost.potentialSavings.toFixed(2)}/mo`} />
              <StatRow label="Node groups" value={data.nodes.groups} sub={`${data.nodes.current} total nodes`} last />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
