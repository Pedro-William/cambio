import { useState } from 'react'
import styles from './Converter.module.css'
import CurrencySelect from './CurrencySelect'
import { useRate } from '../hooks/useRate'
import { convertAmount, parseAmount, validateAmount } from '../utils/rates'
import { formatDateBR } from '../utils/dates'

export default function Converter({ currencies, loading, from, to, onFromChange, onToChange, onSwap }) {
  const [amount, setAmount] = useState('1')
  const [touched, setTouched] = useState(false)
  const { data, loading: rateLoading, error } = useRate(from, to)

  const validation = validateAmount(amount)
  const result = !validation && data ? convertAmount(parseAmount(amount), data.rate) : null
  const fmt = (n, max = 2) => n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: max })

  return (
    <div>
      <div className={styles.row}>
        <label className={styles.amount} htmlFor="amount">
          <span>Valor</span>
          <input id="amount" inputMode="decimal" value={amount} aria-invalid={touched && !!validation}
            onChange={(e) => { setAmount(e.target.value); setTouched(true) }} />
        </label>
        <CurrencySelect id="from" label="De" value={from} currencies={currencies} disabled={loading} onChange={onFromChange} />
        <button type="button" className={styles.swap} onClick={onSwap} aria-label="Inverter moedas">⇄</button>
        <CurrencySelect id="to" label="Para" value={to} currencies={currencies} disabled={loading} onChange={onToChange} />
      </div>
      {touched && validation && <p className={styles.error} role="alert">{validation}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.result} aria-live="polite">
        {rateLoading && <p>Buscando cotação…</p>}
        {!rateLoading && result !== null && (
          <>
            <p className={styles.big}>{fmt(parseAmount(amount))} {from} = <strong>{fmt(result, 4)} {to}</strong></p>
            <p className={styles.meta}>
              Taxa: 1 {from} = {data.rate.toLocaleString('pt-BR', { maximumFractionDigits: 6 })} {to}
              {data.date && <> · Cotação de {formatDateBR(data.date)}</>}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
