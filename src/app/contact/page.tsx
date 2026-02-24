'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Mail, Building2, Send } from 'lucide-react'
import { useState } from 'react'
import { useConfig } from '@/components/ConfigProvider'

export default function ContactPage() {
  const config = useConfig()
  const s = config.strings.contact
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

    const subject = encodeURIComponent(formData.subject || `Contact via ${config.domain}`)
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nOrganisation: ${formData.organization}\nEmail: ${formData.email}\n\n${formData.message}`
    )
    window.location.href = `mailto:${config.supportEmail}?subject=${subject}&body=${body}`

    setSending(false)
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <section className="gradient-hero pt-32 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {s.title}
          </h1>
          <p className="text-gray-300 text-lg">
            {s.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">{s.emailLabel}</h3>
              </div>
              <a
                href={`mailto:${config.supportEmail}`}
                className="text-blue-600 hover:underline"
              >
                {config.supportEmail}
              </a>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">{s.companyName}</h3>
              </div>
              <p className="text-gray-600 text-sm">
                {config.registrationLabel} {config.registrationNumber}<br />
                {config.country}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{s.institutionCta}</h3>
              <p className="text-gray-600 text-sm">
                {s.institutionDescription}
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                <div className="text-green-500 text-5xl mb-4">&#x2713;</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {s.formSuccess}
                </h3>
                <p className="text-gray-600">
                  {s.formSuccessDetail}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-gray-200 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {s.formFullName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={s.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {s.formEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={s.emailPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {s.formOrganization}
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={s.orgPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {s.formSubject}
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{s.selectSubject}</option>
                    {s.subjectOptions.map((opt) => (
                      <option key={opt.value} value={opt.label}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {s.formMessage}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder={s.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {sending ? s.formSending : s.formSubmit}
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
