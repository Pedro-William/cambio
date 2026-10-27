import styles from './Filters.module.css'

export default function Filters({ filters, onChange, onClear, error }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value })
  return (
    <fieldset className={styles.box}>
      <legend>Filtros</legend>
      <label>De<input type="date" value={filters.startDate} onChange={set('startDate')} /></label>
      <label>Até<input type="date" value={filters.endDate} onChange={set('endDate')} /></label>
      <label>Cotação mínima<input type="number" step="any" value={filters.minRate} onChange={set('minRate')} /></label>
      <label>Cotação máxima<input type="number" step="any" value={filters.maxRate} onChange={set('maxRate')} /></label>
      <button type="button" onClick={onClear}>Limpar filtros</button>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </fieldset>
  )
}
