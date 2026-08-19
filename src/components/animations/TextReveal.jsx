'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TextReveal({
  children,
  className = '',
  style = {},
  tag: Tag = 'div',
  delay = 0,
  stagger = 0.04,
  duration = 0.65,
  once = true
}) {
  const text = typeof children === 'string' ? children : '';
  const words = text ? text.split(' ') : [];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // cubic-bezier smooth spring
      }
    }
  };

  if (!text) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag className={className} style={{ ...style, overflow: 'hidden' }}>
      <motion.span
        style={{ display: 'inline-block', width: '100%' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-40px' }}
      >
        {words.map((word, idx) => (
          <span
            key={idx}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', marginRight: '0.28em' }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
