# Testes de API (Postman)

- Collection: `postman/Frankfurter.postman_collection.json`
- Base URL: `https://api.frankfurter.dev/v2` (variável `baseUrl` na collection)

## Como executar
1. No Postman: **Import** e selecione o arquivo da collection.
2. Rode cada requisição com **Send** e confira a aba **Test Results**.

## Resultados
| # | Requisição | Esperado | Status |
|---|---|---|---|---|---|
| 1 | `GET /currencies` | 200, lista de moedas | 200 OK |
| 2 | `GET /rate/EUR/USD` | 200, objeto com data e taxa | 200 OK |
| 3 | `GET /rates?from=2024-05-01&to=2024-05-31&base=EUR&quotes=USD` | 200, uma cotação por dia útil | 200 OK | 
| 4 | `GET /rate/EUR/XXX` | 4xx para moeda inexistente | 422 Unprocessable Entity |
| 5 | `GET /rates` com `from` maior que `to` | erro ou lista vazia | Lista vazia |
| 6 | `GET /rates` com `group=week` | séries agrupadas | _preencher_ | 

## Estrutura real das respostas
Cole aqui, para cada endpoint usado, um exemplo curto do JSON recebido e indique quais campos a aplicação usa (`src/services/api.js`).

```json
1 -
[
  { "iso_code": "ALL", "iso_numeric": "008", "name": "Albanian Lek", "symbol": "L", "start_date": "1998-07-07", "end_date": "2026-11-02" },
  { "iso_code": "BCH", "iso_numeric": null, "name": "Bitcoin Cash", "symbol": "Ƀ", "start_date": "2018-12-31", "end_date": "2026-10-30" }
]

2 - 

{"date":"2026-11-02","base":"EUR","quote":"USD","rate":1.1186}

3 - 

[{"date":"2024-05-01","base":"EUR","quote":"USD","rate":1.0708},{"date":"2024-05-02","base":"EUR","quote":"USD","rate":1.0708},{"date":"2024-05-03","base":"EUR","quote":"USD","rate":1.0733},{"date":"2024-05-04","base":"EUR","quote":"USD","rate":1.0737},{"date":"2024-05-05","base":"EUR","quote":"USD","rate":1.0739},{"date":"2024-05-06","base":"EUR","quote":"USD","rate":1.076},{"date":"2024-05-07","base":"EUR","quote":"USD","rate":1.0768},{"date":"2024-05-08","base":"EUR","quote":"USD","rate":1.0756}]

4 - 

{"status":422,"message":"invalid currency: XXX"}

5 - 

[]

6 -

[{"date":"2020-01-01","base":"EUR","quote":"USD","rate":1.1182},{"date":"2020-01-08","base":"EUR","quote":"USD","rate":1.1139},{"date":"2020-01-15","base":"EUR","quote":"USD","rate":1.1131},{"date":"2020-01-22","base":"EUR","quote":"USD","rate":1.1081},{"date":"2020-01-29","base":"EUR","quote":"USD","rate":1.1027},{"date":"2020-02-05","base":"EUR","quote":"USD","rate":1.1022},{"date":"2020-02-12","base":"EUR","quote":"USD","rate":1.0902},{"date":"2020-02-19","base":"EUR","quote":"USD","rate":1.0816},{"date":"2020-02-26","base":"EUR","quote":"USD","rate":1.0896},{"date":"2020-03-04","base":"EUR","quote":"USD","rate":1.1147},{"date":"2020-03-11","base":"EUR","quote":"USD","rate":1.1296},{"date":"2020-03-18","base":"EUR","quote":"USD","rate":1.0959},{"date":"2020-03-25","base":"EUR","quote":"USD","rate":1.0873},{"date":"2020-04-01","base":"EUR","quote":"USD","rate":1.0956},{"date":"2020-04-08","base":"EUR","quote":"USD","rate":1.0855},{"date":"2020-04-15","base":"EUR","quote":"USD","rate":1.0912}]

```

