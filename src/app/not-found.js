import Link from 'next/link';
import { Home, Compass } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] grid place-content-center text-center py-16 px-6 bg-ofs-navy-50">
      <div className="max-w-[540px] mx-auto">
        <div
          className="font-heading text-[clamp(4rem,8vw,7rem)] font-black text-ofs-red-600 leading-none mb-4"
          aria-hidden="true"
        >
          404
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-ofs-navy-950 mb-4">
          Page Not Found
        </h1>
        <p className="text-base text-ofs-gray-600 leading-relaxed mb-8">
          The requested page could not be located. Explore OFS services, industries, or return to the homepage.
        </p>

        <nav className="flex gap-4 justify-center flex-wrap" aria-label="Helpful links">
          <Button href="/" variant="primary">
            <Home size={16} /> Return to Homepage
          </Button>
          <Button href="/services" variant="outline">
            <Compass size={16} /> Explore OFS Services
          </Button>
          <Button href="/contact" variant="outline">
            Contact OFS Group India
          </Button>
        </nav>
      </div>
    </section>
  );
}
