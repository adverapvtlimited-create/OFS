'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if device is small mobile (< 768px) to preserve native mobile gesture physics
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Global click handler for in-page hash anchor links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href*="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Check if it is a pure hash or same-page hash link
      if (href.startsWith('#') && href.length > 1) {
        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -70, duration: 1.0 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // On every route change (pathname change):
  useEffect(() => {
    // 1. Immediately reset scroll position to top
    window.scrollTo(0, 0);
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();
    }

    // 2. Allow new page DOM to mount, then refresh ScrollTrigger & trigger observers
    const timer = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
        
        // Handle hash navigation on newly mounted route if present
        if (window.location.hash) {
          const hashId = window.location.hash.slice(1);
          const hashEl = document.getElementById(hashId);
          if (hashEl) {
            lenisRef.current.scrollTo(hashEl, { offset: -70, duration: 0.8 });
          }
        }
      }
      ScrollTrigger.refresh();
      // Dispatch scroll & resize events so all Framer Motion whileInView / IntersectionObservers re-evaluate immediately
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('resize'));
    }, 80);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}

