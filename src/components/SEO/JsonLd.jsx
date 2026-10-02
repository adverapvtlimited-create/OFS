
export default function JsonLd({ data }) {
  if (!data) return null;

  const rawSchemas = Array.isArray(data) ? data.flat(Infinity) : [data];
  const schemas = rawSchemas.filter(Boolean);
  if (!schemas.length) return null;

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={schema['@id'] || schema['@type'] || index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
