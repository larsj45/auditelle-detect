import type { ReactNode } from 'react'
import styles from './LettrineApp.module.css'
import type { LettrineAppCopy } from './appCopy'

export default function AppFrame({
  copy,
  action,
  narrow = false,
  children,
}: {
  copy: LettrineAppCopy
  action?: ReactNode
  narrow?: boolean
  children: ReactNode
}) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href={copy.landingPath}>
          {copy.brand}
          <span>{copy.locale === 'fr' ? 'Éditorial' : 'Editorial'}</span>
        </a>
        {action}
      </header>
      <main className={`${styles.main} ${narrow ? styles.narrow : ''}`}>{children}</main>
    </div>
  )
}
