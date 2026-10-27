import styles from './CurrencySelect.module.css'

export default function CurrencySelect({ id, label, value, currencies, onChange, disabled }) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
        {!currencies.some((c) => c.code === value) && <option value={value}>{value}</option>}
        {currencies.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
      </select>
    </label>
  )
}
