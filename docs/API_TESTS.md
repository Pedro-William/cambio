# Testes de API (Postman)

Collection: `postman/Frankfurter.postman_collection.json`. Base: `https://api.frankfurter.dev/v2`.

| # | Requisição | Esperado | Resultado observado |
|---|---|---|---|
| 1 | GET /currencies | 200, lista de moedas | _preencher_ |
| 2 | GET /rate/EUR/USD | 200, objeto com data e taxa | _preencher_ |
| 3 | GET /rates?from=2024-05-01&to=2024-05-31&base=EUR&quotes=USD | 200, uma cotação por dia útil | _preencher_ |
| 4 | GET /rate/EUR/XXX | 4xx para moeda inexistente | _preencher_ |
| 5 | GET /rates com `from` > `to` | erro ou vazio | _preencher_ |
| 6 | GET /rates com `group=week` | séries agrupadas | _preencher_ |

