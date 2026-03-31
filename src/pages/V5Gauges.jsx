import { data } from '../data.js'
import NavBar from '../components/NavBar.jsx'

function RingGauge({ value, color, size = 160, strokeWidth = 14 }) {
  const r = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth} />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="26" fontWeight="700" fill="#111827">{value}%</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="11" fill="#9ca3af">of target</text>
    </svg>
  )
}

function SupportStat({ label, value, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 13, color: '#6b7280' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: color || '#111827' }}>{value}</span>
    </div>
  )
}

function GaugeCard({ title, value, color, children }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 20, alignSelf: 'flex-start' }}>{title}</div>
      <RingGauge value={value} color={color} />
      <div style={{ width: '100%', marginTop: 20 }}>{children}</div>
    </div>
  )
}

export default function V5Gauges() {
  const savingsPct = Math.round((data.cost.realizedSavings / data.cost.potentialSavings) * 100)
  const workloadPct = Math.round((data.workloads.optimized / data.workloads.total) * 100)
  const cpuRed = Math.round(((data.workloads.cpu.previous - data.workloads.cpu.requested) / data.workloads.cpu.previous) * 100)
  const memRed = Math.round(((data.workloads.memory.previous - data.workloads.memory.requested) / data.workloads.memory.previous) * 100)

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#f5f6f8', minHeight: '100vh' }}>
      <NavBar title="Circular gauges" />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#111827' }}>Cluster Overview</h1>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Last updated: just now</span>
        </div>

        {/* Cost headline above gauges */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '16px 24px', marginBottom: 16, display: 'flex', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6b7280' }}>Monthly cost</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>${data.cost.monthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          </div>
          <div style={{ width: 1, background: '#e5e7eb', height: 36 }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6b7280' }}>Realized savings</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#16a34a' }}>${data.cost.realizedSavings.toFixed(2)} <span style={{ fontSize: 13, fontWeight: 400, color: '#9ca3af' }}>of ${data.cost.potentialSavings.toLocaleString()} potential</span></div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <GaugeCard title="Savings captured" value={savingsPct} color="#16a34a">
            <SupportStat label="Workload savings" value={`$${data.workloads.savings.toFixed(2)}`} color="#16a34a" />
            <SupportStat label="Node savings" value={`$${data.nodes.savings.toFixed(2)}`} color="#16a34a" />
            <SupportStat label="Total potential" value={`$${data.cost.potentialSavings.toFixed(2)}`} />
          </GaugeCard>

          <GaugeCard title="Workloads optimized" value={workloadPct} color="#3b82f6">
            <SupportStat label="Optimized" value={`${data.workloads.optimized} / ${data.workloads.total}`} />
            <SupportStat label="CPU reduced" value={`-${cpuRed}% → ${data.workloads.cpu.requested} vCPU`} color="#3b82f6" />
            <SupportStat label="Memory reduced" value={`-${memRed}% → ${data.workloads.memory.requested} GiB`} color="#3b82f6" />
          </GaugeCard>

          <GaugeCard title="Node utilization" value={data.nodes.utilization} color="#8b5cf6">
            <SupportStat label="Total nodes" value={data.nodes.current} />
            <SupportStat label="Underutilized" value={data.nodes.underutilized} color="#ef4444" />
            <SupportStat label="Spot mix" value={`${data.nodes.spotMix}%`} />
          </GaugeCard>
        </div>
      </div>
    </div>
  )
}
