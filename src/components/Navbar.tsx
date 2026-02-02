'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Shield } from 'lucide-react';

export default function Navbar({ isAuth = false }: { isAuth?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold text-navy">Auditelle</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm text-gray-600 hover:text-navy transition-colors">
              Fonctionnalités
            </Link>
            <Link href="/#pricing" className="text-sm text-gray-600 hover:text-navy transition-colors">
              Tarifs
            </Link>
            {isAuth ? (
              <Link
                href="/dashboard"
                className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
              >
                Tableau de bord
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm text-gray-600 hover:text-navy transition-colors">
                  Connexion
                </Link>
                <Link
                  href="/signup"
                  className="bg-accent text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
                >
                  Essai gratuit
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link href="/#features" className="block text-gray-600 hover:text-navy" onClick={() => setMenuOpen(false)}>
            Fonctionnalités
          </Link>
          <Link href="/#pricing" className="block text-gray-600 hover:text-navy" onClick={() => setMenuOpen(false)}>
            Tarifs
          </Link>
          {isAuth ? (
            <Link href="/dashboard" className="block text-accent font-medium" onClick={() => setMenuOpen(false)}>
              Tableau de bord
            </Link>
          ) : (
            <>
              <Link href="/login" className="block text-gray-600 hover:text-navy" onClick={() => setMenuOpen(false)}>
                Connexion
              </Link>
              <Link
                href="/signup"
                className="block bg-accent text-white text-center px-5 py-2 rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Essai gratuit
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
