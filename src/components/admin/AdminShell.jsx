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

export default function AdminShell({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'RFQs & Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Job Applications', href: '/admin/careers', icon: Briefcase },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ofs-gray-100)', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          background: 'var(--ofs-navy-950)',
          color: 'var(--ofs-white)',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.15rem',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                background: 'var(--ofs-red-600)',
                color: '#fff',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              CMS
            </span>
            OFS GROUP INDIA — ADMIN
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} /> Back to Live Website
          </Link>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside
          style={{
            width: '240px',
            background: 'var(--ofs-white)',
            borderRight: '1px solid var(--ofs-gray-200)',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: 'var(--ofs-gray-500)',
                textTransform: 'uppercase',
                padding: '0 0.75rem 0.5rem 0.75rem',
              }}
            >
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: isActive ? 'var(--ofs-navy-50)' : 'transparent',
                    color: isActive ? 'var(--ofs-navy-950)' : 'var(--ofs-gray-700)',
                    borderLeft: isActive ? '3px solid var(--ofs-red-600)' : '3px solid transparent',
                  }}
                >
                  <Icon size={18} style={{ color: isActive ? 'var(--ofs-red-600)' : 'var(--ofs-gray-500)' }} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div
            style={{
              padding: '0.85rem',
              background: 'var(--ofs-navy-50)',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.75rem',
              color: 'var(--ofs-navy-900)',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>OFS Enterprise CMS</div>
            <div style={{ color: 'var(--ofs-gray-600)' }}>v1.0.0 • Connected</div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}
