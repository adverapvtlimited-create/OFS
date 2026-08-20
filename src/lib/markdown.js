import React from 'react';

/**
 * Lightweight markdown-like renderer for blog post content stored in JSON.
 * Supports ### headings, **bold**, numbered lists, and bullet lists.
 */
export function renderBlogContent(content) {
  if (!content) return null;

  return content.split('\n\n').map((block, blockIdx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('### ')) {
      return (
        <h2
          key={blockIdx}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.65rem',
            fontWeight: 800,
            color: 'var(--ofs-navy-950)',
            marginTop: '1.5rem',
            marginBottom: '0.5rem',
          }}
        >
          {trimmed.replace('### ', '')}
        </h2>
      );
    }

    const lines = trimmed.split('\n');
    const isOrderedList = lines.every((line) => /^\d+\.\s/.test(line.trim()));
    const isBulletList = lines.every((line) => /^[-*]\s/.test(line.trim()));

    if (isOrderedList || isBulletList) {
      const ListTag = isOrderedList ? 'ol' : 'ul';
      return (
        <ListTag
          key={blockIdx}
          style={{
            paddingLeft: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            margin: 0,
          }}
        >
          {lines.map((line, lineIdx) => (
            <li key={lineIdx} style={{ lineHeight: 1.7 }}>
              {renderInlineMarkdown(line.replace(/^\d+\.\s|^[-*]\s/, ''))}
            </li>
          ))}
        </ListTag>
      );
    }

    return (
      <p key={blockIdx} style={{ margin: 0 }}>
        {renderInlineMarkdown(trimmed)}
      </p>
    );
  });
}

function renderInlineMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index}>{part.slice(2, -2)}</strong>
      );
    }
    return part;
  });
}
