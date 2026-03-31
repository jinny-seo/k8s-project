import { data } from '../data.js'
import NavBar from '../components/NavBar.jsx'

function BigStat({ label, value, valueColor, note }) {
  return (
    <div style={{ flex: 1, padding: '0 32px', borderRight: '1px solid #e5e7eb' }}>
      <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', marginBottom: 12 }}>{label}</div>
      <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-2px', color: valueColor || '#111827', lineHeight: 1 }}>{value}</div>
      {note && <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 10 }}>{note}</div>}
    </div>
  )
}

export default function V6Executive() {
  const savingsPct = Math.round((data.cost.realizedSavings / data.cost.potentialSavings) * 100)
  const workloadPct = Math.round((data.workloads.optimized / data.workloads.total) * 100)

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#fff', minHeight: '100vh' }}>
      <NavBar title="Executive summary" />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 48px' }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: 8 }}>Cluster Overview</div>
          <div style={{ fontSize: 14, color: '#6b7280' }}>Last updated just now</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <BigStat
            label="Monthly cost"
            value={`$${(data.cost.monthly / 1000).toFixed(2)}k`}
            note="current cluster spend"
          />
          <BigStat
            label="Realized savings"
            value={`$${(data.cost.realizedSavings).toFixed(0)}`}
            valueColor="#16a34a"
            note={`${savingsPct}% of $${(data.cost.potentialSavings / 1000).toFixed(1)}k potential`}
          />
          <BigStat
            label="Node utilization"
            value={`${data.nodes.utilization}%`}
            valueColor="#16a34a"
            note={`${data.nodes.underutilized} of ${data.nodes.current} underutilized`}
          />
          <BigStat
            label="Workloads optimized"
            value={`${workloadPct}%`}
            note={`${data.workloads.optimized} of ${data.workloads.total} workloads`}
          />
          <div style={{ flex: 1, padding: '0 32px' }}>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', marginBottom: 12 }}>Underutilized nodes</div>
            <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-2px', color: '#ef4444', lineHeight: 1 }}>{data.nodes.underutilized}</div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 10 }}>of {data.nodes.current} total nodes</div>
          </div>
        </div>
      </div>
    </div>
  )
}
