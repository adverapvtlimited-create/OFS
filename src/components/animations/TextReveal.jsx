'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TextReveal({
  children,
  className = '',
  style = {},
  tag: Tag = 'span',
  delay = 0,
  stagger = 0.03,
  duration = 0.6,
  once = true
}) {
  const text = typeof children === 'string' ? children : '';

  if (!text) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
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
      y: 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  };

  return (
    <motion.span
      className={className}
      style={{
        display: 'inline',
        ...style
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '0px' }}
    >
      {words.map((word, idx) => (
        <React.Fragment key={idx}>
          <motion.span
            style={{
              display: 'inline-block',
              background: 'inherit',
              WebkitBackgroundClip: 'inherit',
              WebkitTextFillColor: 'inherit'
            }}
            variants={wordVariants}
          >
            {word}
          </motion.span>
          {idx < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </motion.span>
  );
}
