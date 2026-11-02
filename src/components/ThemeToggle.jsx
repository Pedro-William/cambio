import styles from './ThemeToggle.module.css'
import { useLanguage } from '../i18n/LanguageContext'

export default function ThemeToggle({ theme, onToggle }) {
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  return (
    <button type="button" className={styles.btn} onClick={onToggle} aria-pressed={isDark}>
      <span aria-hidden="true">{isDark ? '☾' : '☀'}</span> {isDark ? t('theme.dark') : t('theme.light')}
    </button>
  )
}
