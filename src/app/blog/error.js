'use client';

import Button from '@/components/ui/Button';

export default function BlogError({ reset }) {
  return (
    <section className="min-h-[50vh] grid place-content-center text-center py-16 px-6 bg-white">
      <div className="max-w-[480px] mx-auto">
        <h1 className="font-heading text-2xl font-extrabold text-ofs-navy-950 mb-3">
          This article could not be loaded
        </h1>
        <p className="text-sm text-ofs-gray-600 mb-6">
          The insight page failed to render. You can retry or browse other articles.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button variant="primary" onClick={() => reset()}>
            Retry
          </Button>
          <Button href="/blog" variant="outline">
            All insights
          </Button>
        </div>
      </div>
    </section>
  );
}
