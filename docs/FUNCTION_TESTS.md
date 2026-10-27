# Testes das funções JavaScript

Arquivo: `src/utils/utils.test.js` — execute com `npm test` (Vitest).

| Função | Casos |
|---|---|
| convertAmount | multiplicação pela taxa |
| validateAmount / parseAmount | vazio, texto, zero, negativo, vírgula decimal |
| filterRows | datas, cotação, filtros combinados, sem filtros |
| sortRows | por cotação desc, por data asc, sem mutar entrada |
| validateFilters | datas invertidas, mín. > máx. |
| buildCsv / buildCsvFilename / downloadCsv | cabeçalho, nº de linhas, nome, erro se vazio |
| getPeriodRange | período de 7 dias |

Resultado: 14 testes passando.
