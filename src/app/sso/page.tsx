import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

interface SSOPayload {
  email: string
  sub: string
  tier: string
  quota: number
  iat: number
  exp: number
}

function SSOError({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="text-center space-y-4 p-8 max-w-sm">
        <div className="text-5xl">⚠️</div>
        <h1 className="text-xl font-bold text-navy">Acesso não autorizado</h1>
        <p className="text-gray-600 text-sm">{message}</p>
        <a
          href="/login"
          className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:opacity-90 transition"
        >
          Fazer login normalmente
        </a>
      </div>
    </div>
  )
}

export default async function SSOPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  const token = params.token

  if (!token) {
    return <SSOError message="Token SSO não fornecido. Acesse pelo portal Limiar." />
  }

  const secret = process.env.SSO_SECRET
  if (!secret) {
    console.error('[SSO] SSO_SECRET não configurado no ambiente')
    return <SSOError message="Configuração interna inválida. Contate o suporte." />
  }

  // Validar JWT
  let payload: SSOPayload
  try {
    payload = jwt.verify(token, secret) as SSOPayload
  } catch (err) {
    const expired = err instanceof Error && err.name === 'TokenExpiredError'
    return (
      <SSOError
        message={
          expired
            ? 'Link expirado. Volte ao Limiar e clique em "Acessar VeriTexto" novamente.'
            : 'Token inválido. Acesse pelo portal Limiar.'
        }
      />
    )
  }

  // Criar cliente Supabase admin (service role)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // generateLink cria o usuário se não existir e devolve action_link para login
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: payload.email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://veritexto.com.br'}/dashboard`,
    },
  })

  if (error || !data?.properties?.action_link) {
    console.error('[SSO] generateLink error:', error)
    return <SSOError message="Erro ao processar login SSO. Tente novamente." />
  }

  const userId = data.user.id
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  // Buscar perfil existente
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('plan, scans_today, scans_reset_at')
    .eq('id', userId)
    .single()

  if (!existingProfile) {
    // Novo usuário SSO — criar perfil com limiar-vip
    await supabase.from('profiles').insert({
      id: userId,
      plan: 'limiar-vip',
      scans_today: 0,
      scans_reset_at: monthStart,
      full_name: payload.email.split('@')[0],
    })
  } else {
    const paidPlans = new Set(['starter', 'pro', 'student', 'university', 'enterprise'])
    const hasPaidPlan = paidPlans.has(existingProfile.plan)

    if (!hasPaidPlan) {
      // Garantir plano limiar-vip com reset mensal
      const resetAt = existingProfile.scans_reset_at
        ? new Date(existingProfile.scans_reset_at)
        : null
      const isNewMonth =
        !resetAt ||
        resetAt.getFullYear() !== now.getFullYear() ||
        resetAt.getMonth() !== now.getMonth()

      await supabase
        .from('profiles')
        .update({
          plan: 'limiar-vip',
          ...(isNewMonth ? { scans_today: 0, scans_reset_at: monthStart } : {}),
        })
        .eq('id', userId)
    }
    // Se tem plano pago: não tocar no plano, apenas fazer login
  }

  // Redirecionar para o magic link do Supabase (faz login e vai ao /dashboard)
  redirect(data.properties.action_link)
}
