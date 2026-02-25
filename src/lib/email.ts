import { Resend } from 'resend'
import { getResellerConfig } from '@/lib/config'
import type { ResellerConfig } from '@/lib/config'
import { escapeHtml } from '@/lib/sanitize'

// Lazy init — avoids module-level evaluation during build
function getResend() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

export interface EmailParams {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailParams) {
  const config = await getResellerConfig()
  const fromEmail = `${config.name} <${config.noReplyEmail}>`

  const resend = getResend()
  if (!resend) {
    console.warn('Resend not configured, skipping email:', subject)
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      text,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error: error.message }
    }

    return { success: true, id: data?.id }
  } catch (err) {
    console.error('Email send exception:', err)
    return { success: false, error: 'Failed to send email' }
  }
}

// ============ HELPERS ============

/** Replace {key} placeholders in a template string */
function t(template: string, vars: Record<string, string>): string {
  let result = template
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
  }
  return result
}

/** Build the legal footer line from config fields */
function legalLine(config: ResellerConfig): string {
  return `${config.legalEntity} \u00b7 ${config.registrationLabel} ${config.registrationNumber} \u00b7 ${config.city}, ${config.country}`
}

/** Shared HTML email wrapper: header + content + footer */
function emailWrapper(config: ResellerConfig, content: string): string {
  const s = config.strings.emails
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fef9ef; margin: 0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0d9488 0%, #115e59 100%); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">\u2726 ${escapeHtml(s.headerName)}</h1>
    </div>

    <!-- Content -->
    <div style="padding: 40px 32px;">
      ${content}
    </div>

    <!-- Footer -->
    <div style="background: #f9fafb; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        ${escapeHtml(legalLine(config))}<br>
        <a href="https://www.${config.domain}" style="color: #0d9488;">www.${config.domain}</a>
      </p>
    </div>
  </div>
</body>
</html>
    `
}

/** Shared plaintext footer */
function textFooter(config: ResellerConfig): string {
  return `${config.legalEntity} - www.${config.domain}`
}

/** Full CTA URL from a relative path */
function ctaUrl(config: ResellerConfig, path: string): string {
  return `https://www.${config.domain}${path}`
}

// ============ EMAIL TEMPLATES ============

export function welcomeEmail(config: ResellerConfig, name: string) {
  const safeName = escapeHtml(name.split(' ')[0] || 'there')
  const s = config.strings.emails.welcome

  const subject = t(s.subject, { name: safeName })

  const content = `
      <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 22px;">
        ${t(s.greeting, { name: safeName })}
      </h2>

      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">
        ${s.intro}
      </p>

      <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #92400e; margin: 0 0 12px 0; font-size: 16px;">${s.trialTitle}</h3>
        <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.8;">
          ${s.trialFeatures.map(f => `<li>${f}</li>`).join('\n          ')}
        </ul>
      </div>

      <a href="${ctaUrl(config, s.ctaUrl)}" style="display: inline-block; background: #e85d04; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin: 16px 0;">
        ${s.ctaButton}
      </a>

      <p style="color: #9ca3af; font-size: 14px; margin: 32px 0 0 0;">
        ${s.question}
      </p>`

  const text = `${t(s.subject, { name: safeName })}

${s.intro}

${s.trialTitle}
${s.trialFeatures.map(f => `- ${f}`).join('\n')}

${s.ctaButton}: ${ctaUrl(config, s.ctaUrl)}

${textFooter(config)}`

  return { subject, html: emailWrapper(config, content), text }
}

export function subscriptionConfirmedEmail(config: ResellerConfig, name: string, plan: string) {
  const safeName = escapeHtml(name.split(' ')[0] || 'there')
  const s = config.strings.emails.subscriptionConfirmed
  const details = config.strings.planDetails[plan] || config.strings.planDetails.pro || { name: plan, features: [] }
  const safePlan = escapeHtml(details.name)

  const subject = t(s.subject, { plan: details.name })

  const content = `
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 48px;">\ud83c\udf89</span>
      </div>

      <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 22px; text-align: center;">
        ${t(s.greeting, { name: safeName })}
      </h2>

      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
        ${t(s.active, { plan: `<strong>${safePlan}</strong>` })}
      </p>

      <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #065f46; margin: 0 0 12px 0; font-size: 16px;">${s.planTitle}</h3>
        <ul style="color: #047857; margin: 0; padding-left: 20px; line-height: 1.8;">
          ${details.features.map(f => `<li>${f}</li>`).join('\n          ')}
        </ul>
      </div>

      <a href="${ctaUrl(config, '/dashboard')}" style="display: block; text-align: center; background: #e85d04; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin: 24px 0;">
        ${s.ctaButton}
      </a>

      <p style="color: #9ca3af; font-size: 14px; margin: 32px 0 0 0; text-align: center;">
        ${s.manageHint}
      </p>`

  const text = `${t(s.greeting, { name: safeName })}

${t(s.active, { plan: details.name })}

${s.planTitle}
${details.features.map(f => `- ${f}`).join('\n')}

${s.ctaButton}: ${ctaUrl(config, '/dashboard')}

${textFooter(config)}`

  return { subject, html: emailWrapper(config, content), text }
}

export function upgradeReminderEmail(config: ResellerConfig, name: string, usagePercent: number) {
  const safeName = escapeHtml(name.split(' ')[0] || 'there')
  const s = config.strings.emails.upgradeReminder
  const pct = String(usagePercent)

  const subject = t(s.subject, { name: safeName, percent: pct })

  const content = `
      <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 22px;">
        ${s.title}
      </h2>

      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">
        ${t(s.body, { name: safeName, percent: `<strong>${pct}%</strong>` })}
      </p>

      <!-- Progress bar -->
      <div style="background: #e5e7eb; border-radius: 9999px; height: 12px; margin: 24px 0;">
        <div style="background: ${usagePercent >= 80 ? '#ef4444' : '#e85d04'}; width: ${usagePercent}%; height: 100%; border-radius: 9999px;"></div>
      </div>

      <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #92400e; margin: 0 0 12px 0; font-size: 16px;">${s.upgradeTitle}</h3>
        <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.8;">
          ${s.upgradeFeatures.map(f => `<li><strong>${f}</strong></li>`).join('\n          ')}
        </ul>
        <p style="color: #78350f; margin: 16px 0 0 0; font-weight: 600;">
          ${s.upgradePrice}
        </p>
      </div>

      <a href="${ctaUrl(config, '/dashboard?upgrade=true')}" style="display: block; text-align: center; background: #e85d04; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin: 24px 0;">
        ${s.ctaButton}
      </a>`

  const text = `${t(s.subject, { name: safeName, percent: pct })}

${t(s.body, { name: safeName, percent: pct + '%' })}

${s.upgradeTitle}
${s.upgradeFeatures.map(f => `- ${f}`).join('\n')}

${s.upgradePrice}

${s.ctaButton}: ${ctaUrl(config, '/dashboard?upgrade=true')}

${textFooter(config)}`

  return { subject, html: emailWrapper(config, content), text }
}

export function limitReachedEmail(config: ResellerConfig, name: string) {
  const safeName = escapeHtml(name.split(' ')[0] || 'there')
  const upgradeUrl = `${ctaUrl(config, '/dashboard/upgrade')}?coupon=LIMITE30`

  const subject = `${safeName}, vous avez atteint votre limite quotidienne 🔒`

  const content = `
      <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 22px;">
        Vous avez utilisé toutes vos analyses du jour
      </h2>

      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 16px 0;">
        Bonjour ${safeName},
      </p>

      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">
        Vous avez atteint votre limite quotidienne d'analyses gratuites sur ${config.name}. Votre compteur se remet à zéro demain — mais si vous avez besoin d'analyser plus de textes maintenant, nous avons quelque chose pour vous.
      </p>

      <!-- Offer box -->
      <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 12px; padding: 24px; margin: 24px 0; border: 2px solid #f59e0b;">
        <div style="font-size: 32px; margin-bottom: 8px;">🎁</div>
        <h3 style="color: #92400e; margin: 0 0 8px 0; font-size: 18px;">Offre exclusive — 30% de réduction</h3>
        <p style="color: #78350f; margin: 0 0 16px 0; line-height: 1.5;">
          Passez au plan <strong>Starter (1 000 analyses/mois)</strong> ou <strong>Student (100 analyses/mois)</strong> avec <strong>30% de réduction sur votre premier mois</strong>. Utilisez le code <strong style="font-size: 18px; color: #92400e;">LIMITE30</strong> au moment du paiement.
        </p>
        <ul style="color: #78350f; margin: 0 0 16px 0; padding-left: 20px; line-height: 1.8;">
          <li><strong>1 000 analyses/mois</strong> — pour enseignants et consultants</li>
          <li>Export PDF/CSV inclus</li>
          <li>Historique complet 30 jours</li>
          <li>Support par email</li>
        </ul>
        <div style="background: white; border-radius: 8px; padding: 8px 16px; display: inline-block; font-size: 20px; font-weight: 700; color: #92400e; letter-spacing: 2px;">
          LIMITE30
        </div>
      </div>

      <a href="${upgradeUrl}" style="display: block; text-align: center; background: #e85d04; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin: 24px 0; font-size: 16px;">
        Profiter de -30% maintenant →
      </a>

      <p style="color: #9ca3af; font-size: 13px; text-align: center; margin: 0;">
        Offre valable uniquement pour le premier mois. Annulation à tout moment.
      </p>`

  const text = `Bonjour ${safeName},

Vous avez atteint votre limite quotidienne d'analyses gratuites sur ${config.name}.

OFFRE EXCLUSIVE — 30% de réduction sur votre premier mois !
Utilisez le code LIMITE30 lors du paiement.

Passer au plan Starter: ${upgradeUrl}

${textFooter(config)}`

  return { subject, html: emailWrapper(config, content), text }
}

export function trialExpiringEmail(config: ResellerConfig, name: string, daysLeft: number) {
  const safeName = escapeHtml(name.split(' ')[0] || 'there')
  const s = config.strings.emails.trialExpiring
  const days = String(daysLeft)

  const urgency = daysLeft <= 1 ? 'lastDay' : daysLeft <= 3 ? 'urgent' : 'reminder'
  const emoji = daysLeft <= 1 ? '\u23f0' : daysLeft <= 3 ? '\u26a0\ufe0f' : '\ud83d\udcc5'
  const color = daysLeft <= 1 ? '#ef4444' : daysLeft <= 3 ? '#f59e0b' : '#0d9488'

  const subject = urgency === 'lastDay'
    ? t(s.subjects.lastDay, { name: safeName })
    : urgency === 'urgent'
    ? t(s.subjects.urgent, { name: safeName, days })
    : t(s.subjects.reminder, { name: safeName, days })

  const title = daysLeft <= 1 ? s.titles.lastDay : t(s.titles.remaining, { days })
  const bodyText = daysLeft <= 1
    ? t(s.bodyLastDay, { name: safeName })
    : t(s.body, { name: safeName, days })
  const dayText = daysLeft <= 1 ? s.countdown.today : t(s.countdown.days, { days })

  const content = `
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 48px;">${emoji}</span>
      </div>

      <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 22px; text-align: center;">
        ${title}
      </h2>

      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
        ${bodyText}
      </p>

      <!-- Countdown box -->
      <div style="background: ${daysLeft <= 1 ? '#fef2f2' : daysLeft <= 3 ? '#fffbeb' : '#ecfdf5'}; border: 2px solid ${color}; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
        <p style="color: ${color}; margin: 0; font-size: 32px; font-weight: bold;">
          ${dayText}
        </p>
        <p style="color: #6b7280; margin: 8px 0 0 0; font-size: 14px;">
          ${s.beforeEnd}
        </p>
      </div>

      <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #1a1a2e; margin: 0 0 12px 0; font-size: 16px;">${s.keepTitle}</h3>
        <ul style="color: #4b5563; margin: 0; padding-left: 20px; line-height: 1.8;">
          ${s.keepFeatures.map(f => `<li><strong>${f}</strong></li>`).join('\n          ')}
        </ul>
      </div>

      <a href="${ctaUrl(config, '/dashboard?upgrade=true')}" style="display: block; text-align: center; background: #e85d04; color: white; text-decoration: none; padding: 16px 28px; border-radius: 8px; font-weight: 600; margin: 24px 0; font-size: 16px;">
        ${s.ctaButton}
      </a>

      <p style="color: #9ca3af; font-size: 13px; margin: 24px 0 0 0; text-align: center;">
        ${s.question}
      </p>`

  const text = `${subject}

${bodyText}

${s.keepTitle}
${s.keepFeatures.map(f => `- ${f}`).join('\n')}

${s.ctaButton}: ${ctaUrl(config, '/dashboard?upgrade=true')}

${textFooter(config)}`

  return { subject, html: emailWrapper(config, content), text }
}

export function trialEndedEmail(config: ResellerConfig, name: string) {
  const safeName = escapeHtml(name.split(' ')[0] || 'there')
  const s = config.strings.emails.trialEnded

  const subject = t(s.subject, { name: safeName })

  const content = `
      <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 22px;">
        ${t(s.title, { name: safeName })}
      </h2>

      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">
        ${s.body}
      </p>

      <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #92400e; margin: 0 0 12px 0; font-size: 16px;">${s.offerTitle}</h3>
        <p style="color: #78350f; margin: 0; line-height: 1.6;">
          ${s.offerBody}
        </p>
      </div>

      <a href="${ctaUrl(config, '/dashboard?upgrade=true&promo=COMEBACK50')}" style="display: block; text-align: center; background: #e85d04; color: white; text-decoration: none; padding: 16px 28px; border-radius: 8px; font-weight: 600; margin: 24px 0; font-size: 16px;">
        ${s.ctaButton}
      </a>

      <p style="color: #9ca3af; font-size: 14px; margin: 32px 0 0 0; text-align: center;">
        ${s.question}
      </p>`

  const text = `${t(s.title, { name: safeName })}

${s.body}

${s.offerTitle}
${s.offerBody}

${s.ctaButton}: ${ctaUrl(config, '/dashboard?upgrade=true&promo=COMEBACK50')}

${textFooter(config)}`

  return { subject, html: emailWrapper(config, content), text }
}
