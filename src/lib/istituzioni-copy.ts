// Italian landing for universities and business schools on auditelle.fr.
// Claims are kept within what the French /etablissements page and the
// corrected company copy can support: data stored in the EU (Supabase, Paris),
// analysis by the Pangram Labs engine, a signal and never a verdict.
// The application itself is in French for now, so the call to action is an
// email to the team rather than a self-service signup.

export const ISTITUZIONI_PATH = '/istituzioni'
export const ISTITUZIONI_CONTACT = 'contact@auditelle.fr'

const MAIL_SUBJECT = 'Lettrine: richiesta di 20 analisi gratuite'
const MAIL_BODY = [
  'Buongiorno,',
  '',
  'vorremmo provare Lettrine con 20 analisi gratuite.',
  '',
  'Istituzione:',
  'Ruolo:',
  'Corsi o programmi interessati:',
  '',
  'Grazie.',
].join('\n')

export function istituzioniMailto(subject = MAIL_SUBJECT, body = MAIL_BODY): string {
  return `mailto:${ISTITUZIONI_CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const istituzioniCopy = {
  metadata: {
    title: 'Lettrine per le università e le business school | Integrità accademica e IA',
    description:
      "Lettrine segnala passaggio per passaggio le parti probabilmente generate o assistite dall'IA e le similarità con fonti esistenti, anche nei testi in italiano. Un segnale per il docente, non un verdetto. 20 analisi gratuite e pilota di 30 giorni.",
  },
  badge: 'Per università, business school e docenti',
  hero: {
    title: "L'uso dell'IA nelle tesi e negli elaborati,",
    highlight: 'reso leggibile',
    lead:
      "Molte istituzioni chiedono ormai agli studenti di dichiarare l'uso dell'IA. Lettrine aiuta i docenti a capire dove l'IA compare in un testo scritto, anche in italiano, per discuterne con lo studente. Senza decisioni automatiche.",
    badges: [
      'Analisi IA e similarità',
      'Testi in italiano',
      'Un segnale, non un verdetto',
      "Dati archiviati nell'UE",
    ],
    primaryCta: 'Richiedi 20 analisi gratuite',
    secondaryCta: 'Scopri il pilota',
  },
  posture: {
    title: 'Un segnale da leggere,',
    highlight: 'non una prova',
    body:
      "Lettrine non decide al posto del docente e non sanziona nessuno. Indica i passaggi da guardare con attenzione e produce un report chiaro, da usare come spunto per un colloquio con lo studente. La valutazione resta umana.",
  },
  features: {
    title: 'Che cosa offre Lettrine alla vostra istituzione',
    items: [
      {
        icon: 'cpu',
        title: 'IA e similarità nello stesso report',
        description:
          "Il motore di rilevamento Pangram Labs e una ricerca di similarità con fonti esistenti, in un unico report.",
      },
      {
        icon: 'languages',
        title: "Pensato anche per l'italiano",
        description:
          "Il motore Pangram Labs supporta l'italiano. Molti strumenti diffusi analizzano l'IA solo in poche lingue e non in italiano.",
      },
      {
        icon: 'ruler',
        title: 'Passaggio per passaggio',
        description:
          'Un punteggio e i passaggi segnalati aiutano il docente a orientarsi, senza sostituire il suo giudizio.',
      },
      {
        icon: 'file',
        title: 'Report esportabile',
        description:
          'Esportate un report chiaro da allegare al fascicolo di valutazione o da condividere con una commissione.',
      },
      {
        icon: 'lock',
        title: "Dati archiviati nell'UE",
        description:
          "I dati delle analisi sono archiviati nell'Unione europea (Supabase, regione di Parigi). Il testo viene analizzato dal motore Pangram Labs.",
      },
      {
        icon: 'layers',
        title: 'Nessuna installazione',
        description: 'I docenti lo usano direttamente nel browser. Si inizia in pochi minuti.',
      },
    ],
  },
  gdpr: {
    title: 'GDPR: che cosa garantiamo oggi',
    body:
      "I dati delle analisi sono archiviati nell'Unione europea (Supabase, regione di Parigi) e il testo viene analizzato dal motore Pangram Labs. Lettrine è un servizio di Auditelle SASU, società francese (SIREN 945117000). Prima di qualsiasi pilota vi comunichiamo nel dettaglio i trattamenti e i responsabili del trattamento coinvolti, perché il vostro DPO possa valutarli.",
  },
  trial: {
    title: '20 analisi gratuite per 30 giorni',
    body:
      "Per valutare lo strumento con calma: scriveteci dal vostro indirizzo istituzionale e vi attiviamo 20 analisi gratuite, valide 30 giorni. Vi chiediamo di provarlo con testi vostri o con esempi, non con elaborati di studenti.",
    note: "L'interfaccia di Lettrine è al momento in francese. I testi analizzati possono essere in italiano.",
  },
  pilot: {
    title: 'Come funziona il pilota',
    steps: [
      {
        title: 'Colloquio gratuito',
        description:
          'Venti minuti per capire le vostre regole sull’uso dell’IA, i volumi e i vincoli, e verificare se un pilota ha senso.',
      },
      {
        title: 'Pilota di 30 giorni',
        description:
          'I vostri docenti analizzano elaborati reali con Lettrine, con il nostro protocollo di lettura dei segnali.',
      },
      {
        title: 'Decisione',
        description:
          'Il bilancio finale vi fornisce gli elementi per decidere con cognizione di causa se estendere il servizio.',
      },
    ],
    card: {
      title: 'Pilota di integrità accademica, 30 giorni',
      price: '1.500 € IVA esclusa',
      priceNote: "Pagamento all'ordine, su fattura",
      includes: [
        '5 utenti della vostra istituzione',
        'Fino a 100 unità di analisi (1 unità = fino a 1.000 parole; ogni nuova analisi conta)',
        'Onboarding di 60 minuti',
        'Protocollo di lettura dei segnali e di prevenzione dei falsi positivi',
        'Bilancio finale con raccomandazioni sulla policy e sull’estensione del servizio',
      ],
      excludesTitle: 'Non incluso',
      excludes: [
        'SSO, integrazione LMS, white label, SLA',
        'Pareri disciplinari',
        'Nessun addebito automatico oltre le 100 unità',
      ],
      cta: 'Richiedi il pilota',
    },
  },
  closing: {
    title: 'Partite da 20 analisi gratuite',
    body: 'Scriveteci dal vostro indirizzo istituzionale: rispondiamo via email, senza bisogno di fissare un appuntamento.',
    cta: 'Scrivici',
  },
  footer: {
    rights: 'Tutti i diritti riservati.',
    contact: 'Contatti',
  },
} as const

export const istituzioniPilotMailto = () =>
  istituzioniMailto(
    'Lettrine: richiesta di pilota di 30 giorni',
    ['Buongiorno,', '', 'vorremmo valutare un pilota di 30 giorni di Lettrine.', '', 'Istituzione:', 'Ruolo:', '', 'Grazie.'].join('\n')
  )
