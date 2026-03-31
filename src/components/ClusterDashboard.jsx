import styles from './ClusterDashboard.module.css'
import CostPanel from './CostPanel.jsx'
import WorkloadPanel from './WorkloadPanel.jsx'
import NodePanel from './NodePanel.jsx'

// Snapshot data — replace with API calls in production
const data = {
  cost: {
    monthly: 1253.02,
    realizedSavings: 899.65,
    potentialSavings: 2525.05,
  },
  workloads: {
    optimized: 43,
    total: 156,
    savings: 539.79,
    savingsPotential: 1667.56,
    cpu: { requestedVcpu: 245.3, previousVcpu: 401.9 },
    memory: { requestedGib: 296.5, previousGib: 512.6 },
  },
  nodes: {
    utilization: 88,
    lastConsolidated: '2h ago',
    savings: 359.86,
    savingsPotential: 857.49,
    groups: 4,
    current: 54,
    underutilized: 19,
    spotMix: 42,
  },
}

export default function ClusterDashboard() {
  const savingsPct = Math.round((data.cost.realizedSavings / data.cost.potentialSavings) * 100)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Cluster Overview</h1>
        <span className={styles.subtitle}>Last updated: just now</span>
      </header>

      {/* Hero: cost + savings — the most important story at a glance */}
      <section className={styles.hero}>
        <div className={styles.heroStat}>
          <span className={styles.heroLabel}>Monthly cost</span>
          <span className={styles.heroValue}>
            ${data.cost.monthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className={styles.heroDivider} />

        <div className={styles.heroSavings}>
          <div className={styles.savingsHeader}>
            <span className={styles.heroLabel}>Realized savings</span>
            <span className={styles.savingsPctBadge}>{savingsPct}% of potential captured</span>
          </div>
          <div className={styles.savingsNumbers}>
            <span className={styles.heroValue} style={{ color: '#16a34a' }}>
              ${data.cost.realizedSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className={styles.savingsDenominator}>
              / ${data.cost.potentialSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })} potential
            </span>
          </div>
          <ProgressBar value={savingsPct} color="#16a34a" />
        </div>
      </section>

      {/* Three detail panels — Cost breakdown, Workloads, Nodes */}
      <div className={styles.panels}>
        <CostPanel workloads={data.workloads} nodes={data.nodes} />
        <WorkloadPanel workloads={data.workloads} />
        <NodePanel nodes={data.nodes} />
      </div>
    </div>
  )
}

export function ProgressBar({ value, color = '#3b82f6', thin = false }) {
  return (
    <div style={{
      background: '#e5e7eb',
      borderRadius: 999,
      height: thin ? 4 : 6,
      overflow: 'hidden',
      marginTop: thin ? 4 : 8,
    }}>
      <div style={{
        width: `${Math.min(value, 100)}%`,
        height: '100%',
        background: color,
        borderRadius: 999,
        transition: 'width 0.4s ease',
      }} />
    </div>
  )
}
