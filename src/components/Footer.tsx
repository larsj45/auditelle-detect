'use client';

import Link from 'next/link';
import { useConfig } from '@/components/ConfigProvider';

export default function Footer() {
  const config = useConfig();
  const s = config.strings;

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img src={config.logoWhite} alt={config.name} style={{ height: config.logoHeight || '2rem' }} />
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              {s.footer.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              {s.footer.productLabel}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/#features" className="hover:text-white transition-colors">
                  {s.nav.features}
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  {s.nav.pricing}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  {s.nav.dashboard}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              {s.footer.companyLabel}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {s.footer.contactLabel}
                </Link>
              </li>
              <li>
                <a href={`mailto:${config.supportEmail}`} className="text-gray-500 hover:text-white transition-colors text-xs">
                  {config.supportEmail}
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  {s.nav.login}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {config.name}. {s.footer.copyright}
          </p>
          <p className="text-xs text-gray-600">
            {s.footer.poweredBy}{' '}
            <a
              href="https://pangramlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-400 transition-colors"
            >
              {s.footer.poweredByName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
