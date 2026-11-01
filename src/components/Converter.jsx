import { useState } from 'react'
import styles from './Converter.module.css'
import CurrencySelect from './CurrencySelect'
import { useRate } from '../hooks/useRate'
import { convertAmount, parseAmount, validateAmount } from '../utils/rates'
import { formatDate } from '../utils/dates'
import { useLanguage } from '../i18n/LanguageContext'

export default function Converter({ currencies, loading, from, to, onFromChange, onToChange, onSwap }) {
  const [amount, setAmount] = useState('1')
  const [touched, setTouched] = useState(false)
  const { t, locale } = useLanguage()
  const { data, loading: rateLoading, error } = useRate(from, to)

  const validation = validateAmount(amount)
  const result = !validation && data ? convertAmount(parseAmount(amount), data.rate) : null
  const fmt = (n, max = 2) => n.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: max })

  return (
    <div>
      <div className={styles.row}>
        <label className={styles.amount} htmlFor="amount">
          <span>{t('conv.amount')}</span>
          <input id="amount" inputMode="decimal" value={amount} aria-invalid={touched && !!validation}
            onChange={(e) => { setAmount(e.target.value); setTouched(true) }} />
        </label>
        <CurrencySelect id="from" label={t('conv.from')} value={from} currencies={currencies} disabled={loading} onChange={onFromChange} />
        <button type="button" className={styles.swap} onClick={onSwap} aria-label={t('conv.swap')}>⇄</button>
        <CurrencySelect id="to" label={t('conv.to')} value={to} currencies={currencies} disabled={loading} onChange={onToChange} />
      </div>
      {touched && validation && <p className={styles.error} role="alert">{t(validation)}</p>}
      {error && <p className={styles.error} role="alert">{t(error)}</p>}
      <div className={styles.result} aria-live="polite">
        {rateLoading && <p>{t('conv.loadingRate')}</p>}
        {!rateLoading && result !== null && (
          <>
            <p className={styles.big}>{fmt(parseAmount(amount))} {from} = <strong>{fmt(result, 4)} {to}</strong></p>
            <p className={styles.meta}>
              {t('conv.rate', { from, to, rate: data.rate.toLocaleString(locale, { maximumFractionDigits: 6 }) })}
              {data.date && <> · {t('conv.date', { date: formatDate(data.date, locale) })}</>}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
