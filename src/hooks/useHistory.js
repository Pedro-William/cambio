import { useEffect, useState } from 'react'
import { getHistory } from '../services/api'
import { getPeriodRange } from '../utils/dates'

export function useHistory(from, to, period) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!from || !to || from === to) { setRows([]); setError(from === to ? 'Escolha moedas diferentes para ver o histórico.' : ''); return }
    let active = true
    setLoading(true); setError('')
    getHistory(from, to, getPeriodRange(period), period.group)
      .then((r) => active && setRows(r))
      .catch((e) => active && (setRows([]), setError(e.message)))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [from, to, period])

  return { rows, loading, error }
}
