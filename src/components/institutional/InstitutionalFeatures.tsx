import {
  Building2,
  FileDown,
  FileSearch,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import type { InstitutionalConfig } from '../../../config/types'

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  ShieldCheck,
  FileSearch,
  FileDown,
  Building2,
}

export function InstitutionalFeatures({
  institutional,
}: {
  institutional: InstitutionalConfig
}) {
  const { features } = institutional.landing

  return (
    <section className="bg-white px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[var(--navy)] sm:text-4xl">
            Operação institucional em um único portal
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Detecção de IA, similaridade, turmas, usuários e histórico auditável — pronto para rodar no ritmo do calendário acadêmico.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = (feature.icon && ICON_MAP[feature.icon]) || Sparkles
            return (
              <article
                key={feature.title}
                className="rounded-lg border border-gray-100 bg-[var(--bg-light)] p-6 transition hover:border-[var(--accent)] hover:bg-white hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-lg bg-white p-3 shadow-sm">
                  <Icon className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--navy)]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-600">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
