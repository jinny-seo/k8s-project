import { data } from '../data.js'
import NavBar from '../components/NavBar.jsx'

function KpiCard({ label, value, context, valueColor, trend, trendUp }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '18px 20px' }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 12 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', color: valueColor || '#111827', marginBottom: 6 }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {trend && (
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: trendUp ? '#16a34a' : '#ef4444',
            background: trendUp ? '#f0fdf4' : '#fef2f2',
            padding: '1px 6px', borderRadius: 999
          }}>
            {trendUp ? '▲' : '▼'} {trend}
          </span>
        )}
        <span style={{ fontSize: 12, color: '#9ca3af' }}>{context}</span>
      </div>
    </div>
  )
}

export default function V4KpiCards() {
  const savingsPct = Math.round((data.cost.realizedSavings / data.cost.potentialSavings) * 100)
  const workloadPct = Math.round((data.workloads.optimized / data.workloads.total) * 100)
  const cpuRed = Math.round(((data.workloads.cpu.previous - data.workloads.cpu.requested) / data.workloads.cpu.previous) * 100)
  const memRed = Math.round(((data.workloads.memory.previous - data.workloads.memory.requested) / data.workloads.memory.previous) * 100)

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#f5f6f8', minHeight: '100vh' }}>
      <NavBar title="KPI card grid" />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#111827' }}>Cluster Overview</h1>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Last updated: just now</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <KpiCard
            label="Monthly cost"
            value={`$${data.cost.monthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            context="current cluster spend"
          />
          <KpiCard
            label="Realized savings"
            value={`$${data.cost.realizedSavings.toFixed(2)}`}
            valueColor="#16a34a"
            context="per month"
            trend={`${savingsPct}% captured`}
            trendUp
          />
          <KpiCard
            label="Savings potential"
            value={`$${data.cost.potentialSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            context="per month maximum"
          />
          <KpiCard
            label="Unrealized savings"
            value={`$${(data.cost.potentialSavings - data.cost.realizedSavings).toFixed(2)}`}
            valueColor="#f59e0b"
            context="left on the table"
            trend={`${100 - savingsPct}% uncaptured`}
            trendUp={false}
          />

          <KpiCard
            label="Workloads optimized"
            value={`${workloadPct}%`}
            context={`${data.workloads.optimized} of ${data.workloads.total} workloads`}
            trend={`${data.workloads.total - data.workloads.optimized} remaining`}
            trendUp={false}
          />
          <KpiCard
            label="CPU reduction"
            value={`${data.workloads.cpu.requested} vCPU`}
            context={`was ${data.workloads.cpu.previous} vCPU`}
            trend={`${cpuRed}% less`}
            trendUp
          />
          <KpiCard
            label="Memory reduction"
            value={`${data.workloads.memory.requested} GiB`}
            context={`was ${data.workloads.memory.previous} GiB`}
            trend={`${memRed}% less`}
            trendUp
          />
          <KpiCard
            label="Node utilization"
            value={`${data.nodes.utilization}%`}
            valueColor="#16a34a"
            context={`${data.nodes.underutilized} of ${data.nodes.current} underutilized`}
            trend="healthy"
            trendUp
          />
        </div>
      </div>
    </div>
  )
}
