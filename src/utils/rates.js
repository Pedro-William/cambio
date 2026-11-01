/** Converte um valor usando a taxa obtida da API. */
export function convertAmount(amount, rate) {
  return Number(amount) * Number(rate)
}

/** Retorna a chave de tradução do erro ou null se a entrada for válida. */
export function validateAmount(raw) {
  const text = String(raw ?? '').trim().replace(',', '.')
  if (text === '') return 'validation.empty'
  const n = Number(text)
  if (!Number.isFinite(n)) return 'validation.notNumber'
  if (n <= 0) return 'validation.notPositive'
  if (n > 1e12) return 'validation.tooLarge'
  return null
}

export function parseAmount(raw) {
  return Number(String(raw).trim().replace(',', '.'))
}

const toNumberOrNull = (v) => (v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v))

/** Filtros combináveis: intervalo de datas (ISO) e cotação mínima/máxima. */
export function filterRows(rows, { startDate, endDate, minRate, maxRate } = {}) {
  const min = toNumberOrNull(minRate)
  const max = toNumberOrNull(maxRate)
  return rows.filter((r) => {
    if (startDate && r.date < startDate) return false
    if (endDate && r.date > endDate) return false
    if (min !== null && r.rate < min) return false
    if (max !== null && r.rate > max) return false
    return true
  })
}

/** Ordena sem mutar o array original. field: 'date' | 'rate'; direction: 'asc' | 'desc'. */
export function sortRows(rows, field = 'date', direction = 'desc') {
  const factor = direction === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => {
    if (field === 'date') return a.date.localeCompare(b.date) * factor
    return (a.rate - b.rate) * factor
  })
}

/** Valida ordem do intervalo; retorna mensagem ou null. */
export function validateFilters({ startDate, endDate, minRate, maxRate }) {
  if (startDate && endDate && startDate > endDate) return 'validation.dateOrder'
  const min = toNumberOrNull(minRate)
  const max = toNumberOrNull(maxRate)
  if (min !== null && max !== null && min > max) return 'validation.rateOrder'
  return null
}
