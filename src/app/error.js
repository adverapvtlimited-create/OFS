'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[60vh] grid place-content-center text-center py-16 px-6 bg-ofs-navy-50">
      <div className="max-w-[520px] mx-auto">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-ofs-red-600 mb-3">
          Unexpected error
        </p>
        <h1 className="font-heading text-3xl font-extrabold text-ofs-navy-950 mb-4">
          This page could not be loaded
        </h1>
        <p className="text-base text-ofs-gray-600 leading-relaxed mb-8">
          Please try again. If the problem continues, contact our operations desk or return to the homepage.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button variant="primary" onClick={() => reset()}>
            Try again
          </Button>
          <Button href="/" variant="outline">
            Return home
          </Button>
        </div>
      </div>
    </section>
  );
}
