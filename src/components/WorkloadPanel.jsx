import styles from './Panel.module.css'

export default function WorkloadPanel({ workloads }) {
  const { optimized, total, cpu, memory } = workloads
  const optimizedPct = Math.round((optimized / total) * 100)
  const cpuReductionPct = Math.round(((cpu.previousVcpu - cpu.requestedVcpu) / cpu.previousVcpu) * 100)
  const memReductionPct = Math.round(((memory.previousGib - memory.requestedGib) / memory.previousGib) * 100)

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Workload Optimization</h2>

      <div className={styles.coverageStat}>
        <span className={styles.bigNumber}>{optimizedPct}%</span>
        <span className={styles.bigNumberSub}>{optimized} of {total} workloads</span>
      </div>
      <div style={{ background: '#e5e7eb', borderRadius: 999, height: 6, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ width: `${optimizedPct}%`, height: '100%', background: '#3b82f6', borderRadius: 999 }} />
      </div>

      <div className={styles.divider} />

      <p className={styles.sectionLabel}>Resource requests after optimization</p>

      <div className={styles.resourceRow}>
        <div className={styles.resourceLabel}>
          <span className={styles.metricName}>CPU</span>
          <span className={styles.reductionBadge}>-{cpuReductionPct}%</span>
        </div>
        <div className={styles.resourceValues}>
          <span className={styles.resourceCurrent}>{cpu.requestedVcpu} vCPU</span>
          <span className={styles.resourcePrev}>was {cpu.previousVcpu}</span>
        </div>
      </div>

      <div className={styles.resourceRow} style={{ marginTop: 12 }}>
        <div className={styles.resourceLabel}>
          <span className={styles.metricName}>Memory</span>
          <span className={styles.reductionBadge}>-{memReductionPct}%</span>
        </div>
        <div className={styles.resourceValues}>
          <span className={styles.resourceCurrent}>{memory.requestedGib} GiB</span>
          <span className={styles.resourcePrev}>was {memory.previousGib}</span>
        </div>
      </div>
    </div>
  )
}
