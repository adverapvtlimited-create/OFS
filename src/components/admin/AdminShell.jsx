'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/cn';

export default function AdminShell({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'RFQs & Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Job Applications', href: '/admin/careers', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-ofs-gray-100 flex flex-col">
      <header className="bg-ofs-navy-950 text-white py-3.5 px-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
            <span className="bg-ofs-red-600 text-white py-0.5 px-2 rounded text-xs font-mono font-bold">
              CMS
            </span>
            OFS GROUP INDIA — ADMIN
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white/75 text-xs font-mono hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Live Website
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-60 bg-white border-r border-ofs-gray-200 p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-xs font-mono font-bold text-ofs-gray-500 uppercase px-3 pb-2">
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2.5 p-3 rounded text-[0.85rem] font-semibold transition-colors border-l-2',
                    isActive
                      ? 'bg-ofs-navy-50/70 text-ofs-navy-950 border-ofs-red-600'
                      : 'text-ofs-gray-700 hover:bg-ofs-gray-50 hover:text-ofs-navy-950 border-transparent'
                  )}
                >
                  <Icon size={18} className={isActive ? 'text-ofs-red-600' : 'text-ofs-gray-500'} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="p-3.5 bg-ofs-navy-50/70 rounded text-xs text-ofs-navy-900 border border-ofs-navy-100">
            <div className="font-bold mb-0.5">OFS Enterprise CMS</div>
            <div className="text-ofs-gray-600">v1.0.0 • Connected</div>
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
