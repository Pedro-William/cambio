import styles from './PeriodSelector.module.css'
import { PERIODS } from '../constants/periods'

export default function PeriodSelector({ value, onChange }) {
  return (
    <div className={styles.group} role="group" aria-label="Período do histórico">
      {PERIODS.map((p) => (
        <button key={p.id} type="button" aria-pressed={p.id === value.id}
          className={p.id === value.id ? styles.active : ''} onClick={() => onChange(p)}>
          {p.label}
        </button>
      ))}
    </div>
  )
}
