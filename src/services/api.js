import { API_BASE } from '../constants/periods'

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Falha na API (${res.status}). Tente novamente.`)
  return res.json()
}

export async function getCurrencies() {
  const data = await fetchJson(`${API_BASE}/currencies`)
  const list = Array.isArray(data)
    ? data.map((c) => ({ code: c.iso_code ?? c.code, name: c.name }))
    : Object.entries(data).map(([code, name]) => ({ code, name }))
  return list.filter((c) => c.code).sort((a, b) => a.code.localeCompare(b.code))
}

export async function getRate(from, to) {
  const data = await fetchJson(`${API_BASE}/rate/${from}/${to}`)
  const rate = data.rate ?? data.rates?.[to]
  if (typeof rate !== 'number') throw new Error('Resposta inesperada da API.')
  return { date: data.date, base: from, quote: to, rate }
}

export async function getHistory(from, to, range, group) {
  const params = new URLSearchParams({ from: range.from, to: range.to, base: from, quotes: to })
  if (group) params.set('group', group)
  const data = await fetchJson(`${API_BASE}/rates?${params}`)
  const rows = Array.isArray(data)
    ? data.map((r) => ({ date: r.date, base: r.base ?? from, quote: r.quote ?? to, rate: r.rate }))
    : Object.entries(data.rates ?? {}).map(([date, v]) => ({ date, base: from, quote: to, rate: v[to] }))
  return rows.filter((r) => typeof r.rate === 'number').sort((a, b) => a.date.localeCompare(b.date))
}
