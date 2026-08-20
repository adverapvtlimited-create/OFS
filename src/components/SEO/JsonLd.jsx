/**
 * Renders JSON-LD structured data. Accepts a single schema object or array of schemas.
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  const schemas = Array.isArray(data) ? data.filter(Boolean) : [data].filter(Boolean);
  if (!schemas.length) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas) }}
    />
  );
}
