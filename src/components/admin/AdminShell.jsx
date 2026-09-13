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
    { name: 'Client Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Job Applications', href: '/admin/careers', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-ofs-gray-100 flex flex-col">
      <header className="bg-ofs-navy-950 text-white py-3 px-4 sm:px-6 flex flex-wrap justify-between items-center gap-2.5 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="font-heading font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
            <span className="bg-ofs-red-600 text-white py-0.5 px-2 rounded text-[0.7rem] sm:text-xs font-mono font-bold">
              CMS
            </span>
            <span className="truncate">OFS GROUP INDIA — ADMIN</span>
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

      <div className="flex flex-col md:flex-row flex-1">
        <aside className="w-full md:w-60 bg-white border-b md:border-b-0 md:border-r border-ofs-gray-200 p-3 sm:p-4 md:p-6 flex flex-row md:flex-col justify-between items-center md:items-stretch overflow-x-auto gap-2">
          <div className="flex flex-row md:flex-col gap-1.5 md:gap-2 w-full">
            <div className="hidden md:block text-xs font-mono font-bold text-ofs-gray-500 uppercase px-3 pb-2">
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
                    'flex items-center gap-2 p-2 sm:p-2.5 md:p-3 rounded text-xs sm:text-[0.85rem] font-semibold transition-colors border-b-2 md:border-b-0 md:border-l-2 shrink-0',
                    isActive
                      ? 'bg-ofs-navy-50/70 text-ofs-navy-950 border-ofs-red-600'
                      : 'text-ofs-gray-700 hover:bg-ofs-gray-50 hover:text-ofs-navy-950 border-transparent'
                  )}
                >
                  <Icon size={16} className={isActive ? 'text-ofs-red-600' : 'text-ofs-gray-500'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block p-3.5 bg-ofs-navy-50/70 rounded text-xs text-ofs-navy-900 border border-ofs-navy-100 mt-4">
            <div className="font-bold mb-0.5">OFS Enterprise CMS</div>
            <div className="text-ofs-gray-600">v1.0.0 • Connected</div>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
