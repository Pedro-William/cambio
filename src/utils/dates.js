export function toISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function subtractFromDate(date, { unit, amount }) {
  const r = new Date(date)
  if (unit === 'day') r.setDate(r.getDate() - amount)
  if (unit === 'month') r.setMonth(r.getMonth() - amount)
  if (unit === 'year') r.setFullYear(r.getFullYear() - amount)
  return r
}

export function getPeriodRange(period, today = new Date()) {
  return { from: toISODate(subtractFromDate(today, period)), to: toISODate(today) }
}

/** Formata uma data ISO (AAAA-MM-DD) conforme o idioma, sem deslocar por fuso horário. */
export function formatDate(iso, locale = 'pt-BR') {
  if (!iso) return ''
  return new Intl.DateTimeFormat(locale, { timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`))
}
