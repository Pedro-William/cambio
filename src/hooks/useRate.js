import { useEffect, useState } from 'react'
import { getRate } from '../services/api'

export function useRate(from, to) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!from || !to) return
    if (from === to) { setData({ date: null, base: from, quote: to, rate: 1 }); setError(''); return }
    let active = true
    setLoading(true); setError('')
    getRate(from, to)
      .then((r) => active && setData(r))
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [from, to])

  return { data, loading, error }
}
