import styles from './PeriodSelector.module.css'
import { PERIODS } from '../constants/periods'
import { useLanguage } from '../i18n/LanguageContext'

export default function PeriodSelector({ value, onChange }) {
  const { t } = useLanguage()
  return (
    <div className={styles.group} role="group" aria-label={t('period.group')}>
      {PERIODS.map((p) => (
        <button key={p.id} type="button" aria-pressed={p.id === value.id}
          className={p.id === value.id ? styles.active : ''} onClick={() => onChange(p)}>
          {t(`period.${p.id}`)}
        </button>
      ))}
    </div>
  )
}
