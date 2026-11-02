# Testes das funções JavaScript

Execução: `npm test` (Vitest). Arquivos: `src/utils/utils.test.js` e `src/i18n/i18n.test.js`.

| Função | Arquivo | Casos testados |
|---|---|---|
| `convertAmount` | `utils/rates.js` | multiplicação pela taxa |
| `validateAmount` / `parseAmount` | `utils/rates.js` | vazio, texto, zero, negativo, vírgula decimal |
| `filterRows` | `utils/rates.js` | datas, cotação, filtros combinados, sem filtros |
| `sortRows` | `utils/rates.js` | por cotação desc, por data asc, sem mutar a entrada |
| `validateFilters` | `utils/rates.js` | datas invertidas, mín. > máx. |
| `buildCsv` / `buildCsvFilename` / `downloadCsv` | `utils/csv.js` | cabeçalho, nº de linhas, nome do arquivo, erro se vazio, cabeçalhos traduzidos |
| `getPeriodRange` | `utils/dates.js` | período de 7 dias |
| `formatDate` | `utils/dates.js` | data em `pt-BR` (10/05/2024) e `en-US` (5/10/2024) |
| `translate` | `i18n/translations.js` | interpolação de variáveis, fallback para PT e para a chave |
| `translations` | `i18n/translations.js` | PT e EN com exatamente as mesmas chaves |

## Resultado
- `utils.test.js`: 14 testes
- `i18n.test.js`: 5 testes
- **Total: 19 testes passando** 

![Resultado do npm test](img/npm-test.png)
