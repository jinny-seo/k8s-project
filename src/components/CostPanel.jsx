import styles from './Panel.module.css'
import { ProgressBar } from './ClusterDashboard.jsx'

export default function CostPanel({ workloads, nodes }) {
  const workloadPct = Math.round((workloads.savings / workloads.savingsPotential) * 100)
  const nodePct = Math.round((nodes.savings / nodes.savingsPotential) * 100)

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Cost Breakdown</h2>

      <div className={styles.savingsRow}>
        <div className={styles.savingsLabel}>
          <span className={styles.metricName}>Workload savings</span>
          <span className={styles.metricSub}>{workloadPct}% of potential</span>
        </div>
        <span className={styles.savingsAmount}>${workloads.savings.toFixed(2)}</span>
      </div>
      <ProgressBar value={workloadPct} color="#3b82f6" thin />
      <p className={styles.potential}>Potential: ${workloads.savingsPotential.toFixed(2)}/mo</p>

      <div className={styles.divider} />

      <div className={styles.savingsRow}>
        <div className={styles.savingsLabel}>
          <span className={styles.metricName}>Node savings</span>
          <span className={styles.metricSub}>{nodePct}% of potential</span>
        </div>
        <span className={styles.savingsAmount}>${nodes.savings.toFixed(2)}</span>
      </div>
      <ProgressBar value={nodePct} color="#8b5cf6" thin />
      <p className={styles.potential}>Potential: ${nodes.savingsPotential.toFixed(2)}/mo</p>
    </div>
  )
}
