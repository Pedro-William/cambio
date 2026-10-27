# Mapeamento de componentes

| Componente | Responsabilidade | JSX | CSS Module | Principais props | Estados |
|---|---|---|---|---|---|
| App | Raiz; guarda o par de moedas (lifting state up) | `App.jsx` | `App.module.css` | — | `from`, `to` |
| Converter | Valor, seleção, resultado, taxa e data | `components/Converter.jsx` | `Converter.module.css` | `currencies, loading, from, to, onFromChange, onToChange, onSwap` | `amount`, `touched` |
| CurrencySelect | Select de moeda reutilizável | `components/CurrencySelect.jsx` | `CurrencySelect.module.css` | `id, label, value, currencies, onChange, disabled` | — |
| HistorySection | Orquestra período, gráfico e tabela | `components/HistorySection.jsx` | `HistorySection.module.css` | `from, to` | `period` |
| PeriodSelector | Botões de período | `components/PeriodSelector.jsx` | `PeriodSelector.module.css` | `value, onChange` | — |
| RateChart | Gráfico de linha | `components/RateChart.jsx` | — (estilo inline/variáveis) | `rows` | — |
| RatesTable | Tabela, ordenação, contador, CSV | `components/RatesTable.jsx` | `RatesTable.module.css` | `rows, from, to` | `filters`, `sort`, `message` |
| Filters | Campos de filtro e limpar | `components/Filters.jsx` | `Filters.module.css` | `filters, onChange, onClear, error` | — |

## Hooks
`useCurrencies()`, `useRate(from, to)`, `useHistory(from, to, period)` — cada um usa `useEffect` + `services/api.js` e devolve `{ data/rows, loading, error }`.

## Relação entre componentes
```
App ─┬─ Converter ── CurrencySelect (x2)
     └─ HistorySection ─┬─ PeriodSelector
                        ├─ RateChart
                        └─ RatesTable ── Filters
```
