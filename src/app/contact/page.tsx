'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Mail, Building2, Send } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    // Send via mailto fallback for now (no backend yet)
    const subject = encodeURIComponent(formData.subject || 'Contact via auditelle.fr')
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nOrganisation: ${formData.organization}\nEmail: ${formData.email}\n\n${formData.message}`
    )
    window.location.href = `mailto:contact@auditelle.fr?subject=${subject}&body=${body}`

    setSending(false)
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <section className="gradient-hero pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-300 text-lg">
            Une question ? Un projet d&apos;intégration ? Notre équipe vous répond sous 24h.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">Email</h3>
              </div>
              <a
                href="mailto:contact@auditelle.fr"
                className="text-blue-600 hover:underline"
              >
                contact@auditelle.fr
              </a>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">Auditelle SASU</h3>
              </div>
              <p className="text-gray-600 text-sm">
                SIREN 945117000<br />
                France
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Universités & Institutions</h3>
              <p className="text-gray-600 text-sm">
                Vous souhaitez intégrer Auditelle dans votre établissement ?
                Contactez-nous pour un devis personnalisé et une démonstration.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Merci pour votre message !
                </h3>
                <p className="text-gray-600">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-gray-200 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="jean.dupont@universite.fr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organisation
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Université de Paris"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="Demande de démonstration">Demande de démonstration</option>
                    <option value="Devis université/institution">Devis université / institution</option>
                    <option value="Intégration LMS">Intégration LMS</option>
                    <option value="Support technique">Support technique</option>
                    <option value="Partenariat">Partenariat</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Décrivez votre besoin..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {sending ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
