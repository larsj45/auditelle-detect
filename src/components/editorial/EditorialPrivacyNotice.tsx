import type { EditorialPrivacyCopy } from './editorialPrivacyCopy'
import styles from './EditorialPrivacyNotice.module.css'

export default function EditorialPrivacyNotice({
  content,
  footerLegal,
}: {
  content: EditorialPrivacyCopy
  footerLegal: string
}) {
  return (
    <div className={styles.page} lang={content.htmlLang}>
      <main className={styles.main}>
        <a className={styles.back} href={content.backPath}>
          ← {content.backLabel}
        </a>
        <h1>{content.title}</h1>
        <p className={styles.updated}>{content.updated}</p>
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </main>
      <footer className={styles.footer}>{footerLegal}</footer>
    </div>
  )
}
