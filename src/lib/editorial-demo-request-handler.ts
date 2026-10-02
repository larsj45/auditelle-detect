import { escapeHtml } from './sanitize.ts'
import {
  validateEditorialDemoRequest,
  type EditorialDemoErrorCode,
  type EditorialDemoJournalCount,
  type EditorialDemoLocale,
  type EditorialDemoPlan,
  type EditorialDemoRequest,
  type EditorialDemoVolume,
} from './editorial-demo-request.ts'

export interface EditorialEmailParams {
  to: string
  subject: string
  html: string
  text: string
  fromName: string
  replyTo: string
}

interface EditorialEmailResult {
  success: boolean
}

interface EditorialDemoRequestDependencies {
  resellerId: string
  supportEmail: string
  clientKey: string
  takeRateLimitSlot: (clientKey: string) => boolean
  sendEmail: (params: EditorialEmailParams) => Promise<EditorialEmailResult>
}

export interface EditorialDemoHandlerResult {
  status: number
  body:
    | { success: true }
    | { success: false; errorCode: EditorialDemoErrorCode }
}

interface EditorialEmailCopy {
  brand: string
  internalTitle: string
  internalIntro: string
  contextTitle: string
  missingContext: string
  replyInstruction: string
  internalSubject: (organization: string) => string
  labels: {
    name: string
    email: string
    organization: string
    role: string
    journalCount: string
    volume: string
    plan: string
  }
  journalCounts: Record<EditorialDemoJournalCount, string>
  volumes: Record<EditorialDemoVolume, string>
  plans: Record<EditorialDemoPlan, string>
  confirmationSubject: string
  confirmationTitle: string
  greeting: (name: string) => string
  confirmationReceived: (organization: string) => string
  confirmationNext: string
  signature: string
}

const emailCopy: Record<EditorialDemoLocale, EditorialEmailCopy> = {
  fr: {
    brand: 'Auditelle Éditorial',
    internalTitle: 'Nouvelle demande de compte démo Éditorial',
    internalIntro: 'Une institution souhaite évaluer Auditelle Éditorial.',
    contextTitle: 'Contexte',
    missingContext: 'Non renseigné',
    replyInstruction: 'Répondre directement à cet email pour poursuivre par écrit.',
    internalSubject: (organization) => `[FR] Compte démo Éditorial — ${organization}`,
    labels: {
      name: 'Nom',
      email: 'Email',
      organization: 'Organisation',
      role: 'Fonction',
      journalCount: 'Revues',
      volume: 'Manuscrits par an',
      plan: 'Format envisagé',
    },
    journalCounts: {
      one: '1 revue',
      two_to_five: '2 à 5 revues',
      six_plus: '6 revues ou plus',
    },
    volumes: {
      under_300: 'Moins de 300',
      '300_600': '300 à 600',
      '600_1500': '600 à 1 500',
      over_1500: 'Plus de 1 500',
    },
    plans: {
      undecided: 'À définir',
      essential: 'Éditorial Essentiel',
      journal: 'Éditorial Revue',
      organization: 'Éditorial Organisation',
    },
    confirmationSubject: 'Votre demande de compte démo Auditelle Éditorial',
    confirmationTitle: 'Votre demande de compte démo est bien reçue',
    greeting: (name) => `Bonjour ${name},`,
    confirmationReceived: (organization) =>
      `Nous avons reçu la demande de ${organization} pour évaluer Auditelle Éditorial.`,
    confirmationNext:
      "Notre équipe vérifie l'éligibilité et le périmètre demandé. Si la demande est retenue, les instructions d'accès au compte démo seront envoyées par email. Aucun rendez-vous n'est nécessaire.",
    signature: 'Auditelle Éditorial',
  },
  sv: {
    brand: 'Verify Editorial',
    internalTitle: 'Ny begäran om ett demokonto för Verify Editorial',
    internalIntro: 'En organisation vill utvärdera Verify Editorial.',
    contextTitle: 'Bakgrund',
    missingContext: 'Ingen information lämnad',
    replyInstruction: 'Svara direkt på detta meddelande för att fortsätta via e-post.',
    internalSubject: (organization) => `[SV] Demokonto Verify Editorial — ${organization}`,
    labels: {
      name: 'Namn',
      email: 'E-post',
      organization: 'Organisation',
      role: 'Roll',
      journalCount: 'Tidskrifter',
      volume: 'Manuskript per år',
      plan: 'Önskad prisplan',
    },
    journalCounts: {
      one: '1 tidskrift',
      two_to_five: '2 till 5 tidskrifter',
      six_plus: '6 tidskrifter eller fler',
    },
    volumes: {
      under_300: 'Färre än 300',
      '300_600': '300 till 600',
      '600_1500': '600 till 1 500',
      over_1500: 'Fler än 1 500',
    },
    plans: {
      undecided: 'Inte bestämd',
      essential: 'Editorial Essential',
      journal: 'Editorial Journal',
      organization: 'Editorial Organisation',
    },
    confirmationSubject: 'Vi har tagit emot er begäran om ett demokonto för Verify Editorial',
    confirmationTitle: 'Er begäran om ett demokonto har tagits emot',
    greeting: (name) => `Hej ${name},`,
    confirmationReceived: (organization) =>
      `Vi har tagit emot en begäran från ${organization} om att utvärdera Verify Editorial.`,
    confirmationNext:
      'Vi bedömer organisationen och den önskade prisplanen. Om begäran godkänns skickas åtkomstinstruktioner via e-post. Inget möte krävs.',
    signature: 'Verify Editorial · Auditelle SASU',
  },
}

function requestRows(data: EditorialDemoRequest, copy: EditorialEmailCopy) {
  return [
    [copy.labels.name, data.name],
    [copy.labels.email, data.email],
    [copy.labels.organization, data.organization],
    [copy.labels.role, data.role],
    [copy.labels.journalCount, copy.journalCounts[data.journalCount]],
    [copy.labels.volume, copy.volumes[data.volume]],
    [copy.labels.plan, copy.plans[data.plan]],
  ]
}

function internalEmailHtml(data: EditorialDemoRequest, copy: EditorialEmailCopy) {
  const rows = requestRows(data, copy)

  return `
    <h1>${escapeHtml(copy.internalTitle)}</h1>
    <p>${escapeHtml(copy.internalIntro)}</p>
    <table cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      ${rows.map(([label, value]) => `
        <tr>
          <th align="left" style="border-bottom: 1px solid #d9dedb;">${escapeHtml(label)}</th>
          <td style="border-bottom: 1px solid #d9dedb;">${escapeHtml(value)}</td>
        </tr>
      `).join('')}
    </table>
    <h2>${escapeHtml(copy.contextTitle)}</h2>
    <p style="white-space: pre-wrap;">${escapeHtml(data.message || copy.missingContext)}</p>
    <p>${escapeHtml(copy.replyInstruction)}</p>
  `
}

function internalEmailText(data: EditorialDemoRequest, copy: EditorialEmailCopy) {
  const replyInstruction = data.locale === 'sv'
    ? ['', copy.replyInstruction]
    : []

  return [
    copy.internalTitle,
    '',
    ...requestRows(data, copy).map(([label, value]) => `${label}: ${value}`),
    '',
    `${copy.contextTitle}:`,
    data.message || copy.missingContext,
    ...replyInstruction,
  ].join('\n')
}

function confirmationEmailHtml(
  data: EditorialDemoRequest,
  copy: EditorialEmailCopy
) {
  return `
    <h1>${escapeHtml(copy.confirmationTitle)}</h1>
    <p>${escapeHtml(copy.greeting(data.name))}</p>
    <p>${escapeHtml(copy.confirmationReceived(data.organization))}</p>
    <p>${escapeHtml(copy.confirmationNext)}</p>
    <p>${escapeHtml(copy.signature)}</p>
  `
}

function confirmationEmailText(
  data: EditorialDemoRequest,
  copy: EditorialEmailCopy
) {
  return [
    copy.greeting(data.name),
    '',
    copy.confirmationReceived(data.organization),
    '',
    copy.confirmationNext,
    '',
    copy.signature,
  ].join('\n')
}

export async function handleEditorialDemoRequest(
  payload: unknown,
  dependencies: EditorialDemoRequestDependencies
): Promise<EditorialDemoHandlerResult> {
  if (dependencies.resellerId !== 'auditelle-fr') {
    return {
      status: 404,
      body: { success: false, errorCode: 'invalid_request' },
    }
  }

  const validated = validateEditorialDemoRequest(payload)
  if (!validated.success) {
    return {
      status: 400,
      body: { success: false, errorCode: validated.errorCode },
    }
  }

  if (validated.isSpam) {
    return { status: 200, body: { success: true } }
  }

  if (!dependencies.takeRateLimitSlot(dependencies.clientKey)) {
    return {
      status: 429,
      body: { success: false, errorCode: 'rate_limited' },
    }
  }

  const data = validated.data
  const copy = emailCopy[data.locale]
  const internalEmail = await dependencies.sendEmail({
    to: dependencies.supportEmail,
    fromName: copy.brand,
    replyTo: data.email,
    subject: copy.internalSubject(data.organization),
    html: internalEmailHtml(data, copy),
    text: internalEmailText(data, copy),
  })

  if (!internalEmail.success) {
    return {
      status: 503,
      body: { success: false, errorCode: 'delivery_unavailable' },
    }
  }

  const confirmationEmail = await dependencies.sendEmail({
    to: data.email,
    fromName: copy.brand,
    replyTo: dependencies.supportEmail,
    subject: copy.confirmationSubject,
    html: confirmationEmailHtml(data, copy),
    text: confirmationEmailText(data, copy),
  })

  if (!confirmationEmail.success) {
    console.warn('[Editorial Demo Request] Applicant confirmation failed')
  }

  return { status: 200, body: { success: true } }
}
