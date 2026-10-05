'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Download,
  FileText,
  Menu,
  X,
} from 'lucide-react'
import type {
  EditorialCopy,
} from './editorialCopy'
import { OPEN_COOKIE_CONSENT_EVENT } from '@/components/CookieConsent'
import styles from './EditorialLanding.module.css'

type ModalName = 'report' | null

interface EditorialLandingProps {
  content: EditorialCopy
  supportEmail: string
}

export default function EditorialLanding({
  content,
  supportEmail,
}: EditorialLandingProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState<ModalName>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    if (modal) closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
    }
  }, [modal])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModal(null)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const closeMobileMenu = () => setMenuOpen(false)

  return (
    <div className={styles.page} lang={content.htmlLang}>
      <a className={styles.skipLink} href="#editorial-main">
        {content.common.skipLink}
      </a>

      <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#editorial-top" aria-label={content.brand.ariaLabel}>
            <span className={styles.brandName}>{content.brand.name}</span>
            <span className={styles.brandProduct}>{content.brand.product}</span>
          </a>

          <nav className={styles.desktopNav} aria-label={content.navigation.ariaLabel}>
            <a href="#editorial-product">{content.navigation.product}</a>
            <a href="#editorial-workflow">{content.navigation.workflow}</a>
            <a href="#editorial-privacy">{content.navigation.privacy}</a>
            <a href="#editorial-pricing">{content.navigation.pricing}</a>
            <a href="#editorial-faq">{content.navigation.faq}</a>
          </nav>

          <div className={styles.headerActions}>
            <a className={`${styles.button} ${styles.buttonPrimary}`} href={content.signupPath}>
              {content.common.demoCta}
            </a>
            <button
              className={styles.menuButton}
              type="button"
              aria-label={
                menuOpen
                  ? content.navigation.closeMenu
                  : content.navigation.openMenu
              }
              aria-expanded={menuOpen}
              aria-controls="editorial-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>

          {menuOpen && (
            <nav
              className={styles.mobileNav}
              id="editorial-mobile-menu"
              aria-label={content.navigation.mobileAriaLabel}
            >
              <a href="#editorial-product" onClick={closeMobileMenu}>
                {content.navigation.product}
              </a>
              <a href="#editorial-workflow" onClick={closeMobileMenu}>
                {content.navigation.workflow}
              </a>
              <a href="#editorial-privacy" onClick={closeMobileMenu}>
                {content.navigation.privacy}
              </a>
              <a href="#editorial-pricing" onClick={closeMobileMenu}>
                {content.navigation.pricing}
              </a>
              <a href="#editorial-faq" onClick={closeMobileMenu}>
                {content.navigation.faq}
              </a>
              <a className={`${styles.button} ${styles.buttonPrimary}`} href={content.signupPath} onClick={closeMobileMenu}>
                {content.common.demoCta}
              </a>
            </nav>
          )}
        </div>
      </header>

      <main id="editorial-main">
        <section className={styles.hero} id="editorial-top">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{content.hero.eyebrow}</p>
              <h1>{content.hero.title}</h1>
              <p className={styles.heroLead}>{content.hero.lead}</p>
              <div className={styles.heroActions}>
                <a
                  className={`${styles.button} ${styles.buttonLight} ${styles.buttonLarge}`}
                  href="#editorial-pricing"
                >
                  {content.hero.offerCta}
                  <ArrowRight size={17} />
                </a>
                <button
                  className={`${styles.button} ${styles.buttonOutlineLight} ${styles.buttonLarge}`}
                  onClick={() => setModal('report')}
                >
                  <FileText size={17} />
                  {content.common.reportCta}
                </button>
              </div>
              <div
                className={styles.trustLine}
                aria-label={content.hero.principlesAriaLabel}
              >
                {content.hero.principles.map((principle) => (
                  <span key={principle}>{principle}</span>
                ))}
              </div>
            </div>
          </div>

          <ReportPreview content={content} />
        </section>

        <section
          className={styles.audienceStrip}
          aria-labelledby="editorial-audience-title"
        >
          <div className={styles.audienceInner}>
            <div className={styles.audienceLabel} id="editorial-audience-title">
              {content.audience.label}
            </div>
            {content.audience.items.map((item) => (
              <div className={styles.audienceItem} key={item}>{item}</div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="editorial-workflow">
          <div className={styles.sectionInner}>
            <SectionHeading
              label={content.workflow.label}
              title={content.workflow.title}
              intro={content.workflow.intro}
            />
            <div className={styles.workflow}>
              {content.workflow.steps.map((step) => (
                <article className={styles.workflowStep} key={step.number}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.sectionDark}`}
          id="editorial-product"
        >
          <div className={styles.sectionInner}>
            <SectionHeading
              label={content.product.label}
              title={content.product.title}
              intro={content.product.intro}
            />
            <WorkspacePreview content={content} />
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.sectionMuted}`}
          id="editorial-privacy"
        >
          <div className={styles.sectionInner}>
            <SectionHeading
              centered
              label={content.privacy.label}
              title={content.privacy.title}
              intro={content.privacy.intro}
            />
            <div className={styles.principles}>
              {content.privacy.principles.map((principle) => (
                <Principle
                  key={principle.number}
                  number={principle.number}
                  title={principle.title}
                >
                  {principle.description}
                </Principle>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="editorial-pricing">
          <div className={styles.sectionInner}>
            <SectionHeading
              centered
              label={content.pricing.label}
              title={content.pricing.title}
              intro={content.pricing.intro}
            />
            <div className={styles.pricingGrid}>
              {content.pricing.plans.map((plan) => (
                <article
                  className={`${styles.priceCard} ${plan.featured ? styles.priceCardFeatured : ''}`}
                  key={plan.id}
                >
                  {plan.featured && (
                    <span className={styles.priceBadge}>
                      {content.pricing.recommended}
                    </span>
                  )}
                  <div className={styles.priceName}>{plan.name}</div>
                  <div className={styles.priceAudience}>{plan.audience}</div>
                  <div className={styles.price}>{plan.price}</div>
                  <div className={styles.pricePeriod}>{plan.period}</div>
                  <div className={styles.priceVolume}>{plan.volume}</div>
                  <ul className={styles.priceList}>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <a
                    className={`${styles.button} ${plan.featured ? styles.buttonPrimary : styles.buttonOutline}`}
                    href={content.signupPath}
                  >
                    {content.common.demoCta}
                  </a>
                </article>
              ))}
            </div>
            <div className={styles.pricingNote}>
              <span>
                <strong>{content.pricing.noteTitle}</strong>{' '}
                {content.pricing.noteLead}
              </span>
              <span>{content.pricing.noteDetail}</span>
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.sectionMuted}`}
          id="editorial-faq"
        >
          <div className={styles.sectionInner}>
            <SectionHeading
              centered
              label={content.faq.label}
              title={content.faq.title}
            />
            <div className={styles.faqList}>
              {content.faq.items.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.closing}>
          <div className={styles.closingInner}>
            <div>
              <h2>{content.closing.title}</h2>
              <p>{content.closing.description}</p>
            </div>
            <div className={styles.closingActions}>
              <a
                className={`${styles.button} ${styles.buttonLight} ${styles.buttonLarge}`}
                href={content.signupPath}
              >
                {content.common.demoCta}
                <ArrowRight size={17} />
              </a>
              <button
                className={`${styles.button} ${styles.buttonOutlineLight} ${styles.buttonLarge}`}
                onClick={() => setModal('report')}
              >
                {content.common.reportCta}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.brand}>
            <span className={styles.brandName}>{content.brand.name}</span>
            <span className={styles.brandProduct}>{content.brand.product}</span>
          </div>
          <div className={styles.footerMeta}>
            {content.footer.legal} ·{' '}
            <a href={content.privacyNoticePath}>{content.footer.privacyLink}</a> ·{' '}
            <button
              type="button"
              className={styles.footerLinkButton}
              onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_CONSENT_EVENT))}
            >
              {content.footer.manageCookies}
            </button>
          </div>
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </div>
      </footer>

      {modal === 'report' && (
        <Modal
          title={content.reportModal.title}
          closeLabel={content.common.close}
          onClose={() => setModal(null)}
          closeButtonRef={closeButtonRef}
        >
          <FullReport content={content} />
        </Modal>
      )}

    </div>
  )
}

function SectionHeading({
  label,
  title,
  intro,
  centered = false,
}: {
  label: string
  title: string
  intro?: string
  centered?: boolean
}) {
  return (
    <div className={`${styles.sectionHeading} ${centered ? styles.sectionHeadingCentered : ''}`}>
      <div className={styles.sectionLabel}>{label}</div>
      <h2>{title}</h2>
      {intro && <p className={styles.sectionIntro}>{intro}</p>}
    </div>
  )
}

function ReportPreview({ content }: { content: EditorialCopy }) {
  const report = content.reportPreview

  return (
    <div className={styles.reportScene} aria-label={report.ariaLabel}>
      <div className={styles.reportTopbar}>
        <span className={styles.reportId}>{report.id}</span>
        <span className={styles.reportStatus}>{report.status}</span>
      </div>
      <div className={styles.reportBody}>
        <div className={styles.reportKicker}>{report.kicker}</div>
        <div className={styles.reportTitle}>{report.title}</div>
        <div className={styles.reportGrid}>
          <div className={styles.signalBlock}>
            <span className={`${styles.signalValue} ${styles.signalOchre}`}>
              {report.aiValue}
            </span>
            <span className={styles.signalLabel}>{report.aiLabel}</span>
          </div>
          <div className={styles.signalBlock}>
            <span className={`${styles.signalValue} ${styles.signalGreen}`}>
              {report.similarityValue}
            </span>
            <span className={styles.signalLabel}>{report.similarityLabel}</span>
          </div>
        </div>
        <div className={styles.manuscript}>
          {report.beforeAi}
          <mark className={styles.markAi}>{report.aiPassage}</mark>
          {report.betweenMarks}
          <mark className={styles.markSimilarity}>{report.similarityPassage}</mark>.
        </div>
        <div className={styles.reportNote}>
          <span>{report.note}</span>
          <strong>{report.exportLabel}</strong>
        </div>
      </div>
    </div>
  )
}

function WorkspacePreview({ content }: { content: EditorialCopy }) {
  const workspace = content.workspace

  return (
    <div className={styles.workspaceShell} aria-label={workspace.ariaLabel}>
      <div className={styles.workspaceBar}>
        <span className={styles.workspaceBrand}>{workspace.brand}</span>
        <span>{workspace.cycle}</span>
        <div className={styles.workspaceActions}>
          <span className={styles.workspaceAction}>{workspace.export}</span>
          <span className={styles.workspaceAction}>{workspace.newManuscript}</span>
        </div>
      </div>
      <div className={styles.workspaceBody}>
        <aside className={styles.workspaceSidebar}>
          {workspace.sidebar.map((item, index) => (
            <span className={index === 0 ? styles.active : ''} key={item}>
              {item}
            </span>
          ))}
        </aside>
        <div className={styles.queue}>
          <div className={styles.queueHeading}>
            <div>
              <h3>{workspace.recentTitle}</h3>
              <p>{workspace.recentSummary}</p>
            </div>
            <span className={styles.workspaceAction}>{workspace.filter}</span>
          </div>
          <table className={styles.queueTable}>
            <thead>
              <tr>
                {workspace.headers.map((header) => <th key={header}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {workspace.rows.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>
                    <span
                      className={`${styles.statusPill} ${
                        row[1] === workspace.reviewStatus
                          ? styles.statusReview
                          : row[1] === workspace.readyStatus
                            ? styles.statusReady
                            : styles.statusRunning
                      }`}
                    >
                      {row[1]}
                    </span>
                  </td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Principle({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <article className={styles.principle}>
      <span className={styles.principleTag}>{number}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  )
}

function Modal({
  title,
  closeLabel,
  children,
  onClose,
  closeButtonRef,
  narrow = false,
}: {
  title: string
  closeLabel: string
  children: React.ReactNode
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
  narrow?: boolean
}) {
  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className={`${styles.modalPanel} ${narrow ? styles.modalPanelNarrow : ''}`}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button
            ref={closeButtonRef}
            className={styles.modalClose}
            onClick={onClose}
            aria-label={closeLabel}
          >
            <X size={20} />
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  )
}

function FullReport({ content }: { content: EditorialCopy }) {
  const report = content.reportModal

  return (
    <div className={styles.fullReport}>
      <div className={styles.fullReportCopy}>
        <div className={styles.reportKicker}>{report.kicker}</div>
        <h3>{report.manuscriptTitle}</h3>
        {report.paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph.before}
            {paragraph.marked && (
              <mark
                className={
                  paragraph.tone === 'ai'
                    ? styles.markAi
                    : styles.markSimilarity
                }
              >
                {paragraph.marked}
              </mark>
            )}
            {paragraph.after}
          </p>
        ))}
      </div>
      <aside className={styles.fullReportSignals}>
        <h3>{report.findingsTitle}</h3>
        {report.findings.map((finding) => (
          <Finding
            key={finding.title}
            title={finding.title}
            detail={finding.detail}
            tone={finding.tone}
          />
        ))}
        <button className={`${styles.button} ${styles.buttonOutline}`}>
          <Download size={16} />
          {report.exportLabel}
        </button>
      </aside>
    </div>
  )
}

function Finding({
  title,
  detail,
  tone,
}: {
  title: string
  detail: string
  tone?: 'ochre' | 'green'
}) {
  return (
    <div className={styles.finding}>
      <strong
        className={
          tone === 'ochre'
            ? styles.findingOchre
            : tone === 'green'
              ? styles.findingGreen
              : ''
        }
      >
        {title}
      </strong>
      <span>{detail}</span>
    </div>
  )
}
