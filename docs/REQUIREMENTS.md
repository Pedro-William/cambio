# Requisitos

## Contexto
Pessoas que viajam, compram no exterior ou acompanham o câmbio precisam converter valores e entender a variação da cotação. O projeto é acadêmico, individual e incremental.

## Público-alvo
Usuários gerais que querem consultar cotações; estudantes que analisam séries históricas.

## Objetivo
Oferecer conversão de moedas e análise histórica (gráfico, tabela, CSV) em uma SPA React sem back-end próprio.

## Escopo
Dentro: conversor, histórico/gráfico, tabela com filtros e ordenação, exportação CSV.
Fora: autenticação, cadastro, back-end, banco de dados, pagamentos, compra/venda real.

## Requisitos funcionais
| ID | Requisito |
|----|-----------|
| RF01 | Listar moedas disponíveis e selecionar origem e destino |
| RF02 | Informar valor e exibir valor convertido |
| RF03 | Exibir taxa e data efetiva da cotação |
| RF04 | Inverter moedas |
| RF05 | Validar entradas inválidas |
| RF06 | Escolher período (7d, 15d, 30d, 3m, 6m, 1a, 5a, 10a) |
| RF07 | Atualizar gráfico ao mudar par ou período |
| RF08 | Tabela: data, origem, destino, cotação |
| RF09 | Filtrar por intervalo de datas e por cotação mín./máx. (combinados) e limpar filtros |
| RF10 | Ordenar por data e por cotação |
| RF11 | Exibir quantidade de registros encontrados |
| RF12 | Exportar CSV só do resultado filtrado, com cabeçalho, nome identificável; bloquear se vazio |

## Requisitos não funcionais
- RNF01 Interface responsiva (mobile e desktop) e acessível (labels, foco visível, `aria-live`).
- RNF02 Estados de carregamento e erro para toda chamada de API.
- RNF03 Código componentizado, lógica em funções puras testáveis.
- RNF04 Sem dependência de back-end próprio.

## Regras de negócio
- RN01 Valor convertido = valor × taxa obtida da API (cálculo feito na aplicação).
- RN02 Valor deve ser número maior que zero; vírgula decimal é aceita.
- RN03 Data inicial não pode ser maior que a final; cotação mínima não pode exceder a máxima.
- RN04 Filtros combinam-se com E lógico.
- RN05 CSV contém exatamente os registros exibidos após filtros, na ordem escolhida.
- RN06 Moedas iguais resultam em taxa 1 e sem histórico.

## Critérios de aceite
- CA01 Converter 1 EUR → USD mostra valor, taxa e data.
- CA02 Valor vazio, texto, zero ou negativo exibe mensagem e não converte.
- CA03 Trocar o período dispara nova busca e redesenha o gráfico.
- CA04 Aplicar filtros altera tabela e contador; limpar restaura todos os registros.
- CA05 Exportar com filtros gera CSV com o mesmo número de linhas do contador + cabeçalho.
- CA06 Com 0 registros, o botão de exportação fica desabilitado.
