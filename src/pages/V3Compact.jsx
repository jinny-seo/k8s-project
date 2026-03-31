import { data } from '../data.js'
import NavBar from '../components/NavBar.jsx'

function Bar({ value, color }) {
  return (
    <div style={{ background: '#e5e7eb', borderRadius: 999, height: 4, width: '100%', overflow: 'hidden', marginTop: 6 }}>
      <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 999 }} />
    </div>
  )
}

function Stat({ label, value, sub, color, bar, barColor }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, whiteSpace: 'nowrap' }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: color || '#111827', letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2, whiteSpace: 'nowrap' }}>{sub}</div>}
      {bar !== undefined && <Bar value={bar} color={barColor || '#3b82f6'} />}
    </div>
  )
}

function Sep() {
  return <div style={{ width: 1, background: '#e5e7eb', alignSelf: 'stretch', flexShrink: 0, margin: '0 4px' }} />
}

function Group({ label, children }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#d1d5db', marginBottom: 12 }}>{label}</div>
      <div style={{ display: 'flex', gap: 20 }}>{children}</div>
    </div>
  )
}

export default function V3Compact() {
  const savingsPct = Math.round((data.cost.realizedSavings / data.cost.potentialSavings) * 100)
  const workloadPct = Math.round((data.workloads.optimized / data.workloads.total) * 100)
  const cpuRed = Math.round(((data.workloads.cpu.previous - data.workloads.cpu.requested) / data.workloads.cpu.previous) * 100)
  const memRed = Math.round(((data.workloads.memory.previous - data.workloads.memory.requested) / data.workloads.memory.previous) * 100)

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: '100vh', background: '#f5f6f8' }}>
      <NavBar title="Compact status bar" />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
          <h1 style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>Cluster Overview</h1>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>Updated just now</span>
        </div>
      </div>

      {/* Single dense strip */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>

          <Group label="Cost">
            <Stat label="Monthly" value={`$${(data.cost.monthly / 1000).toFixed(1)}k`} sub="/mo" />
            <Stat
              label="Saved"
              value={`$${(data.cost.realizedSavings).toFixed(0)}`}
              sub={`${savingsPct}% of $${(data.cost.potentialSavings / 1000).toFixed(1)}k`}
              color="#16a34a"
              bar={savingsPct}
              barColor="#16a34a"
            />
          </Group>

          <Sep />

          <Group label="Workloads">
            <Stat
              label="Optimized"
              value={`${workloadPct}%`}
              sub={`${data.workloads.optimized} / ${data.workloads.total}`}
              bar={workloadPct}
              barColor="#3b82f6"
            />
            <Stat
              label="CPU"
              value={`${data.workloads.cpu.requested} vCPU`}
              sub={`-${cpuRed}% vs before`}
              color="#111827"
            />
            <Stat
              label="Memory"
              value={`${data.workloads.memory.requested} GiB`}
              sub={`-${memRed}% vs before`}
              color="#111827"
            />
          </Group>

          <Sep />

          <Group label="Nodes">
            <Stat
              label="Utilization"
              value={`${data.nodes.utilization}%`}
              sub={`Consolidated ${data.nodes.lastConsolidated}`}
              color="#16a34a"
              bar={data.nodes.utilization}
              barColor="#16a34a"
            />
            <Stat label="Total" value={data.nodes.current} sub="nodes" />
            <Stat label="Underutilized" value={data.nodes.underutilized} sub="nodes" color="#ef4444" />
            <Stat label="Spot mix" value={`${data.nodes.spotMix}%`} sub={`${data.nodes.groups} groups`} />
          </Group>

        </div>
      </div>
    </div>
  )
}
