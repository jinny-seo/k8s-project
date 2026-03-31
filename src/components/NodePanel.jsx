import styles from './Panel.module.css'

export default function NodePanel({ nodes }) {
  const { utilization, lastConsolidated, groups, current, underutilized, spotMix } = nodes
  const healthColor = utilization >= 80 ? '#16a34a' : utilization >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Node Health</h2>

      <div className={styles.utilizationRow}>
        <div>
          <span className={styles.bigNumber} style={{ color: healthColor }}>{utilization}%</span>
          <span className={styles.bigNumberSub}>utilization</span>
        </div>
        <span className={styles.consolidatedBadge}>Consolidated {lastConsolidated}</span>
      </div>
      <div style={{ background: '#e5e7eb', borderRadius: 999, height: 6, overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ width: `${utilization}%`, height: '100%', background: healthColor, borderRadius: 999 }} />
      </div>

      <div className={styles.divider} />

      <div className={styles.nodeGrid}>
        <NodeStat label="Total nodes" value={current} />
        <NodeStat label="Underutilized" value={underutilized} valueColor="#ef4444" />
        <NodeStat label="Node groups" value={groups} />
        <NodeStat label="Spot mix" value={`${spotMix}%`} />
      </div>
    </div>
  )
}

function NodeStat({ label, value, valueColor }) {
  return (
    <div className={styles.nodeStat}>
      <span className={styles.nodeStatValue} style={valueColor ? { color: valueColor } : {}}>
        {value}
      </span>
      <span className={styles.nodeStatLabel}>{label}</span>
    </div>
  )
}
