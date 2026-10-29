import styles from './LanguageSwitch.module.css'
import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div className={styles.group} role="group" aria-label={t('lang.label')}>
      {['pt', 'en'].map((code) => (
        <button key={code} type="button" lang={code} aria-pressed={lang === code}
          className={lang === code ? styles.active : ''} onClick={() => setLang(code)}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}