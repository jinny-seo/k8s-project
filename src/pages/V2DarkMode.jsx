import { data } from '../data.js'
import NavBar from '../components/NavBar.jsx'

const t = {
  bg: '#0d1117',
  surface: '#161b22',
  border: '#30363d',
  text: '#e6edf3',
  muted: '#8b949e',
  green: '#3fb950',
  greenBg: '#1a3a1f',
  blue: '#58a6ff',
  purple: '#bc8cff',
  red: '#f85149',
}

function ProgressBar({ value, color, thin = false }) {
  return (
    <div style={{ background: '#21262d', borderRadius: 999, height: thin ? 4 : 6, overflow: 'hidden', marginTop: thin ? 4 : 8 }}>
      <div style={{ width: `${Math.min(value, 100)}%`, height: '100%', background: color, borderRadius: 999 }} />
    </div>
  )
}

export default function V2DarkMode() {
  const savingsPct = Math.round((data.cost.realizedSavings / data.cost.potentialSavings) * 100)
  const workloadPct = Math.round((data.workloads.optimized / data.workloads.total) * 100)
  const wSavePct = Math.round((data.workloads.savings / data.workloads.savingsPotential) * 100)
  const nSavePct = Math.round((data.nodes.savings / data.nodes.savingsPotential) * 100)
  const cpuRed = Math.round(((data.workloads.cpu.previous - data.workloads.cpu.requested) / data.workloads.cpu.previous) * 100)
  const memRed = Math.round(((data.workloads.memory.previous - data.workloads.memory.requested) / data.workloads.memory.previous) * 100)

  return (
    <div style={{ background: t.bg, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <NavBar title="Dark mode" dark />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: t.text }}>Cluster Overview</h1>
          <span style={{ fontSize: 13, color: t.muted }}>Last updated: just now</span>
        </div>

        {/* Hero */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: '24px 28px', marginBottom: 20, display: 'flex', gap: 0, alignItems: 'stretch' }}>
          <div style={{ minWidth: 200 }}>
            <span style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: t.muted, display: 'block', marginBottom: 4 }}>Monthly cost</span>
            <span style={{ fontSize: 28, fontWeight: 700, color: t.text, letterSpacing: '-0.5px' }}>${data.cost.monthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div style={{ width: 1, background: t.border, margin: '0 28px', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: t.muted }}>Realized savings</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: t.green, background: t.greenBg, padding: '2px 8px', borderRadius: 999 }}>{savingsPct}% of potential captured</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: t.green, letterSpacing: '-0.5px' }}>${data.cost.realizedSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              <span style={{ fontSize: 14, color: t.muted }}>/ ${data.cost.potentialSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })} potential</span>
            </div>
            <ProgressBar value={savingsPct} color={t.green} />
          </div>
        </div>

        {/* Panels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>

          {/* Cost breakdown */}
          <Panel title="Cost Breakdown">
            <Row label="Workload savings" sub={`${wSavePct}% of potential`} value={`$${data.workloads.savings.toFixed(2)}`} />
            <ProgressBar value={wSavePct} color={t.blue} thin />
            <Sub>Potential: ${data.workloads.savingsPotential.toFixed(2)}/mo</Sub>
            <Divider />
            <Row label="Node savings" sub={`${nSavePct}% of potential`} value={`$${data.nodes.savings.toFixed(2)}`} />
            <ProgressBar value={nSavePct} color={t.purple} thin />
            <Sub>Potential: ${data.nodes.savingsPotential.toFixed(2)}/mo</Sub>
          </Panel>

          {/* Workloads */}
          <Panel title="Workload Optimization">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: t.text, letterSpacing: -1 }}>{workloadPct}%</span>
              <span style={{ fontSize: 13, color: t.muted }}>{data.workloads.optimized} of {data.workloads.total} workloads</span>
            </div>
            <div style={{ background: '#21262d', borderRadius: 999, height: 6, overflow: 'hidden', marginBottom: 20 }}>
              <div style={{ width: `${workloadPct}%`, height: '100%', background: t.blue, borderRadius: 999 }} />
            </div>
            <Divider />
            <Sub style={{ marginBottom: 12 }}>Resource requests after optimization</Sub>
            <ResourceRow label="CPU" badge={`-${cpuRed}%`} current={`${data.workloads.cpu.requested} vCPU`} prev={`was ${data.workloads.cpu.previous}`} />
            <ResourceRow label="Memory" badge={`-${memRed}%`} current={`${data.workloads.memory.requested} GiB`} prev={`was ${data.workloads.memory.previous}`} style={{ marginTop: 12 }} />
          </Panel>

          {/* Nodes */}
          <Panel title="Node Health">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 32, fontWeight: 700, color: t.green, letterSpacing: -1 }}>{data.nodes.utilization}%</span>
                <span style={{ fontSize: 13, color: t.muted, marginLeft: 8 }}>utilization</span>
              </div>
              <span style={{ fontSize: 11, color: t.muted, background: '#21262d', border: `1px solid ${t.border}`, borderRadius: 6, padding: '3px 8px' }}>Consolidated {data.nodes.lastConsolidated}</span>
            </div>
            <div style={{ background: '#21262d', borderRadius: 999, height: 6, overflow: 'hidden', marginBottom: 20 }}>
              <div style={{ width: `${data.nodes.utilization}%`, height: '100%', background: t.green, borderRadius: 999 }} />
            </div>
            <Divider />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 8px' }}>
              <NodeStat label="Total nodes" value={data.nodes.current} />
              <NodeStat label="Underutilized" value={data.nodes.underutilized} color={t.red} />
              <NodeStat label="Node groups" value={data.nodes.groups} />
              <NodeStat label="Spot mix" value={`${data.nodes.spotMix}%`} />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: '20px 22px' }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: t.muted, marginBottom: 18 }}>{title}</div>
      {children}
    </div>
  )
}

function Row({ label, sub, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{label}</div>
        <div style={{ fontSize: 12, color: t.muted }}>{sub}</div>
      </div>
      <span style={{ fontSize: 18, fontWeight: 700, color: t.text }}>{value}</span>
    </div>
  )
}

function ResourceRow({ label, badge, current, prev, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: t.text }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: t.green, background: t.greenBg, padding: '1px 6px', borderRadius: 999 }}>{badge}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{current}</span>
        <span style={{ fontSize: 12, color: t.muted }}>{prev}</span>
      </div>
    </div>
  )
}

function NodeStat({ label, value, color }) {
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: color || t.text, letterSpacing: '-0.5px' }}>{value}</div>
      <div style={{ fontSize: 12, color: t.muted }}>{label}</div>
    </div>
  )
}

function Divider() {
  return <div style={{ borderTop: `1px solid ${t.border}`, margin: '18px 0' }} />
}

function Sub({ children, style }) {
  return <p style={{ fontSize: 11, color: t.muted, ...style }}>{children}</p>
}
