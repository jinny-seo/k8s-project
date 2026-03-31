import { data } from '../data.js'
import NavBar from '../components/NavBar.jsx'

function RingGauge({ value, color, size = 80, strokeWidth = 8 }) {
  const r = (size - strokeWidth) / 2
  const cx = size / 2, cy = size / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#111827">{value}%</text>
    </svg>
  )
}

function StatusPill({ value, label, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: color + '15', borderRadius: 8, border: `1px solid ${color}30` }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 1 }}>{label}</div>
      </div>
    </div>
  )
}

function MetricRow({ label, value, sub, valueColor, last }) {
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

export default function V3HealthFirst() {
  const workloadPct = Math.round((data.workloads.optimized / data.workloads.total) * 100)
  const cpuRed = Math.round(((data.workloads.cpu.previous - data.workloads.cpu.requested) / data.workloads.cpu.previous) * 100)
  const memRed = Math.round(((data.workloads.memory.previous - data.workloads.memory.requested) / data.workloads.memory.previous) * 100)
  const wSavePct = Math.round((data.workloads.savings / data.workloads.savingsPotential) * 100)
  const nSavePct = Math.round((data.nodes.savings / data.nodes.savingsPotential) * 100)
  const savingsPct = Math.round((data.cost.realizedSavings / data.cost.potentialSavings) * 100)

  const nodeHealthColor = data.nodes.utilization >= 80 ? '#16a34a' : data.nodes.utilization >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#f5f6f8', minHeight: '100vh' }}>
      <NavBar title="Health-first" />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#111827' }}>Cluster Overview</h1>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Last updated: just now</span>
        </div>

        {/* Row 1: Node health hero + Workload coverage */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Node health — the operational hero */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 16 }}>Node Health</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
              <RingGauge value={data.nodes.utilization} color={nodeHealthColor} size={100} strokeWidth={10} />
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: nodeHealthColor, letterSpacing: -1, lineHeight: 1 }}>{data.nodes.utilization}%</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>node utilization</div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Consolidated {data.nodes.lastConsolidated}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <StatusPill value={data.nodes.current} label="total nodes" color="#6b7280" />
              <StatusPill value={data.nodes.underutilized} label="underutilized" color="#ef4444" />
              <StatusPill value={data.nodes.groups} label="node groups" color="#6b7280" />
              <StatusPill value={`${data.nodes.spotMix}%`} label="spot mix" color="#8b5cf6" />
            </div>
          </div>

          {/* Workload coverage */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 16 }}>Workload Optimization</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
              <RingGauge value={workloadPct} color="#3b82f6" size={100} strokeWidth={10} />
              <div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#111827', letterSpacing: -1, lineHeight: 1 }}>{workloadPct}%</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{data.workloads.optimized} of {data.workloads.total} workloads</div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{data.workloads.total - data.workloads.optimized} still unoptimized</div>
              </div>
            </div>
            <MetricRow label="CPU requests" value={`${data.workloads.cpu.requested} vCPU`} sub={`was ${data.workloads.cpu.previous} · −${cpuRed}%`} valueColor="#3b82f6" />
            <MetricRow label="Memory requests" value={`${data.workloads.memory.requested} GiB`} sub={`was ${data.workloads.memory.previous} · −${memRed}%`} valueColor="#3b82f6" last />
          </div>
        </div>

        {/* Row 2: Cost as outcome */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 16 }}>Cost Impact</div>
          <div style={{ display: 'flex', gap: 0 }}>

            <div style={{ flex: 1, paddingRight: 32 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Monthly spend</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#111827', letterSpacing: '-0.5px' }}>${data.cost.monthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>

            <div style={{ width: 1, background: '#e5e7eb', margin: '0 0 0 0', flexShrink: 0 }} />

            <div style={{ flex: 2, paddingLeft: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>Realized savings</span>
                <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>{savingsPct}% of potential</span>
              </div>
              <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 24, marginBottom: 12 }}>
                <div style={{ width: `${savingsPct}%`, background: '#16a34a', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>${data.cost.realizedSavings.toFixed(0)} saved</span>
                </div>
                <div style={{ flex: 1, background: '#f3f4f6', border: '1px solid #e5e7eb', borderLeft: 'none', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>${(data.cost.potentialSavings - data.cost.realizedSavings).toFixed(0)} remaining</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>Workload savings</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#3b82f6' }}>${data.workloads.savings.toFixed(2)}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>{wSavePct}% of ${data.workloads.savingsPotential.toFixed(0)} potential</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>Node savings</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#8b5cf6' }}>${data.nodes.savings.toFixed(2)}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>{nSavePct}% of ${data.nodes.savingsPotential.toFixed(0)} potential</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>Total potential</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>${data.cost.potentialSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>per month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
