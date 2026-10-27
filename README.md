# Câmbio — conversor e análise de moedas

SPA em React para converter moedas e analisar o histórico de cotações usando a [API Frankfurter](https://frankfurter.dev) (v2).

## Funcionalidades
- Conversor com moeda de origem/destino, valor, taxa, data da cotação, inversão e validação de entrada.
- Histórico em gráfico para 7d, 15d, 30d, 3m, 6m, 1a, 5a e 10a (atualiza ao trocar par ou período).
- Tabela com filtros combináveis (datas, cotação mín./máx.), ordenação por data/cotação e contador de registros.
- Exportação CSV apenas dos registros filtrados (com cabeçalho, gerada no navegador, nome identificável, bloqueada se vazia).

## Tecnologias
React 18, Vite, CSS Modules, Recharts, Vitest.

## Instalação e execução
```bash
npm install
npm run dev      # desenvolvimento
npm test         # testes das funções
npm run build    # build de produção
```

## Arquitetura
```
src/
  components/  UI (um .jsx + um .module.css por componente)
  hooks/       useCurrencies, useRate, useHistory (custom hooks com fetch + useEffect)
  services/    api.js (fetch/async-await, normalização das respostas)
  utils/       funções puras: conversão, validação, filtros, ordenação, CSV, datas
  constants/   períodos e configuração da API
```
O par de moedas é um *lifting state up* em `App.jsx`, compartilhado entre conversor e histórico.

## Documentação
`docs/REQUIREMENTS.md`, `docs/COMPONENTS.md`, `docs/FIGMA.md`, `docs/API_TESTS.md`, `docs/FUNCTION_TESTS.md`, `docs/AI_USAGE.md`, `postman/Frankfurter.postman_collection.json`.

## Imagens
Adicione prints em `src/assets/` e referencie aqui após rodar o projeto.
