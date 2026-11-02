# Mapeamento de componentes

| Componente | Responsabilidade | JSX | CSS Module | Principais props | Estados / hooks |
|---|---|---|---|---|---|
| App | Raiz; guarda o par de moedas (lifting state up) e monta o cabeçalho | `App.jsx` | `App.module.css` | — | `from`, `to`; `useCurrencies`, `useTheme`, `useLanguage` |
| LanguageSwitch | Botões PT/EN | `components/LanguageSwitch.jsx` | `LanguageSwitch.module.css` | — | usa `useLanguage` (`lang`, `setLang`) |
| ThemeToggle | Botão de tema claro/escuro | `components/ThemeToggle.jsx` | `ThemeToggle.module.css` | `theme, onToggle` | — |
| Converter | Valor, seleção, resultado, taxa e data | `components/Converter.jsx` | `Converter.module.css` | `currencies, loading, from, to, onFromChange, onToChange, onSwap` | `amount`, `touched`; `useRate` |
| CurrencySelect | Select de moeda reutilizável | `components/CurrencySelect.jsx` | `CurrencySelect.module.css` | `id, label, value, currencies, onChange, disabled` | — |
| HistorySection | Orquestra período, gráfico e tabela | `components/HistorySection.jsx` | `HistorySection.module.css` | `from, to` | `period`; `useHistory` |
| PeriodSelector | Botões de período | `components/PeriodSelector.jsx` | `PeriodSelector.module.css` | `value, onChange` | — |
| RateChart | Gráfico de linha | `components/RateChart.jsx` | — (cores por variáveis CSS) | `rows` | — |
| RatesTable | Tabela, ordenação, contador, CSV | `components/RatesTable.jsx` | `RatesTable.module.css` | `rows, from, to` | `filters`, `sort`, `message` |
| Filters | Campos de filtro e limpar | `components/Filters.jsx` | `Filters.module.css` | `filters, onChange, onClear, error` | — |

## Hooks e contexto
| Item | Arquivo | Responsabilidade |
|---|---|---|
| `useCurrencies()` | `hooks/useCurrencies.js` | Lista de moedas: `{ currencies, loading, error }` |
| `useRate(from, to)` | `hooks/useRate.js` | Taxa atual do par: `{ data, loading, error }` |
| `useHistory(from, to, period)` | `hooks/useHistory.js` | Série histórica: `{ rows, loading, error }` |
| `useTheme()` | `hooks/useTheme.js` | Tema atual e `toggleTheme`; grava em `localStorage` e aplica `data-theme` no `<html>` |
| `LanguageProvider` / `useLanguage()` | `i18n/LanguageContext.jsx` | Idioma, `locale` e função `t(chave, variáveis)` para todos os componentes |
| `translations` / `translate` | `i18n/translations.js` | Dicionários PT/EN e função de tradução com fallback |

Os hooks de dados usam `useEffect` + `services/api.js` e tratam respostas antigas com um indicador `active` no cleanup.

## Relação entre componentes
```
LanguageProvider (main.jsx)
└─ App ─┬─ LanguageSwitch
        ├─ ThemeToggle
        ├─ Converter ── CurrencySelect (x2)
        └─ HistorySection ─┬─ PeriodSelector
                           ├─ RateChart
                           └─ RatesTable ── Filters
```
Os componentes que exibem texto consomem `useLanguage()`; as funções de `utils/` e `services/` são independentes de idioma e devolvem chaves de tradução nos erros.
