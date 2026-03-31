import { data } from '../data.js'
import NavBar from '../components/NavBar.jsx'

function PotentialBar({ label, potential, realized, color }) {
  const pct = Math.round((realized / potential) * 100)
  const unrealized = potential - realized

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>{label}</span>
        <span style={{ fontSize: 13, color: '#6b7280' }}>${potential.toFixed(2)}/mo potential</span>
      </div>

      {/* Stacked bar: realized + unrealized */}
      <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 28 }}>
        <div style={{
          width: `${pct}%`, background: color,
          display: 'flex', alignItems: 'center', paddingLeft: 10, minWidth: 60,
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>${realized.toFixed(0)} saved</span>
        </div>
        <div style={{
          flex: 1, background: '#f3f4f6', border: '1px solid #e5e7eb', borderLeft: 'none',
          display: 'flex', alignItems: 'center', paddingLeft: 10,
        }}>
          <span style={{ fontSize: 12, color: '#9ca3af', whiteSpace: 'nowrap' }}>${unrealized.toFixed(0)} unrealized</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color, fontWeight: 500 }}>{pct}% captured</span>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>{100 - pct}% remaining</span>
      </div>
    </div>
  )
}

function StatRow({ label, value, sub, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
      <span style={{ fontSize: 13, color: '#6b7280' }}>{label}</span>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: valueColor || '#111827' }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: '#9ca3af' }}>{sub}</div>}
      </div>
    </div>
  )
}

export default function V2SavingsWaterfall() {
  const totalPct = Math.round((data.cost.realizedSavings / data.cost.potentialSavings) * 100)
  const cpuRed = Math.round(((data.workloads.cpu.previous - data.workloads.cpu.requested) / data.workloads.cpu.previous) * 100)
  const memRed = Math.round(((data.workloads.memory.previous - data.workloads.memory.requested) / data.workloads.memory.previous) * 100)
  const workloadPct = Math.round((data.workloads.optimized / data.workloads.total) * 100)

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#f5f6f8', minHeight: '100vh' }}>
      <NavBar title="Savings waterfall" />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#111827' }}>Cluster Overview</h1>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Last updated: just now</span>
        </div>

        {/* Cost header */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 24px', marginBottom: 16, display: 'flex', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6b7280', marginBottom: 4 }}>Monthly cost</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#111827', letterSpacing: '-0.5px' }}>${data.cost.monthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          </div>
          <div style={{ width: 1, background: '#e5e7eb', height: 40 }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6b7280' }}>Total savings captured</span>
              <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>${data.cost.realizedSavings.toFixed(2)} of ${data.cost.potentialSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            {/* Master bar */}
            <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 22 }}>
              <div style={{ width: `${totalPct}%`, background: '#16a34a', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{totalPct}%</span>
              </div>
              <div style={{ flex: 1, background: '#f3f4f6', border: '1px solid #e5e7eb', borderLeft: 'none', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>${(data.cost.potentialSavings - data.cost.realizedSavings).toFixed(0)} still available</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Savings breakdown */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 20 }}>Savings by source</div>
            <PotentialBar
              label="Workload optimization"
              potential={data.workloads.savingsPotential}
              realized={data.workloads.savings}
              color="#3b82f6"
            />
            <PotentialBar
              label="Node consolidation"
              potential={data.nodes.savingsPotential}
              realized={data.nodes.savings}
              color="#8b5cf6"
            />
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 14, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Total</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#16a34a' }}>${data.cost.realizedSavings.toFixed(2)}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>of ${data.cost.potentialSavings.toFixed(2)} potential</div>
              </div>
            </div>
          </div>

          {/* Workload detail */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 8 }}>Workload coverage</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#111827', letterSpacing: -1 }}>{workloadPct}%</span>
              <span style={{ fontSize: 13, color: '#6b7280' }}>{data.workloads.optimized} of {data.workloads.total} workloads optimized</span>
            </div>
            <div style={{ background: '#e5e7eb', borderRadius: 999, height: 6, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ width: `${workloadPct}%`, height: '100%', background: '#3b82f6', borderRadius: 999 }} />
            </div>
            <StatRow label="CPU requested" value={`${data.workloads.cpu.requested} vCPU`} sub={`down from ${data.workloads.cpu.previous} (−${cpuRed}%)`} valueColor="#3b82f6" />
            <StatRow label="Memory requested" value={`${data.workloads.memory.requested} GiB`} sub={`down from ${data.workloads.memory.previous} (−${memRed}%)`} valueColor="#3b82f6" />
            <StatRow label="Node utilization" value={`${data.nodes.utilization}%`} sub={`Consolidated ${data.nodes.lastConsolidated}`} valueColor="#16a34a" />
            <StatRow label="Underutilized nodes" value={`${data.nodes.underutilized} of ${data.nodes.current}`} valueColor="#ef4444" />
            <StatRow label="Spot mix" value={`${data.nodes.spotMix}%`} sub={`${data.nodes.groups} node groups`} />
          </div>
        </div>
      </div>
    </div>
  )
}
