const escapeCell = (v) => {
  const s = String(v ?? '')
  return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

const DEFAULT_HEADERS = ['data', 'moeda_origem', 'moeda_destino', 'cotacao']

export function buildCsv(rows, headers = DEFAULT_HEADERS) {
  const header = headers.join(',')
  const lines = rows.map((r) => [r.date, r.base, r.quote, r.rate].map(escapeCell).join(','))
  return [header, ...lines].join('\n')
}

export function buildCsvFilename(base, quote, today = new Date()) {
  const d = today.toISOString().slice(0, 10)
  return `cotacoes_${base}-${quote}_${d}.csv`
}

/** Gera e baixa o arquivo no navegador. Lança erro se não houver registros. */
export function downloadCsv(rows, filename, headers) {
  if (!rows.length) throw new Error('Não há registros para exportar.')
  const blob = new Blob(['\uFEFF' + buildCsv(rows, headers)], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
