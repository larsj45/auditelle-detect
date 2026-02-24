'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, History, User, LogOut, Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { signOut } from '@/lib/auth';
import { useConfig } from '@/components/ConfigProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = useConfig();
  const s = config.strings.dashboard;
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const navItems = [
    { href: '/dashboard', label: s.detection, icon: Search },
    { href: '/dashboard/history', label: s.history, icon: History },
    { href: '/dashboard/account', label: s.account, icon: User },
  ];

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.push('/login');
      } else {
        setUserEmail(data.session.user.email ?? '');

        try {
          await fetch('/api/email/welcome', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${data.session.access_token}`,
            },
          });
        } catch (e) {
          console.log('Welcome email trigger:', e);
        }
      }
    });
  }, [router]);

  async function handleSignOut() {
    await signOut();
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-light flex">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed inset-y-0">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <img src={config.logoColor} alt={config.name} className="h-8" />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-light text-accent'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 truncate mb-2 px-4">{userEmail}</p>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-navy w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {s.signOut}
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src={config.logoColor} alt={config.name} className="h-7" />
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Menu">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-30">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-white h-full pt-20 px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent-light text-accent'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 w-full mt-4"
            >
              <LogOut className="w-5 h-5" />
              {s.signOut}
            </button>
          </aside>
        </div>
      )}

      <main className="flex-1 lg:ml-64 pt-20 lg:pt-8 p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}
