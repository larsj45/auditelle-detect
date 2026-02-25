'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useConfig } from '@/components/ConfigProvider';

export default function Navbar({ isAuth: isAuthProp }: { isAuth?: boolean }) {
  const config = useConfig();
  const s = config.strings.nav;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthProp ?? false);

  useEffect(() => {
    import('@/lib/supabase').then(({ supabase }) => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setIsAuth(!!session)
      })
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuth(!!session)
      })
      return () => subscription.unsubscribe()
    })
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <img src={config.logoColor} alt={config.name} style={{ height: config.logoHeight || '2rem' }} />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm text-gray-600 hover:text-navy transition-colors">
              {s.features}
            </Link>
            <Link href="/#pricing" className="text-sm text-gray-600 hover:text-navy transition-colors">
              {s.pricing}
            </Link>
            {isAuth ? (
              <Link
                href="/dashboard"
                className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
              >
                {s.dashboard}
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-navy transition-colors">
                  {s.login}
                </Link>
                <Link
                  href="/signup"
                  className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
                >
                  {s.freeTrial}
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link href="/#features" className="block text-gray-600 hover:text-navy" onClick={() => setMenuOpen(false)}>
            {s.features}
          </Link>
          <Link href="/#pricing" className="block text-gray-600 hover:text-navy" onClick={() => setMenuOpen(false)}>
            {s.pricing}
          </Link>
          {isAuth ? (
            <Link href="/dashboard" className="block text-accent font-medium" onClick={() => setMenuOpen(false)}>
              {s.dashboard}
            </Link>
          ) : (
            <>
              <Link href="/login" className="block text-gray-600 hover:text-navy" onClick={() => setMenuOpen(false)}>
                {s.login}
              </Link>
              <Link
                href="/signup"
                className="block bg-accent text-white text-center px-5 py-2 rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {s.freeTrial}
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
