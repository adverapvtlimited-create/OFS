'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  aboutNav,
  industriesNav,
  productsNav,
  whatWeOffer,
  whatWeOfferColumns,
  findOfferMatch,
  isWhatWeOfferPath,
} from '@/data/navigation';

function NavTrigger({
  label,
  isActive,
  isOpen,
  onToggle,
  onHoverOpen,
  controlsId,
}) {
  return (
    <button
      type="button"
      className={cn(
        'font-mono text-[0.75rem] xl:text-[0.82rem] font-semibold uppercase tracking-[0.03em] py-2 flex items-center gap-1 transition-colors bg-transparent border-0 cursor-pointer relative whitespace-nowrap',
        isActive ? 'text-ofs-navy-900' : 'text-ofs-navy-950 hover:text-ofs-navy-900'
      )}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls={controlsId}
      onClick={onToggle}
      onFocus={onHoverOpen}
    >
      {label}
      <ChevronDown
        size={14}
        className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
      />
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ofs-navy-900 rounded-full" />
      )}
    </button>
  );
}

function SimpleMenu({ items, pathname, onNavigate, columns = 1 }) {
  return (
    <div
      className={cn(
        'min-w-[240px] bg-white rounded-xl border border-ofs-gray-200 shadow-[0_18px_50px_rgba(12,30,78,0.12)] p-3',
        columns === 2 && 'min-w-[420px] grid grid-cols-2 gap-1'
      )}
    >
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}#`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'block py-2 px-3 rounded-md text-sm leading-snug no-underline transition-colors',
              active
                ? 'text-ofs-navy-900 bg-ofs-navy-50 font-semibold'
                : 'text-ofs-gray-700 hover:bg-ofs-navy-50 hover:text-ofs-navy-950'
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}

export default function DesktopNav({ pathname }) {
  const [openMenu, setOpenMenu] = useState(null);
  const wrapRef = useRef(null);
  const closeTimer = useRef(null);
  const offerId = useId();
  const aboutId = useId();
  const industriesId = useId();
  const productsId = useId();
  const offerMatch = findOfferMatch(pathname);
  const offerActive = isWhatWeOfferPath(pathname);

  const clearClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  const open = (id) => {
    clearClose();
    setOpenMenu(id);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
      clearClose();
    };
  }, []);

  const linkClass = (active) =>
    cn(
      'font-mono text-[0.75rem] xl:text-[0.82rem] font-semibold uppercase tracking-[0.03em] py-2 relative transition-colors whitespace-nowrap',
      active ? 'text-ofs-navy-900' : 'text-ofs-navy-950 hover:text-ofs-navy-900'
    );

  return (
    <nav ref={wrapRef} className="hidden nav:flex items-center gap-3 xl:gap-4.5" aria-label="Primary">
      <Link href="/" className={linkClass(pathname === '/')}>
        Home
        {pathname === '/' && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ofs-navy-900 rounded-full" />
        )}
      </Link>

      <div
        className="relative"
        onMouseEnter={() => open('about')}
        onMouseLeave={scheduleClose}
      >
        <NavTrigger
          label="About Us"
          isActive={pathname === '/about'}
          isOpen={openMenu === 'about'}
          onToggle={() => setOpenMenu(openMenu === 'about' ? null : 'about')}
          onHoverOpen={() => open('about')}
          controlsId={aboutId}
        />
        <div
          id={aboutId}
          className={cn(
            'absolute top-full left-0 pt-3 z-[600] transition-opacity duration-200',
            openMenu === 'about' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          )}
        >
          <SimpleMenu items={aboutNav} pathname={pathname} onNavigate={() => setOpenMenu(null)} />
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => open('industries')}
        onMouseLeave={scheduleClose}
      >
        <NavTrigger
          label="Industries"
          isActive={pathname.startsWith('/industries')}
          isOpen={openMenu === 'industries'}
          onToggle={() => setOpenMenu(openMenu === 'industries' ? null : 'industries')}
          onHoverOpen={() => open('industries')}
          controlsId={industriesId}
        />
        <div
          id={industriesId}
          className={cn(
            'absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[600] transition-opacity duration-200',
            openMenu === 'industries' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          )}
        >
          <SimpleMenu
            items={[{ title: 'All Industries', href: '/industries' }, ...industriesNav]}
            pathname={pathname}
            onNavigate={() => setOpenMenu(null)}
            columns={2}
          />
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => open('products')}
        onMouseLeave={scheduleClose}
      >
        <NavTrigger
          label="Products"
          isActive={pathname.startsWith('/products')}
          isOpen={openMenu === 'products'}
          onToggle={() => setOpenMenu(openMenu === 'products' ? null : 'products')}
          onHoverOpen={() => open('products')}
          controlsId={productsId}
        />
        <div
          id={productsId}
          className={cn(
            'absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[600] transition-opacity duration-200',
            openMenu === 'products' ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          )}
        >
          <SimpleMenu
            items={[{ title: 'All Products', href: '/products' }, ...productsNav]}
            pathname={pathname}
            onNavigate={() => setOpenMenu(null)}
            columns={2}
          />
        </div>
      </div>

      <div
        className="static"
        onMouseEnter={() => open('offer')}
        onMouseLeave={scheduleClose}
      >
        <NavTrigger
          label="What We Offer"
          isActive={offerActive}
          isOpen={openMenu === 'offer'}
          onToggle={() => setOpenMenu(openMenu === 'offer' ? null : 'offer')}
          onHoverOpen={() => open('offer')}
          controlsId={offerId}
        />

        <div
          id={offerId}
          role="menu"
          aria-label="What We Offer"
          className={cn(
            'absolute top-full left-0 right-0 pt-2 z-[650] transition-all duration-200 pointer-events-none',
            openMenu === 'offer'
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-1'
          )}
        >
          <div className="w-full max-w-container mx-auto px-5 sm:px-8 lg:px-11 pointer-events-auto">
            <div className="bg-white rounded-2xl border border-ofs-gray-200/90 shadow-[0_24px_60px_rgba(12,30,78,0.14)] p-6 xl:p-7">
              <div className="grid grid-cols-5 divide-x divide-ofs-gray-200">
                {whatWeOfferColumns.map((key) => {
                  const column = whatWeOffer[key];
                  const columnActive = offerMatch?.column.id === column.id;
                  return (
                    <div key={column.id} className="px-4 first:pl-0 last:pr-0 min-w-0">
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-ofs-gray-100">
                        <p
                          className={cn(
                            'font-mono text-[0.72rem] font-bold tracking-[0.12em] uppercase m-0 leading-tight',
                            columnActive ? 'text-ofs-navy-900 font-extrabold' : 'text-ofs-gray-500'
                          )}
                        >
                          {column.title}
                        </p>
                        {columnActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-ofs-navy-700 shrink-0"
                            title="Active Section"
                          />
                        )}
                      </div>
                      <ul className="flex flex-col gap-1 m-0 p-0 list-none">
                        {column.items.map((item) => {
                          const active = pathname === item.href;
                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                role="menuitem"
                                onClick={() => setOpenMenu(null)}
                                className={cn(
                                  'flex items-center gap-2.5 text-[0.82rem] leading-snug no-underline py-1.5 px-2 rounded transition-all duration-150 break-words',
                                  active
                                    ? 'text-ofs-navy-900 font-bold bg-ofs-navy-50/90 border-l-2 border-ofs-navy-800 pl-2'
                                    : 'text-ofs-gray-700 hover:text-ofs-navy-950 hover:bg-ofs-navy-50/60'
                                )}
                              >
                                {column.id === 'services' && item.image && (
                                  <img
                                    src={item.image}
                                    alt=""
                                    aria-hidden="true"
                                    className="h-10 w-12 shrink-0 rounded object-cover border border-ofs-gray-200"
                                  />
                                )}
                                <span>{item.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      

      <Link
        href="/renewables"
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50/70 text-emerald-900 font-mono text-[0.72rem] xl:text-[0.78rem] font-bold tracking-[0.05em] transition-all duration-200 hover:bg-emerald-100/80 hover:border-emerald-400 no-underline whitespace-nowrap',
          pathname === '/renewables' && 'ring-1 ring-emerald-500 bg-emerald-100'
        )}
      >
        <span className="relative flex items-center justify-center w-3.5 h-3.5 shrink-0">
          <span className="w-3.5 h-3.5 rounded-full border border-ofs-red-500 flex items-center justify-center bg-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-ofs-green-600" />
          </span>
          <span className="absolute -inset-0.5 rounded-full border border-ofs-red-500 animate-sonar pointer-events-none" />
        </span>
        <span>RENEWABLES</span>
      </Link>

      <Link href="/blog" className={linkClass(pathname.startsWith('/blog'))}>
        INSIGHTS
        {pathname.startsWith('/blog') && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ofs-navy-900 rounded-full" />
        )}
      </Link>

      <Link href="/careers" className={linkClass(pathname.startsWith('/careers'))}>
        CAREERS
        {pathname.startsWith('/careers') && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ofs-navy-900 rounded-full" />
        )}
      </Link>
    </nav>
  );
}
