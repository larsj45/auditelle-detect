import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, BadgeCheck, BookOpen, Building2, Check, GraduationCap, ShieldCheck, Users, X } from 'lucide-react'
import { getResellerConfig } from '@/lib/config'

const professorImage =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
const campusImage =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getResellerConfig()

  if (!['veritexto-pt', 'veritexto-br'].includes(config.id)) {
    return {}
  }

  return {
    title: `Comparativo de detectores de IA e plágio | ${config.name}`,
    description:
      'Compare opções de detecção de IA e plágio, veja a tabela comparativa e escolha a oferta certa para professor, escola ou universidade.',
    alternates: {
      canonical: `https://${config.domain}/alternativa-turnitin`,
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `Comparativo de detectores de IA e plágio | ${config.name}`,
      description:
        'Página comparativa para campanhas pagas com foco em IA + plágio, checkout em reais e oferta segmentada para educação.',
      type: 'website',
      locale: config.locale,
      url: `https://${config.domain}/alternativa-turnitin`,
    },
  }
}

export default async function AlternativaTurnitinPage() {
  const config = await getResellerConfig()

  if (!['veritexto-pt', 'veritexto-br'].includes(config.id)) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${config.name} comparativo de detectores`,
    url: `https://${config.domain}/alternativa-turnitin`,
    description:
      'Página comparativa para professores, escolas e universidades que avaliam detectores de IA e plágio no Brasil.',
  }

  const comparison = config.strings.comparison

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <img src={config.logoColor} alt={config.name} style={{ height: config.logoHeight || '2rem' }} />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/contact?subject=Demo%20institucional" className="hidden text-sm font-medium text-gray-600 md:inline-flex">
              Agendar demo
            </Link>
            <Link href="/signup?plan=starter" className="btn-primary px-5 py-2 text-sm">
              Testar plano Professor
            </Link>
          </div>
        </div>
      </nav>

      <section className="gradient-hero px-4 pb-20 pt-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent-light)] px-4 py-2 text-sm font-semibold text-[var(--accent)]">
              <BadgeCheck className="h-4 w-4" />
              Página comparativa para campanhas pagas
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[var(--navy)] sm:text-5xl lg:text-6xl">
              Compare detectores de IA e plágio e escolha a oferta que fecha
              <span className="text-[var(--accent)]"> compra no Brasil</span>.
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-gray-600">
              O VeriTexto combina IA e plágio no mesmo relatório, vende em reais e separa a
              entrada por professor, escola e universidade. A comparação abaixo foi montada
              para tráfego de Google Ads, com foco em compra simples e operação local.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-600">
              {[
                'IA + plágio no mesmo relatório',
                'Checkout em BRL',
                'LGPD e suporte em português',
                'Planos por segmento',
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                  <Check className="h-4 w-4 text-emerald-500" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/signup?plan=starter" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg">
                Começar como professor
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/contact?subject=Demo%20institucional" className="btn-secondary inline-flex items-center justify-center px-8 py-4 text-lg">
                Solicitar proposta para instituição
              </Link>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Entrada rápida com créditos avulsos a partir de R$0,50 por análise e assinatura mensal para uso recorrente.
            </p>
          </div>

          <div className="grid gap-4">
            <img
              src={professorImage}
              alt="Professor analisando trabalhos com apoio digital"
              className="h-[360px] w-full rounded-2xl object-cover shadow-lg"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <MetricCard value="R$239/mês" label="Plano Professor" />
              <MetricCard value="R$1.799/mês" label="Plano Escola" />
              <MetricCard value="Sob consulta" label="Universidade" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--navy)] sm:text-4xl">
              O problema no Brasil não é só detectar IA.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
              Também é contratar rápido, pagar em moeda local e padronizar o processo entre professor,
              coordenação e universidade. Foi isso que guiou a nova oferta comercial do VeriTexto.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ComparisonCard
              title="Professor"
              body="Assinatura direta para quem corrige sozinho, com volume mensal, PDF exportável e histórico completo."
              icon={<GraduationCap className="h-6 w-6 text-[var(--accent)]" />}
            />
            <ComparisonCard
              title="Escola"
              body="Pacote para coordenação e múltiplos docentes, com painel administrativo, usuários múltiplos e melhor custo por análise."
              icon={<BookOpen className="h-6 w-6 text-[var(--accent)]" />}
            />
            <ComparisonCard
              title="Universidade"
              body="Proposta institucional com onboarding, integrações e volume customizado para centro universitário, faculdade ou rede."
              icon={<Building2 className="h-6 w-6 text-[var(--accent)]" />}
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-light)] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[var(--navy)] sm:text-4xl">
              Oferta de entrada reorganizada para vender melhor
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
              Em vez de uma grade genérica, a campanha agora aponta cada perfil para o plano que de fato fecha a compra.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <SegmentCard
              title="Professor"
              price="R$239/mês"
              description="Para professor, orientador, consultor ou coordenador que precisa corrigir com frequência."
              items={[
                '1.000 análises por mês',
                '1 usuário',
                'Moodle e LMS',
                'PDF e CSV exportáveis',
              ]}
              href="/signup?plan=starter"
              cta="Assinar plano Professor"
            />
            <SegmentCard
              title="Escola"
              price="R$1.799/mês"
              description="Para escolas, coordenações e grupos com múltiplos docentes e rotina mensal de conferência."
              items={[
                '10.000 análises por mês',
                'Múltiplos usuários',
                'Painel administrativo',
                'API ilimitada',
              ]}
              href="/signup?plan=university"
              cta="Assinar plano Escola"
            />
            <SegmentCard
              title="Universidade"
              price="Sob consulta"
              description="Para faculdades, centros universitários e redes que precisam de implantação institucional."
              items={[
                'Volume customizado',
                'SSO e integrações sob demanda',
                'Onboarding institucional',
                'Gerente de conta dedicado',
              ]}
              href="/contact?subject=Plano%20Universidade"
              cta="Solicitar proposta"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <img
            src={campusImage}
            alt="Equipe acadêmica reunida em ambiente universitário"
            className="h-[420px] w-full rounded-2xl object-cover shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-bold text-[var(--navy)] sm:text-4xl">
              Oferta mais clara para vender no Brasil
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              O enquadramento comercial deixa a escolha mais clara: contratação direta para professor,
              mensalidade transparente para escola e processo institucional para universidade, tudo com checkout
              em reais e comunicação local.
            </p>

            <div className="mt-8 grid gap-4">
              <BenefitRow title="Mais simples de comprar" body="Sem esconder a porta de entrada do professor brasileiro atrás de uma negociação institucional." />
              <BenefitRow title="Mais claro de explicar" body="A campanha já separa quem quer testar, quem quer implantar em escola e quem precisa de proposta universitária." />
              <BenefitRow title="Mais completo no relatório" body="IA, plágio, highlights e PDF exportável no mesmo fluxo de análise." />
              <BenefitRow title="Mais fácil de medir" body="O backend agora registra checkout_completed, credits_purchased e subscription_started no webhook da Stripe." />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[var(--navy)] sm:text-4xl">
              {comparison.title}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
              {comparison.subtitle}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-[var(--bg-light)]">
                  <th className="px-4 py-4 text-sm font-semibold text-gray-500"></th>
                  {comparison.competitors.map((name, index) => (
                    <th
                      key={name}
                      className={`px-4 py-4 text-center text-sm font-bold ${
                        index === 0 ? 'text-[var(--accent)]' : 'text-[var(--navy)]'
                      }`}
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, rowIndex) => (
                  <tr key={row.label} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[var(--bg-light)]/40'}>
                    <td className="px-4 py-4 text-sm font-medium text-[var(--navy)]">
                      {row.label}
                    </td>
                    {row.values.map((value, valueIndex) => (
                      <td
                        key={`${row.label}-${valueIndex}`}
                        className={`px-4 py-4 text-center text-sm ${
                          valueIndex === 0 ? 'font-semibold text-[var(--accent)]' : 'text-gray-600'
                        }`}
                      >
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="mx-auto h-5 w-5 text-emerald-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-gray-300" />
                          )
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="gradient-hero px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--accent)] shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Oferta organizada para conversão
          </div>
          <h2 className="text-3xl font-bold text-[var(--navy)] sm:text-4xl">
            Comece com o segmento certo e reduza atrito na venda.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Professor entra sozinho. Escola já vê custo mensal claro. Universidade cai em proposta institucional.
            O funil fica mais simples de comprar e mais simples de otimizar.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/signup?plan=starter" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg">
              Ativar plano Professor
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/contact?subject=Demo%20institucional" className="btn-secondary inline-flex items-center justify-center px-8 py-4 text-lg">
              Falar com vendas
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-2xl font-bold text-[var(--navy)]">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  )
}

function ComparisonCard({
  title,
  body,
  icon,
}: {
  title: string
  body: string
  icon: ReactNode
}) {
  return (
    <div className="rounded-2xl bg-[var(--bg-light)] p-6">
      <div className="mb-4 inline-flex rounded-xl bg-white p-3 shadow-sm">{icon}</div>
      <h3 className="text-xl font-semibold text-[var(--navy)]">{title}</h3>
      <p className="mt-3 text-gray-600">{body}</p>
    </div>
  )
}

function SegmentCard({
  title,
  price,
  description,
  items,
  href,
  cta,
}: {
  title: string
  price: string
  description: string
  items: string[]
  href: string
  cta: string
}) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[var(--navy)]">{title}</h3>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
        <Users className="h-5 w-5 text-[var(--accent)]" />
      </div>

      <p className="mt-6 text-4xl font-bold text-[var(--navy)]">{price}</p>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-gray-600">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <Link href={href} className="btn-primary mt-8 inline-flex w-full items-center justify-center gap-2 px-6 py-3">
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

function BenefitRow({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-100 p-5">
      <div className="mt-1">
        <Check className="h-5 w-5 text-emerald-500" />
      </div>
      <div>
        <h3 className="font-semibold text-[var(--navy)]">{title}</h3>
        <p className="mt-1 text-gray-600">{body}</p>
      </div>
    </div>
  )
}
