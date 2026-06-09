import { Check, X } from 'lucide-react'
import type { ResellerConfig } from '@/lib/config'

const COMPARISON_ROWS = [
  { label: 'Contratação direta em reais', values: [true, false, false] },
  { label: 'Fluxo de IA + similaridade no mesmo workspace', values: [true, true, false] },
  { label: 'Turmas, usuários e histórico institucional', values: [true, false, true] },
  { label: 'Piloto institucional pago com onboarding', values: [true, false, false] },
  { label: 'Suporte operacional em português', values: [true, false, false] },
]

export function InstitutionalComparison({ config }: { config: ResellerConfig }) {
  return (
    <section className="bg-[var(--bg-light)] px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[var(--navy)] sm:text-4xl">
            Alternativa institucional ao Turnitin, sem fricção comercial desnecessária
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            O foco aqui não é repetir nome de concorrente. É mostrar por que o {config.name}{' '}
            fecha melhor em procurement, implantação e operação acadêmica no Brasil.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-lg border border-gray-100 bg-white shadow-sm">
          <table className="w-full min-w-[560px] table-fixed text-left sm:min-w-[760px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="w-[46%] px-4 py-4 text-sm font-semibold text-gray-500 sm:px-5">
                  Critério
                </th>
                {['VeriTexto', 'Turnitin', 'Ferramentas avulsas'].map((label, index) => (
                  <th
                    key={label}
                    className={`w-[18%] px-3 py-4 text-center text-xs font-bold sm:px-5 sm:text-sm ${
                      index === 0 ? 'bg-blue-50 text-[var(--accent)]' : 'text-[var(--navy)]'
                    }`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, rowIndex) => (
                <tr
                  key={row.label}
                  className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}
                >
                  <td className="px-4 py-4 text-sm font-medium text-[var(--navy)] sm:px-5">
                    {row.label}
                  </td>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.label}-${index}`}
                      className={`px-3 py-4 text-center sm:px-5 ${
                        index === 0 ? 'bg-blue-50' : ''
                      }`}
                    >
                      {value ? (
                        <Check className="mx-auto h-5 w-5 text-emerald-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-gray-300" />
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
  )
}
