import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { getResellerConfig } from '@/lib/config'
import { Users, Share2, BadgeEuro, ShieldCheck, Globe, Headphones, GraduationCap, ArrowRight, Mail } from 'lucide-react'

export const metadata = {
  title: 'Devenez partenaire — Auditelle',
  description:
    'Rejoignez le programme partenaire Auditelle. Gagnez 20 % de commission récurrente en recommandant la détection IA à vos membres.',
}

export default async function PartenairesPage() {
  const config = await getResellerConfig()

  return (
    <>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="gradient-hero pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent)] text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Users className="w-4 h-4" />
            Programme partenaire
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--navy)] leading-tight">
            Devenez partenaire{' '}
            <span className="text-[var(--accent)]">{config.name}</span>
          </h1>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            Recommandez la solution de d&eacute;tection IA la plus fiable du march&eacute; &agrave; vos
            membres et gagnez une commission r&eacute;currente sur chaque abonnement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href={`/contact?subject=${encodeURIComponent('Programme partenaire — demande d\'information')}`}
              className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg shadow-orange-500/20 inline-flex items-center gap-2"
            >
              Devenir partenaire
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`mailto:${config.supportEmail}?subject=${encodeURIComponent('Programme partenaire Auditelle')}`}
              className="btn-secondary text-lg px-8 py-4 rounded-xl inline-flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              {config.supportEmail}
            </a>
          </div>
        </div>
      </section>

      {/* ── Comment ca marche ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Comment &ccedil;a marche
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              Trois &eacute;tapes simples pour commencer &agrave; g&eacute;n&eacute;rer des revenus r&eacute;currents.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard
              number="1"
              icon={<Users className="w-6 h-6" />}
              title="Inscrivez-vous"
              description="Remplissez le formulaire partenaire. Nous validons votre candidature sous 48 h et vous recevez votre lien de suivi personnalis&eacute;."
            />
            <StepCard
              number="2"
              icon={<Share2 className="w-6 h-6" />}
              title="Recommandez"
              description={`Partagez ${config.name} aupr\u00e8s de vos membres \u2014 enseignants, directeurs d\u2019\u00e9tablissement, responsables p\u00e9dagogiques.`}
            />
            <StepCard
              number="3"
              icon={<BadgeEuro className="w-6 h-6" />}
              title="Gagnez"
              description="Recevez 20 % de commission r&eacute;currente sur chaque abonnement pendant 12 mois. Paiement mensuel par virement."
            />
          </div>
        </div>
      </section>

      {/* ── Commission details ────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Un mod&egrave;le de r&eacute;mun&eacute;ration attractif
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              Commission transparente, sans plafond, vers&eacute;e chaque mois.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Key figures */}
            <div className="card p-8">
              <h3 className="text-lg font-bold text-[var(--navy)] mb-6">Conditions cl&eacute;s</h3>
              <ul className="space-y-4">
                <CommissionItem label="Taux de commission" value="20 % r&eacute;current" />
                <CommissionItem label="Dur&eacute;e" value="12 mois par client" />
                <CommissionItem label="Fr&eacute;quence de paiement" value="Mensuelle" />
                <CommissionItem label="D&eacute;lai de validation" value="Apr&egrave;s la p&eacute;riode d'essai du client" />
                <CommissionItem label="Plafond" value="Aucun" />
              </ul>
            </div>

            {/* Example calculation */}
            <div className="card p-8 border-2 border-[var(--accent)] relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Exemple
              </div>
              <h3 className="text-lg font-bold text-[var(--navy)] mb-6">Simulation de revenus</h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  Vous recommandez {config.name} &agrave; <strong className="text-[var(--navy)]">10 universit&eacute;s</strong> qui
                  souscrivent au plan <strong className="text-[var(--navy)]">Universit&eacute;</strong> (149 {config.currencySymbol}/mois).
                </p>
                <div className="bg-[var(--bg-light)] rounded-xl p-6 mt-4">
                  <div className="text-sm text-gray-500">Votre commission mensuelle</div>
                  <div className="text-4xl font-bold text-[var(--accent)] mt-1">
                    298 {config.currencySymbol}<span className="text-lg font-normal text-gray-400">/mois</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    10 clients &times; 149 {config.currencySymbol} &times; 20 % = 298 {config.currencySymbol}/mois pendant 12 mois
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Soit <strong className="text-[var(--navy)]">3 576 {config.currencySymbol}</strong> sur la premi&egrave;re ann&eacute;e, pour 10 clients seulement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Auditelle ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[var(--bg-light)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--navy)]">
              Pourquoi recommander {config.name}
            </h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
              Une solution que vos membres adopteront avec confiance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="99,9 % de pr&eacute;cision"
              description="Technologie de pointe avec un taux de faux positifs quasi nul. Vos membres peuvent se fier aux r&eacute;sultats."
            />
            <BenefitCard
              icon={<Globe className="w-8 h-8" />}
              title="Conforme RGPD"
              description="Donn&eacute;es h&eacute;berg&eacute;es en Europe. Aucune conservation des documents analys&eacute;s. Conformit&eacute; totale."
            />
            <BenefitCard
              icon={<Headphones className="w-8 h-8" />}
              title="Support en fran&ccedil;ais"
              description="&Eacute;quipe bas&eacute;e en France. Assistance par email et visio pour chaque &eacute;tablissement."
            />
            <BenefitCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Adopt&eacute; par les universit&eacute;s"
              description="D&eacute;j&agrave; utilis&eacute; par des universit&eacute;s et grandes &eacute;coles fran&ccedil;aises pour prot&eacute;ger l'int&eacute;grit&eacute; acad&eacute;mique."
            />
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="gradient-hero py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Pr&ecirc;t &agrave; rejoindre le programme ?
          </h2>
          <p className="text-gray-300 mt-4 text-lg">
            Contactez-nous pour recevoir votre convention partenaire et votre lien de suivi personnalis&eacute;.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href={`/contact?subject=${encodeURIComponent('Programme partenaire — inscription')}`}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              Nous contacter
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`mailto:${config.supportEmail}?subject=${encodeURIComponent('Programme partenaire Auditelle')}`}
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Mail className="w-5 h-5" />
              {config.supportEmail}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

/* ── Local components ──────────────────────────────────────────────────── */

function StepCard({
  number,
  icon,
  title,
  description,
}: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-full bg-[var(--accent)] text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-bold text-[var(--navy)] mb-2">{title}</h3>
      <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}

function CommissionItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between border-b border-gray-100 pb-3">
      <span className="text-gray-500 text-sm">{label}</span>
      <span
        className="font-semibold text-[var(--navy)] text-sm"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </li>
  )
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="card group">
      <div className="w-14 h-14 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center mb-4 group-hover:bg-[var(--accent)] group-hover:text-white transition">
        {icon}
      </div>
      <h3
        className="text-lg font-bold text-[var(--navy)] mb-2"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p
        className="text-gray-500 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  )
}
