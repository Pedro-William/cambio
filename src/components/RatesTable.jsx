import { useMemo, useState } from 'react'
import styles from './RatesTable.module.css'
import Filters from './Filters'
import { filterRows, sortRows, validateFilters } from '../utils/rates'
import { buildCsvFilename, downloadCsv } from '../utils/csv'
import { formatDate } from '../utils/dates'
import { useLanguage } from '../i18n/LanguageContext'

const EMPTY = { startDate: '', endDate: '', minRate: '', maxRate: '' }
const MAX_VISIBLE = 200

export default function RatesTable({ rows, from, to }) {
  const { t, locale } = useLanguage()
  const [filters, setFilters] = useState(EMPTY)
  const [sort, setSort] = useState({ field: 'date', direction: 'desc' })
  const [message, setMessage] = useState('')

  const filterError = validateFilters(filters)
  const result = useMemo(
    () => (filterError ? [] : sortRows(filterRows(rows, filters), sort.field, sort.direction)),
    [rows, filters, sort, filterError]
  )

  const toggleSort = (field) =>
    setSort((s) => ({ field, direction: s.field === field && s.direction === 'desc' ? 'asc' : 'desc' }))
  const arrow = (field) => (sort.field === field ? (sort.direction === 'asc' ? ' ▲' : ' ▼') : '')
  const ariaSort = (field) => (sort.field === field ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none')

  const exportCsv = () => {
    try { downloadCsv(result, buildCsvFilename(from, to), ['csv.date', 'csv.base', 'csv.quote', 'csv.rate'].map((k) => t(k))); setMessage('') }
    catch (e) { setMessage(e.message) }
  }

  return (
    <div className={styles.wrap}>
      <Filters filters={filters} onChange={setFilters} onClear={() => setFilters(EMPTY)} error={filterError} />
      <div className={styles.bar}>
        <p aria-live="polite">{t('table.count', { count: result.length, total: rows.length })}</p>
        <button type="button" className={styles.export} onClick={exportCsv} disabled={result.length === 0}>{t('table.export')}</button>
      </div>
      {message && <p className={styles.error} role="alert">{t(message)}</p>}
      {result.length === 0 ? (
        <p className={styles.empty}>{t('table.empty')}</p>
      ) : (
        <div className={styles.scroll}>
          <table>
            <thead>
              <tr>
                <th aria-sort={ariaSort('date')}><button type="button" onClick={() => toggleSort('date')}>{t('table.date')}{arrow('date')}</button></th>
                <th>{t('table.origin')}</th>
                <th>{t('table.destination')}</th>
                <th aria-sort={ariaSort('rate')}><button type="button" onClick={() => toggleSort('rate')}>{t('table.rate')}{arrow('rate')}</button></th>
              </tr>
            </thead>
            <tbody>
              {result.slice(0, MAX_VISIBLE).map((r) => (
                <tr key={r.date}>
                  <td>{formatDate(r.date, locale)}</td><td>{r.base}</td><td>{r.quote}</td>
                  <td>{r.rate.toLocaleString(locale, { maximumFractionDigits: 6 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {result.length > MAX_VISIBLE && (
            <p className={styles.empty}>{t('table.truncated', { max: MAX_VISIBLE, count: result.length })}</p>
          )}
        </div>
      )}
    </div>
  )
}
