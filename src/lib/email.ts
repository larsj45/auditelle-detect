import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = 'Auditelle <noreply@auditelle.fr>'

export interface EmailParams {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailParams) {
  if (!resend) {
    console.warn('Resend not configured, skipping email:', subject)
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
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

// ============ EMAIL TEMPLATES ============

export function welcomeEmail(name: string) {
  const firstName = name.split(' ')[0] || 'there'
  
  return {
    subject: `Bienvenue sur Auditelle, ${firstName}! 🎉`,
    html: `
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
      <h1 style="color: white; margin: 0; font-size: 24px;">✦ AUDITELLE</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 32px;">
      <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 22px;">
        Bienvenue, ${firstName}! 👋
      </h2>
      
      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">
        Merci d'avoir créé votre compte Auditelle. Vous avez maintenant accès au détecteur IA le plus précis du marché, vérifié par l'Université du Maryland.
      </p>
      
      <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #92400e; margin: 0 0 12px 0; font-size: 16px;">🎁 Votre essai gratuit inclut :</h3>
        <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>50 analyses par mois</li>
          <li>Précision de 99,9%</li>
          <li>Identification du modèle IA</li>
          <li>Historique de 7 jours</li>
        </ul>
      </div>
      
      <a href="https://www.auditelle.fr/dashboard" style="display: inline-block; background: #e85d04; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin: 16px 0;">
        Commencer ma première analyse →
      </a>
      
      <p style="color: #9ca3af; font-size: 14px; margin: 32px 0 0 0;">
        Des questions ? Répondez directement à cet email.
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background: #f9fafb; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Auditelle SASU · SIREN 945117000 · Paris, France<br>
        <a href="https://www.auditelle.fr" style="color: #0d9488;">www.auditelle.fr</a>
      </p>
    </div>
  </div>
</body>
</html>
    `,
    text: `Bienvenue sur Auditelle, ${firstName}!

Merci d'avoir créé votre compte. Vous avez maintenant accès au détecteur IA le plus précis du marché.

Votre essai gratuit inclut :
- 50 analyses par mois
- Précision de 99,9%
- Identification du modèle IA
- Historique de 7 jours

Commencez ici : https://www.auditelle.fr/dashboard

Auditelle SASU - www.auditelle.fr`
  }
}

export function subscriptionConfirmedEmail(name: string, plan: string) {
  const firstName = name.split(' ')[0] || 'there'
  const planDetails: Record<string, { name: string; features: string[] }> = {
    pro: {
      name: 'Professionnel',
      features: ['1,000 analyses/mois', 'API access', 'Export PDF/CSV', 'Support email', 'Historique 30 jours']
    },
    university: {
      name: 'Université',
      features: ['10,000 analyses/mois', 'API illimitée', 'Intégration LMS', 'Dashboard admin', 'Support prioritaire']
    },
    enterprise: {
      name: 'Enterprise',
      features: ['Analyses illimitées', 'White-label API', 'Account manager', 'SLA 99.9%', 'Custom features']
    }
  }
  
  const details = planDetails[plan] || planDetails.pro
  
  return {
    subject: `Votre abonnement ${details.name} est actif! 🚀`,
    html: `
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
      <h1 style="color: white; margin: 0; font-size: 24px;">✦ AUDITELLE</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 32px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 48px;">🎉</span>
      </div>
      
      <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 22px; text-align: center;">
        Merci, ${firstName}!
      </h2>
      
      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
        Votre abonnement <strong>${details.name}</strong> est maintenant actif.
      </p>
      
      <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #065f46; margin: 0 0 12px 0; font-size: 16px;">✅ Votre plan inclut :</h3>
        <ul style="color: #047857; margin: 0; padding-left: 20px; line-height: 1.8;">
          ${details.features.map(f => `<li>${f}</li>`).join('\n          ')}
        </ul>
      </div>
      
      <a href="https://www.auditelle.fr/dashboard" style="display: block; text-align: center; background: #e85d04; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin: 24px 0;">
        Accéder à mon dashboard →
      </a>
      
      <p style="color: #9ca3af; font-size: 14px; margin: 32px 0 0 0; text-align: center;">
        Gérez votre abonnement dans les paramètres de votre compte.
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background: #f9fafb; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Auditelle SASU · SIREN 945117000 · Paris, France<br>
        <a href="https://www.auditelle.fr" style="color: #0d9488;">www.auditelle.fr</a>
      </p>
    </div>
  </div>
</body>
</html>
    `,
    text: `Merci ${firstName}!

Votre abonnement ${details.name} est maintenant actif.

Votre plan inclut :
${details.features.map(f => `- ${f}`).join('\n')}

Accédez à votre dashboard : https://www.auditelle.fr/dashboard

Auditelle SASU - www.auditelle.fr`
  }
}

export function upgradeReminderEmail(name: string, usagePercent: number) {
  const firstName = name.split(' ')[0] || 'there'
  
  return {
    subject: `${firstName}, vous avez utilisé ${usagePercent}% de vos analyses 📊`,
    html: `
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
      <h1 style="color: white; margin: 0; font-size: 24px;">✦ AUDITELLE</h1>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 32px;">
      <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 22px;">
        Vous utilisez bien Auditelle! 🎯
      </h2>
      
      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;">
        ${firstName}, vous avez déjà utilisé <strong>${usagePercent}%</strong> de vos analyses gratuites ce mois-ci.
      </p>
      
      <!-- Progress bar -->
      <div style="background: #e5e7eb; border-radius: 9999px; height: 12px; margin: 24px 0;">
        <div style="background: ${usagePercent >= 80 ? '#ef4444' : '#e85d04'}; width: ${usagePercent}%; height: 100%; border-radius: 9999px;"></div>
      </div>
      
      <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #92400e; margin: 0 0 12px 0; font-size: 16px;">🚀 Passez à Pro pour :</h3>
        <ul style="color: #78350f; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li><strong>1,000 analyses/mois</strong> (au lieu de 50)</li>
          <li>Accès API</li>
          <li>Export PDF/CSV</li>
          <li>Support prioritaire</li>
        </ul>
        <p style="color: #78350f; margin: 16px 0 0 0; font-weight: 600;">
          Seulement 25€/mois
        </p>
      </div>
      
      <a href="https://www.auditelle.fr/dashboard?upgrade=true" style="display: block; text-align: center; background: #e85d04; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin: 24px 0;">
        Passer à Pro →
      </a>
    </div>
    
    <!-- Footer -->
    <div style="background: #f9fafb; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Auditelle SASU · SIREN 945117000 · Paris, France<br>
        <a href="https://www.auditelle.fr" style="color: #0d9488;">www.auditelle.fr</a>
      </p>
    </div>
  </div>
</body>
</html>
    `,
    text: `${firstName}, vous avez utilisé ${usagePercent}% de vos analyses!

Passez à Pro pour 1,000 analyses/mois : https://www.auditelle.fr/dashboard?upgrade=true

Auditelle SASU - www.auditelle.fr`
  }
}
