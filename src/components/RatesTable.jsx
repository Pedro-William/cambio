import { useMemo, useState } from 'react'
import styles from './RatesTable.module.css'
import Filters from './Filters'
import { filterRows, sortRows, validateFilters } from '../utils/rates'
import { buildCsvFilename, downloadCsv } from '../utils/csv'
import { formatDateBR } from '../utils/dates'

const EMPTY = { startDate: '', endDate: '', minRate: '', maxRate: '' }
const MAX_VISIBLE = 200

export default function RatesTable({ rows, from, to }) {
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
    try { downloadCsv(result, buildCsvFilename(from, to)); setMessage('') }
    catch (e) { setMessage(e.message) }
  }

  return (
    <div className={styles.wrap}>
      <Filters filters={filters} onChange={setFilters} onClear={() => setFilters(EMPTY)} error={filterError} />
      <div className={styles.bar}>
        <p aria-live="polite"><strong>{result.length}</strong> de {rows.length} registros</p>
        <button type="button" className={styles.export} onClick={exportCsv} disabled={result.length === 0}>Exportar CSV</button>
      </div>
      {message && <p className={styles.error} role="alert">{message}</p>}
      {result.length === 0 ? (
        <p className={styles.empty}>Nenhum registro com esses filtros. Ajuste ou limpe os filtros.</p>
      ) : (
        <div className={styles.scroll}>
          <table>
            <thead>
              <tr>
                <th aria-sort={ariaSort('date')}><button type="button" onClick={() => toggleSort('date')}>Data{arrow('date')}</button></th>
                <th>Origem</th>
                <th>Destino</th>
                <th aria-sort={ariaSort('rate')}><button type="button" onClick={() => toggleSort('rate')}>Cotação{arrow('rate')}</button></th>
              </tr>
            </thead>
            <tbody>
              {result.slice(0, MAX_VISIBLE).map((r) => (
                <tr key={r.date}>
                  <td>{formatDateBR(r.date)}</td><td>{r.base}</td><td>{r.quote}</td>
                  <td>{r.rate.toLocaleString('pt-BR', { maximumFractionDigits: 6 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {result.length > MAX_VISIBLE && (
            <p className={styles.empty}>Exibindo os primeiros {MAX_VISIBLE} registros. O CSV contém todos os {result.length}.</p>
          )}
        </div>
      )}
    </div>
  )
}
