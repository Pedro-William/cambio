import { useState } from 'react'
import styles from './App.module.css'
import Converter from './components/Converter'
import HistorySection from './components/HistorySection'
import { useCurrencies } from './hooks/useCurrencies'
import { DEFAULT_FROM, DEFAULT_TO } from './constants/periods'

export default function App() {
  // Lifting state up: o par de moedas é compartilhado entre conversor e histórico.
  const [from, setFrom] = useState(DEFAULT_FROM)
  const [to, setTo] = useState(DEFAULT_TO)
  const { currencies, loading, error } = useCurrencies()

  const swap = () => { setFrom(to); setTo(from) }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Câmbio</h1>
        <p>Converta moedas e acompanhe a evolução da cotação (dados do Banco Central Europeu via Frankfurter).</p>
      </header>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.grid}>
        <section className={styles.card} aria-labelledby="conv">
          <h2 id="conv">Conversor</h2>
          <Converter currencies={currencies} loading={loading} from={from} to={to}
            onFromChange={setFrom} onToChange={setTo} onSwap={swap} />
        </section>
        <section className={styles.card} aria-labelledby="hist">
          <h2 id="hist">Histórico de {from} → {to}</h2>
          <HistorySection from={from} to={to} />
        </section>
      </div>
    </main>
  )
}
