import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-7 h-7 text-accent" />
              <span className="text-lg font-bold">Auditelle</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              La solution française de détection de texte généré par intelligence artificielle.
              Précision inégalée, respect de la vie privée, conformité RGPD.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Produit
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/#features" className="hover:text-white transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Tableau de bord
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Entreprise
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:contact@auditelle.eu" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Auditelle. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-600">
            Détection propulsée par{' '}
            <a
              href="https://pangramlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-400 transition-colors"
            >
              Pangram Labs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
