import { useState } from 'react'
import styles from './App.module.css'
import Converter from './components/Converter'
import HistorySection from './components/HistorySection'
import { useCurrencies } from './hooks/useCurrencies'
import { DEFAULT_FROM, DEFAULT_TO } from './constants/periods'
import LanguageSwitch from './components/LanguageSwitch'
import { useLanguage } from './i18n/LanguageContext'

export default function App() {
  const [from, setFrom] = useState(DEFAULT_FROM)
  const [to, setTo] = useState(DEFAULT_TO)
  const { currencies, loading, error } = useCurrencies()
  const { t } = useLanguage()

  const swap = () => { setFrom(to); setTo(from) }

  return (
    <main className={styles.page}>
            <header className={styles.header}>
        <div className={styles.top}>
          <h1>Câmbio</h1>
          <div className={styles.controls}>
            <LanguageSwitch />
          </div>
        </div>
        <p>{t('app.subtitle')}</p>
      </header>
          {error && <p className={styles.error} role="alert">{t(error)}</p>}
      <div className={styles.grid}>
        <section className={styles.card} aria-labelledby="conv">
            <h2 id="conv">{t('app.converter')}</h2>
          <Converter currencies={currencies} loading={loading} from={from} to={to}
            onFromChange={setFrom} onToChange={setTo} onSwap={swap} />
        </section>
        <section className={styles.card} aria-labelledby="hist">
            <h2 id="hist">{t('app.history', { from, to })}</h2>
          <HistorySection from={from} to={to} />
        </section>
      </div>
    </main>
  )
}
