'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, BarChart2, Zap } from 'lucide-react';

const navItems = [
  { href: '/chat', icon: MessageSquare, label: 'Chat' },
  { href: '/report', icon: BarChart2, label: 'Insights' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-16 min-h-screen bg-gray-950 border-r border-gray-800 items-center py-4 gap-6 fixed left-0 top-0 z-10">
      {/* Logo */}
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500 text-white mb-2">
        <Zap size={20} strokeWidth={2.5} />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={`flex flex-col items-center justify-center w-10 h-10 rounded-xl text-xs gap-0.5 transition-colors ${
                active
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
