import Link from 'next/link'
import { ArrowRight, Building2, CalendarRange, FileText } from 'lucide-react'
import type { InstitutionalConfig } from '../../../config/types'

function getInstitutionalCtaHref(institutional: InstitutionalConfig) {
  return (
    institutional.commercial.demoCalendarUrl ||
    `/contact?subject=${encodeURIComponent('Demo institucional')}`
  )
}

export function InstitutionalProcurement({
  institutional,
}: {
  institutional: InstitutionalConfig
}) {
  const ctaHref = getInstitutionalCtaHref(institutional)

  return (
    <section className="bg-white px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-lg border border-gray-100 bg-[var(--bg-light)] p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
              Modelo comercial
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--navy)]">
              Piloto institucional pago, com implantação real
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              O piloto existe para validar operação, governança e adoção acadêmica. Não é
              trial aberto e não depende de liberar uso gratuito para qualificar procurement.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-lg bg-white p-4">
                <CalendarRange className="mt-0.5 h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="font-semibold text-[var(--navy)]">Janela semestral</p>
                  <p className="text-sm text-gray-600">
                    Modelo inicial desenhado para caber no calendário letivo e permitir rollout controlado.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white p-4">
                <Building2 className="mt-0.5 h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="font-semibold text-[var(--navy)]">Onboarding institucional</p>
                  <p className="text-sm text-gray-600">
                    Treinamento, configuração inicial e desenho de operação para coordenação e corpo docente.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white p-4">
                <FileText className="mt-0.5 h-5 w-5 text-[var(--accent)]" />
                <div>
                  <p className="font-semibold text-[var(--navy)]">Proposta em reais</p>
                  <p className="text-sm text-gray-600">
                    Estrutura comercial local, sem depender de compra internacional para começar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
              Procurement
            </p>
            <h3 className="mt-3 text-2xl font-bold text-[var(--navy)]">
              Estrutura inicial recomendada
            </h3>
            <p className="mt-4 text-gray-600">
              {institutional.commercial.procurementNotes ||
                'Piloto institucional com operação paga, onboarding e proposta comercial customizada para a sua instituição.'}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={ctaHref}
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-base"
              >
                Agendar conversa comercial
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${institutional.commercial.contactEmail}`}
                className="btn-secondary inline-flex items-center justify-center px-6 py-3 text-base"
              >
                Enviar e-mail institucional
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
