/**
 * One-time script: send welcome email to all users who never received it.
 *
 * Usage: npx tsx scripts/backfill-welcome-emails.ts [--dry-run]
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY
 */

import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { createClient } from '@supabase/supabase-js'
import { getResellerConfig } from '../config'
import { sendEmail, welcomeEmail } from '../src/lib/email'

const DRY_RUN = process.argv.includes('--dry-run')
const BATCH_DELAY_MS = 200 // 200ms between emails to respect Resend rate limits

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const config = await getResellerConfig()

  // Fetch all users who haven't received welcome email
  const { data: users, error } = await supabase
    .from('profiles')
    .select('id, email, full_name')
    .eq('welcome_email_sent', false)
    .not('email', 'is', null)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Failed to fetch users:', error)
    process.exit(1)
  }

  console.log(`Found ${users.length} users without welcome email`)
  if (DRY_RUN) console.log('DRY RUN — no emails will be sent\n')

  let sent = 0
  let failed = 0

  for (const user of users) {
    if (!user.email) continue

    const rawName = user.email.split('@')[0].split('+')[0]
    const name = user.full_name?.trim().split(' ')[0] || rawName.charAt(0).toUpperCase() + rawName.slice(1)
    const content = welcomeEmail(config, name)

    if (DRY_RUN) {
      console.log(`[DRY] Would send to: ${user.email} (${name})`)
      sent++
      continue
    }

    const result = await sendEmail({
      to: user.email,
      subject: content.subject,
      html: content.html,
      text: content.text,
    })

    if (result.success) {
      await supabase
        .from('profiles')
        .update({ welcome_email_sent: true })
        .eq('id', user.id)
      sent++
      console.log(`✓ ${sent}/${users.length} ${user.email}`)
    } else {
      failed++
      console.error(`✗ ${user.email}: ${result.error}`)
    }

    // Rate limit
    await new Promise(r => setTimeout(r, BATCH_DELAY_MS))
  }

  console.log(`\nDone. Sent: ${sent}, Failed: ${failed}`)
}

main().catch(console.error)
