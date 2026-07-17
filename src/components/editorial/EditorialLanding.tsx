'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Download,
  FileText,
  Menu,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react'
import styles from './EditorialLanding.module.css'

type ModalName = 'report' | 'contact' | null

interface EditorialLandingProps {
  supportEmail: string
}

const workflow = [
  {
    number: '01',
    title: 'Soumettre',
    description:
      'Ajoutez un manuscrit et associez-le à la revue, au numéro ou au dossier éditorial concerné.',
  },
  {
    number: '02',
    title: 'Analyser',
    description:
      "Obtenez les signaux liés au contenu IA et à la similarité, avec les passages et sources disponibles.",
  },
  {
    number: '03',
    title: 'Examiner',
    description:
      'Le comité interprète les résultats dans le contexte scientifique. Auditelle ne rend pas de verdict.',
  },
  {
    number: '04',
    title: 'Documenter',
    description:
      "Exportez le rapport et conservez une trace claire de l'analyse dans l'historique éditorial.",
  },
]

const queueRows = [
  ['Lexicographie historique', 'À examiner', '3 passages', '18 %', 'Disponible'],
  ['Archives ouvertes et science', 'Terminée', 'Aucun signal', '6 %', 'Disponible'],
  ['Éthique des données cliniques', 'En cours', '—', '—', 'En attente'],
  ['Pédagogies critiques numériques', 'À examiner', '1 passage', '12 %', 'Disponible'],
  ['Corpus et traduction assistée', 'Terminée', 'Aucun signal', '9 %', 'Disponible'],
]

const plans = [
  {
    name: 'Essentiel',
    audience: 'Pour une petite revue ou un comité éditorial resserré.',
    price: 'Tarif à valider',
    period: 'offre annuelle préparée avec votre équipe',
    volume: 'Volume éditorial défini après cadrage',
    features: [
      'Équipe éditoriale restreinte',
      'Analyse IA et similarité',
      'Rapports PDF exportables',
      'Historique des manuscrits',
      'Support par email',
    ],
  },
  {
    name: 'Revue',
    audience: 'Pour une revue active avec plusieurs éditeurs ou sections.',
    price: 'Tarif à valider',
    period: 'offre annuelle préparée avec votre équipe',
    volume: 'Volume adapté au rythme de publication',
    features: [
      'Plusieurs éditeurs ou sections',
      'Analyse IA et similarité',
      'Rapports et historique complet',
      'Suivi de consommation',
      "Session d'onboarding",
    ],
    featured: true,
  },
  {
    name: 'Organisation',
    audience: "Pour une maison d'édition, une société savante ou un portefeuille de revues.",
    price: 'Sur devis',
    period: 'volume et gouvernance personnalisés',
    volume: 'Plusieurs revues ou équipes',
    features: [
      'Éditeurs et administrateurs',
      'Volumes adaptés par revue',
      'Onboarding accompagné',
      'Conditions de conservation dédiées',
      'Support prioritaire',
    ],
  },
]

const faqs = [
  {
    question: 'Auditelle décide-t-il si un auteur a utilisé une IA ?',
    answer:
      "Non. Auditelle met en évidence des signaux et des passages à examiner. L'interprétation appartient toujours au comité éditorial, dans le contexte du manuscrit et de la politique de la revue.",
  },
  {
    question: 'Que comprend un contrôle éditorial ?',
    answer:
      "Le prototype prévoit une analyse du contenu IA, une analyse de similarité, les passages signalés et un rapport exportable. La définition contractuelle finale dépendra des moteurs activés pour votre offre.",
  },
  {
    question: 'Les manuscrits sont-ils utilisés pour entraîner des modèles ?',
    answer:
      "Les conditions de traitement doivent être confirmées dans la documentation contractuelle de chaque prestataire activé. Auditelle les présente avant la mise en production de la revue.",
  },
  {
    question: "Peut-on ajouter des contrôles en cours d'année ?",
    answer:
      'Oui. Des blocs de contrôles supplémentaires sont prévus sans modifier la date de renouvellement annuelle.',
  },
  {
    question: 'Combien de temps faut-il pour démarrer ?',
    answer:
      "Une petite équipe peut être configurée rapidement après validation des responsables, des rôles d'accès, de la politique de conservation et du volume annuel.",
  },
]

export default function EditorialLanding({ supportEmail }: EditorialLandingProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState<ModalName>(null)
  const [selectedPlan, setSelectedPlan] = useState('À définir')
  const [submitted, setSubmitted] = useState(false)
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

  const openContact = (plan = 'À définir') => {
    setSelectedPlan(plan)
    setSubmitted(false)
    setModal('contact')
  }

  const closeMobileMenu = () => setMenuOpen(false)

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Auditelle Éditorial — ${selectedPlan}`)
    const body = encodeURIComponent(
      [
        `Nom : ${form.get('name')}`,
        `Email : ${form.get('email')}`,
        `Organisation : ${form.get('organization')}`,
        `Volume annuel : ${form.get('volume')}`,
        `Offre : ${selectedPlan}`,
        '',
        String(form.get('message') || ''),
      ].join('\n')
    )

    setSubmitted(true)
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`
  }

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#editorial-main">
        Aller au contenu
      </a>

      <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#editorial-top" aria-label="Auditelle Éditorial, accueil">
            <span className={styles.brandName}>Auditelle</span>
            <span className={styles.brandProduct}>Éditorial</span>
          </a>

          <nav className={styles.desktopNav} aria-label="Navigation principale">
            <a href="#editorial-product">Produit</a>
            <a href="#editorial-workflow">Fonctionnement</a>
            <a href="#editorial-privacy">Confidentialité</a>
            <a href="#editorial-pricing">Tarifs</a>
            <a href="#editorial-faq">FAQ</a>
          </nav>

          <div className={styles.headerActions}>
            <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={() => openContact()}>
              Demander une démonstration
            </button>
            <button
              className={styles.menuButton}
              type="button"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              aria-controls="editorial-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>

          {menuOpen && (
            <nav className={styles.mobileNav} id="editorial-mobile-menu" aria-label="Navigation mobile">
              <a href="#editorial-product" onClick={closeMobileMenu}>Produit</a>
              <a href="#editorial-workflow" onClick={closeMobileMenu}>Fonctionnement</a>
              <a href="#editorial-privacy" onClick={closeMobileMenu}>Confidentialité</a>
              <a href="#editorial-pricing" onClick={closeMobileMenu}>Tarifs</a>
              <a href="#editorial-faq" onClick={closeMobileMenu}>FAQ</a>
              <button
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={() => {
                  closeMobileMenu()
                  openContact()
                }}
              >
                Demander une démonstration
              </button>
            </nav>
          )}
        </div>
      </header>

      <main id="editorial-main">
        <section className={styles.hero} id="editorial-top">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Plateforme d&apos;intégrité éditoriale</p>
              <h1>L&apos;intégrité éditoriale pour les revues scientifiques francophones.</h1>
              <p className={styles.heroLead}>
                Analysez les manuscrits, identifiez les signaux liés à l&apos;IA et à la similarité,
                puis documentez chaque décision éditoriale dans un rapport clair. La révision reste humaine.
              </p>
              <div className={styles.heroActions}>
                <a className={`${styles.button} ${styles.buttonLight} ${styles.buttonLarge}`} href="#editorial-pricing">
                  Découvrir l&apos;offre Éditorial
                  <ArrowRight size={17} />
                </a>
                <button
                  className={`${styles.button} ${styles.buttonOutlineLight} ${styles.buttonLarge}`}
                  onClick={() => setModal('report')}
                >
                  <FileText size={17} />
                  Voir un exemple de rapport
                </button>
              </div>
              <div className={styles.trustLine} aria-label="Principes du produit">
                <span>Signaux, pas verdicts</span>
                <span>Accès multi-éditeurs</span>
                <span>Rapports exportables</span>
              </div>
            </div>
          </div>

          <ReportPreview />
        </section>

        <section className={styles.audienceStrip} aria-labelledby="editorial-audience-title">
          <div className={styles.audienceInner}>
            <div className={styles.audienceLabel} id="editorial-audience-title">
              Conçu pour celles et ceux qui publient
            </div>
            <div className={styles.audienceItem}>Revues scientifiques</div>
            <div className={styles.audienceItem}>Maisons d&apos;édition</div>
            <div className={styles.audienceItem}>Sociétés savantes</div>
            <div className={styles.audienceItem}>Comités scientifiques</div>
          </div>
        </section>

        <section className={styles.section} id="editorial-workflow">
          <div className={styles.sectionInner}>
            <SectionHeading
              label="Un processus documenté"
              title="De la soumission à la décision éditoriale, sans rupture de contexte."
              intro="Auditelle rassemble l'analyse, les passages à examiner et l'historique de la revue dans un espace de travail commun."
            />
            <div className={styles.workflow}>
              {workflow.map((step) => (
                <article className={styles.workflowStep} key={step.number}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionDark}`} id="editorial-product">
          <div className={styles.sectionInner}>
            <SectionHeading
              label="L'espace éditorial"
              title="Une file de manuscrits lisible par toute l'équipe."
              intro="Suivez le statut de chaque analyse, les signaux à examiner et les rapports disponibles sans multiplier les feuilles de calcul."
            />
            <WorkspacePreview />
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionMuted}`} id="editorial-privacy">
          <div className={styles.sectionInner}>
            <SectionHeading
              centered
              label="Confidentialité par conception"
              title="Les manuscrits méritent un cadre explicite."
              intro="Auditelle est conçu pour documenter la conservation, les accès et les prestataires impliqués avant le déploiement d'une équipe éditoriale."
            />
            <div className={styles.principles}>
              <Principle number="01" title="Accès maîtrisés">
                Des rôles distincts pour les responsables, éditeurs et lecteurs, avec un historique rattaché à chaque manuscrit.
              </Principle>
              <Principle number="02" title="Conservation définie">
                Une politique de conservation et de suppression est fixée avec la revue avant la mise en production.
              </Principle>
              <Principle number="03" title="Prestataires documentés">
                Les moteurs d&apos;analyse et leurs conditions de traitement sont identifiés dans la documentation contractuelle.
              </Principle>
            </div>
          </div>
        </section>

        <section className={styles.section} id="editorial-pricing">
          <div className={styles.sectionInner}>
              <SectionHeading
                centered
                label="Cadrage annuel"
                title="Un volume de contrôles adapté au rythme de votre revue."
                intro="Les prix, volumes et conditions prestataires sont validés avec chaque revue avant toute proposition contractuelle."
              />
            <div className={styles.pricingGrid}>
              {plans.map((plan) => (
                <article
                  className={`${styles.priceCard} ${plan.featured ? styles.priceCardFeatured : ''}`}
                  key={plan.name}
                >
                  {plan.featured && <span className={styles.priceBadge}>Recommandé</span>}
                  <div className={styles.priceName}>{plan.name}</div>
                  <div className={styles.priceAudience}>{plan.audience}</div>
                  <div className={styles.price}>{plan.price}</div>
                  <div className={styles.pricePeriod}>{plan.period}</div>
                  <div className={styles.priceVolume}>{plan.volume}</div>
                  <ul className={styles.priceList}>
                    {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  <button
                    className={`${styles.button} ${plan.featured ? styles.buttonPrimary : styles.buttonOutline}`}
                    onClick={() => openContact(`Éditorial ${plan.name}`)}
                  >
                    {plan.name === 'Organisation' ? 'Parler à Auditelle' : `Préparer ${plan.name}`}
                  </button>
                </article>
              ))}
            </div>
            <div className={styles.pricingNote}>
              <span><strong>Tarifs non publiés :</strong> l&apos;offre reste contact-led.</span>
              <span>Les hypothèses de prix et de blocs supplémentaires ne sont pas affichées tant que les coûts et les termes prestataires ne sont pas validés.</span>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionMuted}`} id="editorial-faq">
          <div className={styles.sectionInner}>
            <SectionHeading centered label="Questions fréquentes" title="Ce qu'une équipe éditoriale doit savoir." />
            <div className={styles.faqList}>
              {faqs.map((faq) => (
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
              <h2>Donnez à votre comité des signaux clairs, pas un verdict automatique.</h2>
              <p>Découvrez comment Auditelle Éditorial peut s&apos;intégrer au flux de votre revue scientifique.</p>
            </div>
            <div className={styles.closingActions}>
              <button className={`${styles.button} ${styles.buttonLight} ${styles.buttonLarge}`} onClick={() => openContact()}>
                Demander une démonstration
                <ArrowRight size={17} />
              </button>
              <button className={`${styles.button} ${styles.buttonOutlineLight} ${styles.buttonLarge}`} onClick={() => setModal('report')}>
                Voir le rapport
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.brand}>
            <span className={styles.brandName}>Auditelle</span>
            <span className={styles.brandProduct}>Éditorial</span>
          </div>
          <div className={styles.footerMeta}>Auditelle SASU · Paris · SIREN 945117000</div>
          <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </div>
      </footer>

      {modal === 'report' && (
        <Modal title="Exemple de rapport éditorial" onClose={() => setModal(null)} closeButtonRef={closeButtonRef}>
          <FullReport />
        </Modal>
      )}

      {modal === 'contact' && (
        <Modal title="Parler de votre flux éditorial" onClose={() => setModal(null)} closeButtonRef={closeButtonRef} narrow>
          {submitted ? (
            <div className={styles.successMessage}>
              <ShieldCheck size={36} />
              <h3>Demande préparée.</h3>
              <p>Votre application de messagerie va ouvrir un email prérempli pour l&apos;équipe Auditelle.</p>
              <button className={`${styles.button} ${styles.buttonPrimary}`} onClick={() => setModal(null)}>Fermer</button>
            </div>
          ) : (
            <ContactForm selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} onSubmit={handleContactSubmit} />
          )}
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

function ReportPreview() {
  return (
    <div className={styles.reportScene} aria-label="Aperçu du rapport Auditelle">
      <div className={styles.reportTopbar}>
        <span className={styles.reportId}>RAPPORT-2026-0341</span>
        <span className={styles.reportStatus}>Analyse terminée</span>
      </div>
      <div className={styles.reportBody}>
        <div className={styles.reportKicker}>Manuscrit · 6 214 mots · Revue des humanités numériques</div>
        <div className={styles.reportTitle}>Approches computationnelles de la lexicographie historique</div>
        <div className={styles.reportGrid}>
          <div className={styles.signalBlock}>
            <span className={`${styles.signalValue} ${styles.signalOchre}`}>3</span>
            <span className={styles.signalLabel}>passages IA à examiner</span>
          </div>
          <div className={styles.signalBlock}>
            <span className={`${styles.signalValue} ${styles.signalGreen}`}>18 %</span>
            <span className={styles.signalLabel}>similarité · 2 sources</span>
          </div>
        </div>
        <div className={styles.manuscript}>
          Les corpus numérisés permettent une couverture diachronique sans précédent.{' '}
          <mark className={styles.markAi}>Les modèles de langue offrent une productivité accrue dans l&apos;extraction des variantes graphiques</mark>, sous réserve d&apos;une{' '}
          <mark className={styles.markSimilarity}>validation philologique menée par des spécialistes du domaine</mark>.
        </div>
        <div className={styles.reportNote}>
          <span>À examiner par le comité de rédaction.</span>
          <strong>Exporter le rapport PDF</strong>
        </div>
      </div>
    </div>
  )
}

function WorkspacePreview() {
  return (
    <div className={styles.workspaceShell} aria-label="Aperçu de l'espace Auditelle Éditorial">
      <div className={styles.workspaceBar}>
        <span className={styles.workspaceBrand}>AUDITELLE / REVUE DÉMO</span>
        <span>Cycle éditorial 2026</span>
        <div className={styles.workspaceActions}>
          <span className={styles.workspaceAction}>Exporter</span>
          <span className={styles.workspaceAction}>Nouveau manuscrit</span>
        </div>
      </div>
      <div className={styles.workspaceBody}>
        <aside className={styles.workspaceSidebar}>
          <span className={styles.active}>Manuscrits</span>
          <span>Rapports</span>
          <span>Équipe</span>
          <span>Consommation</span>
          <span>Paramètres</span>
        </aside>
        <div className={styles.queue}>
          <div className={styles.queueHeading}>
            <div>
              <h3>Manuscrits récents</h3>
              <p>24 soumissions · 18 analyses terminées</p>
            </div>
            <span className={styles.workspaceAction}>Filtrer</span>
          </div>
          <table className={styles.queueTable}>
            <thead>
              <tr><th>Manuscrit</th><th>Statut</th><th>IA</th><th>Similarité</th><th>Rapport</th></tr>
            </thead>
            <tbody>
              {queueRows.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>
                    <span className={`${styles.statusPill} ${row[1] === 'À examiner' ? styles.statusReview : row[1] === 'Terminée' ? styles.statusReady : styles.statusRunning}`}>
                      {row[1]}
                    </span>
                  </td>
                  <td>{row[2]}</td><td>{row[3]}</td><td>{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Principle({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
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
  children,
  onClose,
  closeButtonRef,
  narrow = false,
}: {
  title: string
  children: React.ReactNode
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
  narrow?: boolean
}) {
  return (
    <div className={styles.modal} role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <div className={`${styles.modalPanel} ${narrow ? styles.modalPanelNarrow : ''}`}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button ref={closeButtonRef} className={styles.modalClose} onClick={onClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  )
}

function FullReport() {
  return (
    <div className={styles.fullReport}>
      <div className={styles.fullReportCopy}>
        <div className={styles.reportKicker}>RAPPORT-2026-0341 · MANUSCRIT ANONYMISÉ</div>
        <h3>Approches computationnelles de la lexicographie historique</h3>
        <p>
          Les corpus numérisés permettent désormais une couverture diachronique sans précédent.{' '}
          <mark className={styles.markAi}>Les modèles de langue offrent une productivité accrue dans l&apos;extraction des variantes graphiques</mark>, sous réserve d&apos;une validation philologique menée par des spécialistes.
        </p>
        <p>
          Cette évolution transforme les pratiques de documentation.{' '}
          <mark className={styles.markSimilarity}>La constitution de corpus comparables reste cependant une condition essentielle de la robustesse des analyses</mark>, notamment lorsque les sources présentent des niveaux de numérisation hétérogènes.
        </p>
        <p>L&apos;équipe éditoriale met les signaux en relation avec la méthodologie, les citations et la politique de la revue avant toute décision.</p>
      </div>
      <aside className={styles.fullReportSignals}>
        <h3>Signaux à examiner</h3>
        <Finding title="Contenu IA" detail="3 passages signalés · niveau à examiner" tone="ochre" />
        <Finding title="Similarité" detail="18 % · 2 sources associées" tone="green" />
        <Finding title="Contexte" detail="6 214 mots · sciences humaines" />
        <Finding title="Principe" detail="Ce rapport ne constitue pas un verdict." />
        <button className={`${styles.button} ${styles.buttonOutline}`}>
          <Download size={16} />
          Exporter PDF
        </button>
      </aside>
    </div>
  )
}

function Finding({ title, detail, tone }: { title: string; detail: string; tone?: 'ochre' | 'green' }) {
  return (
    <div className={styles.finding}>
      <strong className={tone === 'ochre' ? styles.findingOchre : tone === 'green' ? styles.findingGreen : ''}>{title}</strong>
      <span>{detail}</span>
    </div>
  )
}

function ContactForm({
  selectedPlan,
  onPlanChange,
  onSubmit,
}: {
  selectedPlan: string
  onPlanChange: (plan: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formGrid}>
        <label className={styles.field}>
          <span>Nom</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label className={styles.field}>
          <span>Email professionnel</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className={styles.field}>
          <span>Revue ou organisation</span>
          <input name="organization" autoComplete="organization" required />
        </label>
        <label className={styles.field}>
          <span>Manuscrits par an</span>
          <select name="volume" defaultValue="300 à 600">
            <option>Moins de 300</option>
            <option>300 à 600</option>
            <option>600 à 1 500</option>
            <option>Plus de 1 500</option>
          </select>
        </label>
        <label className={`${styles.field} ${styles.fieldFull}`}>
          <span>Offre envisagée</span>
          <select value={selectedPlan} onChange={(event) => onPlanChange(event.target.value)}>
            <option>À définir</option>
            <option>Éditorial Essentiel</option>
            <option>Éditorial Revue</option>
            <option>Éditorial Organisation</option>
          </select>
        </label>
        <label className={`${styles.field} ${styles.fieldFull}`}>
          <span>Contexte</span>
          <textarea name="message" rows={4} placeholder="Décrivez votre processus éditorial et les contrôles recherchés." />
        </label>
      </div>
      <div className={styles.formActions}>
        <p>Votre message sera préparé dans votre application email.</p>
        <button className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonLarge}`} type="submit">
          <Send size={16} />
          Préparer la demande
        </button>
      </div>
    </form>
  )
}
