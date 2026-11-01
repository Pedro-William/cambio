import styles from './Filters.module.css'
import { useLanguage } from '../i18n/LanguageContext'

export default function Filters({ filters, onChange, onClear, error }) {
  const { t } = useLanguage()
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value })
  return (
    <fieldset className={styles.box}>
      <legend>{t('filters.title')}</legend>
      <label>{t('filters.from')}<input type="date" value={filters.startDate} onChange={set('startDate')} /></label>
      <label>{t('filters.to')}<input type="date" value={filters.endDate} onChange={set('endDate')} /></label>
      <label>{t('filters.min')}<input type="number" step="any" value={filters.minRate} onChange={set('minRate')} /></label>
      <label>{t('filters.max')}<input type="number" step="any" value={filters.maxRate} onChange={set('maxRate')} /></label>
      <button type="button" onClick={onClear}>{t('filters.clear')}</button>
      {error && <p className={styles.error} role="alert">{t(error)}</p>}
    </fieldset>
  )
}
