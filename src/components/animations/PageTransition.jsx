'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

/**
 * Lightweight page transition — fades in on mount only.
 * Does NOT use AnimatePresence mode="wait" which blocks rendering.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  );
}
