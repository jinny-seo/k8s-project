import { data } from '../data.js'
import NavBar from '../components/NavBar.jsx'

function GapBar({ realized, potential, colorRealized, colorGap, height = 28 }) {
  const pct = (realized / potential) * 100
  return (
    <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height }}>
      <div style={{ width: `${pct}%`, background: colorRealized, minWidth: 4 }} />
      <div style={{ flex: 1, background: colorGap, border: '1px solid #e5e7eb', borderLeft: 'none' }} />
    </div>
  )
}

function OpportunityItem({ number, title, amount, sub, color }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: color + '20', border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>{number}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#111827', marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>{sub}</div>
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color, whiteSpace: 'nowrap' }}>{amount}</div>
    </div>
  )
}

function StatGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {items.map(({ label, value, valueColor }) => (
        <div key={label} style={{ background: '#f9fafb', borderRadius: 8, padding: '10px 12px' }}>
          <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>{label}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: valueColor || '#111827' }}>{value}</div>
        </div>
      ))}
    </div>
  )
}

export default function V5Opportunity() {
  const unrealizedTotal = data.cost.potentialSavings - data.cost.realizedSavings
  const unrealizedWorkload = data.workloads.savingsPotential - data.workloads.savings
  const unrealizedNode = data.nodes.savingsPotential - data.nodes.savings
  const savingsPct = Math.round((data.cost.realizedSavings / data.cost.potentialSavings) * 100)
  const workloadPct = Math.round((data.workloads.optimized / data.workloads.total) * 100)
  const wSavePct = Math.round((data.workloads.savings / data.workloads.savingsPotential) * 100)
  const nSavePct = Math.round((data.nodes.savings / data.nodes.savingsPotential) * 100)
  const cpuRed = Math.round(((data.workloads.cpu.previous - data.workloads.cpu.requested) / data.workloads.cpu.previous) * 100)
  const memRed = Math.round(((data.workloads.memory.previous - data.workloads.memory.requested) / data.workloads.memory.previous) * 100)

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#f5f6f8', minHeight: '100vh' }}>
      <NavBar title="Opportunity view" />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#111827' }}>Cluster Overview</h1>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>Last updated: just now</span>
        </div>

        {/* Hero: the gap */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '24px 28px', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 0 }}>
            <div style={{ flex: 1, paddingRight: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6b7280' }}>Savings captured</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#16a34a' }}>${data.cost.realizedSavings.toFixed(0)}/mo ({savingsPct}%)</span>
              </div>
              <GapBar realized={data.cost.realizedSavings} potential={data.cost.potentialSavings} colorRealized="#16a34a" colorGap="#fef9c3" />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 11, color: '#16a34a' }}>$0</span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>Potential: ${data.cost.potentialSavings.toFixed(0)}/mo</span>
              </div>
            </div>
            <div style={{ width: 1, background: '#e5e7eb', margin: '0', flexShrink: 0 }} />
            <div style={{ paddingLeft: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6b7280', marginBottom: 4 }}>Still on the table</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#f59e0b', letterSpacing: '-1px' }}>${unrealizedTotal.toFixed(2)}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>per month unrealized</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>

          {/* Workload opportunity */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 16 }}>Workload Gap</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>Savings captured</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#3b82f6' }}>{wSavePct}%</span>
              </div>
              <GapBar realized={data.workloads.savings} potential={data.workloads.savingsPotential} colorRealized="#3b82f6" colorGap="#eff6ff" height={20} />
            </div>
            <OpportunityItem number="A" title="Unoptimized workloads" amount={`${data.workloads.total - data.workloads.optimized}`} sub={`${workloadPct}% of ${data.workloads.total} done · ${100 - workloadPct}% remaining`} color="#3b82f6" />
            <OpportunityItem number="B" title="Workload savings gap" amount={`$${unrealizedWorkload.toFixed(0)}/mo`} sub={`$${data.workloads.savings.toFixed(0)} of $${data.workloads.savingsPotential.toFixed(0)} captured`} color="#3b82f6" />
            <div style={{ marginTop: 12 }}>
              <StatGrid items={[
                { label: 'CPU already reduced', value: `−${cpuRed}%`, valueColor: '#3b82f6' },
                { label: 'Memory already reduced', value: `−${memRed}%`, valueColor: '#3b82f6' },
              ]} />
            </div>
          </div>

          {/* Node opportunity */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 16 }}>Node Gap</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>Savings captured</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#8b5cf6' }}>{nSavePct}%</span>
              </div>
              <GapBar realized={data.nodes.savings} potential={data.nodes.savingsPotential} colorRealized="#8b5cf6" colorGap="#f5f3ff" height={20} />
            </div>
            <OpportunityItem number="A" title="Underutilized nodes" amount={`${data.nodes.underutilized}`} sub={`${data.nodes.underutilized} of ${data.nodes.current} nodes · ${data.nodes.utilization}% util.`} color="#8b5cf6" />
            <OpportunityItem number="B" title="Node savings gap" amount={`$${unrealizedNode.toFixed(0)}/mo`} sub={`$${data.nodes.savings.toFixed(0)} of $${data.nodes.savingsPotential.toFixed(0)} captured`} color="#8b5cf6" />
            <div style={{ marginTop: 12 }}>
              <StatGrid items={[
                { label: 'Node groups', value: data.nodes.groups },
                { label: 'Spot mix', value: `${data.nodes.spotMix}%`, valueColor: '#8b5cf6' },
              ]} />
            </div>
          </div>

          {/* Total summary */}
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#6b7280', marginBottom: 16 }}>Total Summary</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Monthly cluster cost</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#111827', letterSpacing: '-0.5px' }}>${data.cost.monthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
            <StatGrid items={[
              { label: 'Realized savings', value: `$${data.cost.realizedSavings.toFixed(0)}/mo`, valueColor: '#16a34a' },
              { label: 'Unrealized', value: `$${unrealizedTotal.toFixed(0)}/mo`, valueColor: '#f59e0b' },
              { label: 'Workload gap', value: `$${unrealizedWorkload.toFixed(0)}/mo`, valueColor: '#3b82f6' },
              { label: 'Node gap', value: `$${unrealizedNode.toFixed(0)}/mo`, valueColor: '#8b5cf6' },
            ]} />
            <div style={{ marginTop: 16, padding: '12px', background: '#fefce8', borderRadius: 8, border: '1px solid #fef08a' }}>
              <div style={{ fontSize: 12, color: '#92400e', fontWeight: 500 }}>Full optimization would save</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#92400e' }}>${data.cost.potentialSavings.toFixed(2)}/mo</div>
              <div style={{ fontSize: 11, color: '#a16207' }}>${(data.cost.monthly - (data.cost.potentialSavings - data.cost.realizedSavings)).toFixed(2)}/mo after full optimization</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
