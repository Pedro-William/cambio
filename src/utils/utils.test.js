import { describe, it, expect } from 'vitest'
import { convertAmount, validateAmount, parseAmount, filterRows, sortRows, validateFilters } from './rates'
import { buildCsv, buildCsvFilename, downloadCsv } from './csv'
import { getPeriodRange } from './dates'
import { PERIODS } from '../constants/periods'

const rows = [
  { date: '2024-05-01', base: 'EUR', quote: 'USD', rate: 1.07 },
  { date: '2024-05-02', base: 'EUR', quote: 'USD', rate: 1.09 },
  { date: '2024-05-03', base: 'EUR', quote: 'USD', rate: 1.08 },
]

describe('conversão e validação', () => {
  it('converte valor pela taxa', () => expect(convertAmount(10, 1.5)).toBeCloseTo(15))
  it('rejeita vazio, texto, zero e negativo', () => {
    ;['', 'abc', '0', '-5'].forEach((v) => expect(validateAmount(v)).toBeTruthy())
  })
  it('aceita vírgula decimal', () => {
    expect(validateAmount('10,5')).toBeNull()
    expect(parseAmount('10,5')).toBe(10.5)
  })
})

describe('filtros e ordenação', () => {
  it('filtra por datas', () => expect(filterRows(rows, { startDate: '2024-05-02' })).toHaveLength(2))
  it('filtra por cotação', () => expect(filterRows(rows, { minRate: '1.08', maxRate: '1.09' })).toHaveLength(2))
  it('combina filtros', () => expect(filterRows(rows, { startDate: '2024-05-02', maxRate: 1.08 })).toHaveLength(1))
  it('sem filtros retorna tudo', () => expect(filterRows(rows, {})).toHaveLength(3))
  it('ordena por cotação desc sem mutar', () => {
    const s = sortRows(rows, 'rate', 'desc')
    expect(s[0].rate).toBe(1.09)
    expect(rows[0].rate).toBe(1.07)
  })
  it('ordena por data asc', () => expect(sortRows(rows.slice().reverse(), 'date', 'asc')[0].date).toBe('2024-05-01'))
  it('detecta intervalos inválidos', () => {
    expect(validateFilters({ startDate: '2024-06-01', endDate: '2024-05-01' })).toBeTruthy()
    expect(validateFilters({ minRate: 2, maxRate: 1 })).toBeTruthy()
  })
})

describe('CSV e datas', () => {
  it('gera cabeçalho e linhas', () => {
    const lines = buildCsv(rows).split('\n')
    expect(lines[0]).toBe('data,moeda_origem,moeda_destino,cotacao')
    expect(lines).toHaveLength(4)
  })
  it('nome identificável', () => expect(buildCsvFilename('EUR', 'USD', new Date('2024-05-10'))).toBe('cotacoes_EUR-USD_2024-05-10.csv'))
  it('impede exportação vazia', () => expect(() => downloadCsv([], 'x.csv')).toThrow())
  it('calcula período de 7 dias', () => {
    expect(getPeriodRange(PERIODS[0], new Date(2024, 4, 10))).toEqual({ from: '2024-05-03', to: '2024-05-10' })
  })
})
