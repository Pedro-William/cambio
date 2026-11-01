import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { formatDate } from '../utils/dates'
import { useLanguage } from '../i18n/LanguageContext'

export default function RateChart({ rows }) {
  const { t, locale } = useLanguage()
  const fmt = (d) => formatDate(d, locale)
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={rows} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--line)" strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={fmt} minTickGap={48} stroke="var(--muted)" fontSize={12} />
          <YAxis domain={['auto', 'auto']} stroke="var(--muted)" fontSize={12} width={56} />
          <Tooltip labelFormatter={fmt} contentStyle={{ background: 'var(--panel)', border: '1px solid var(--line)' }} />
          <Line type="monotone" dataKey="rate" name={t('chart.rate')} stroke="var(--accent)" strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
