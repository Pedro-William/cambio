import { useEffect, useState } from 'react'
import { getCurrencies } from '../services/api'

export function useCurrencies() {
  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getCurrencies()
      .then((l) => active && setCurrencies(l))
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return { currencies, loading, error }
}
