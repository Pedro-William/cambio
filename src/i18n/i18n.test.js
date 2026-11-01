import { describe, it, expect } from 'vitest'
import { translate, translations } from './translations'
import { formatDate } from '../utils/dates'
import { buildCsv } from '../utils/csv'

describe('i18n', () => {
  it('traduz e interpola variáveis', () => {
    expect(translate('pt', 'table.count', { count: 3, total: 10 })).toBe('3 de 10 registros')
    expect(translate('en', 'table.count', { count: 3, total: 10 })).toBe('3 of 10 records')
  })
  it('usa PT quando falta a chave e a própria chave se não existir', () => {
    expect(translate('en', 'chave.inexistente')).toBe('chave.inexistente')
  })
  it('PT e EN têm exatamente as mesmas chaves', () => {
    expect(Object.keys(translations.en).sort()).toEqual(Object.keys(translations.pt).sort())
  })
  it('formata datas por idioma', () => {
    expect(formatDate('2024-05-10', 'pt-BR')).toBe('10/05/2024')
    expect(formatDate('2024-05-10', 'en-US')).toBe('5/10/2024')
  })
  it('permite cabeçalhos de CSV traduzidos', () => {
    expect(buildCsv([], ['date', 'from_currency', 'to_currency', 'rate'])).toBe('date,from_currency,to_currency,rate')
  })
})
