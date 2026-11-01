import { useState } from 'react'
import styles from './HistorySection.module.css'
import PeriodSelector from './PeriodSelector'
import RateChart from './RateChart'
import RatesTable from './RatesTable'
import { useHistory } from '../hooks/useHistory'
import { PERIODS } from '../constants/periods'
import { useLanguage } from '../i18n/LanguageContext'

export default function HistorySection({ from, to }) {
  const [period, setPeriod] = useState(PERIODS[2])
  const { t } = useLanguage()
  const { rows, loading, error } = useHistory(from, to, period)

  return (
    <div>
      <PeriodSelector value={period} onChange={setPeriod} />
      {loading && <p className={styles.status}>{t('history.loading')}</p>}
      {error && <p className={styles.error} role="alert">{t(error)}</p>}
      {!loading && !error && rows.length === 0 && <p className={styles.status}>{t('history.empty')}</p>}
      {!error && rows.length > 0 && (
        <>
          <RateChart rows={rows} />
          <RatesTable rows={rows} from={from} to={to} />
        </>
      )}
    </div>
  )
}
