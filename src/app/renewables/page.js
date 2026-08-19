import React from 'react';
import Link from 'next/link';
import { 
  Sun, 
  BatteryCharging, 
  Leaf, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Cpu, 
  TrendingUp,
  MapPin,
  Flame
} from 'lucide-react';
import Counter from '@/components/animations/Counter';
import renewablesData from '@/data/renewables.json';
import ContactCTA from '@/components/sections/ContactCTA';

export const metadata = {
  title: 'OFS Renewables — Solar EPC, Battery Storage (BESS) & Clean Energy Portal',
  description: 'Specialized clean energy division delivering utility-scale solar PV farm supply, containerized BESS storage, floating solar arrays, and digital O&M.'
};

export default function RenewablesPortalPage() {
  return (
    <>
      {/* Renewables Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #031711 0%, #06382B 60%, #06241C 100%)',
        color: 'var(--ofs-white)',
        paddingTop: '5.5rem',
        paddingBottom: '6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Grid Accent */}
        <div className="bg-grid-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.45, pointerEvents: 'none' }} />

        {/* Ambient Emerald Glow */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}>
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ofs-green-400)' }}>Renewables Portal</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div className="tag-badge badge-green">
              STRATEGIC CLEAN ENERGY DIVISION
            </div>
            <div className="tag-pill pill-green" style={{ color: '#fff', borderColor: 'rgba(255, 255, 255, 0.22)' }}>
              <Leaf size={14} style={{ color: 'var(--ofs-green-400)' }} />
              Decarbonization Infrastructure
            </div>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem',
            maxWidth: '920px'
          }}>
            Pioneering High-Yield Solar, <br />
            <span className="gradient-text-green">Storage & Hybrid Grid Systems</span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.88)',
            maxWidth: '800px',
            lineHeight: 1.6,
            marginBottom: '2.5rem'
          }}>
            {renewablesData.heroDescription}
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#solutions" className="btn btn-green btn-lg">
              Explore Clean Energy Solutions <ArrowUpRight size={18} />
            </a>
            <a href="#projects" className="btn btn-outline-white btn-lg">
              View Commissioned Projects
            </a>
          </div>
        </div>
      </section>

      {/* Renewables Metrics Bar */}
      <section style={{
        background: 'var(--ofs-navy-950)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2.75rem 0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {renewablesData.metrics.map((m, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.25rem, 3.8vw, 3.25rem)',
                  fontWeight: 900,
                  color: 'var(--ofs-green-400)',
                  lineHeight: 1,
                  marginBottom: '0.45rem'
                }}>
                  <Counter end={m.numeric} suffix={m.suffix} decimals={m.suffix.includes('%') && m.numeric % 1 !== 0 ? 1 : 0} />
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600
                }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Energy Solutions Grid */}
      <section className="section-pad" id="solutions" style={{ background: 'var(--ofs-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem auto' }}>
            <div className="tag-badge badge-green" style={{ marginBottom: '1rem' }}>
              CORE SOLAR & STORAGE SOLUTIONS
            </div>
            <h2 className="section-title">
              Turnkey Clean Energy Capabilities <br />
              <span className="gradient-text-green">Engineered for Maximum Performance</span>
            </h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              From multi-hundred-megawatt solar farms to captive C&I microgrids and autonomous waterless robotic cleaning systems.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem'
          }}>
            {renewablesData.solutions.map((sol) => (
              <div 
                key={sol.id}
                className="card-modern"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div>
                  <div style={{ height: '230px', position: 'relative' }}>
                    <img 
                      src={sol.image} 
                      alt={sol.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(3, 23, 17, 0.15) 0%, rgba(3, 23, 17, 0.75) 100%)'
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '1.25rem',
                      left: '1.25rem',
                      right: '1.25rem'
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        color: '#fff',
                        lineHeight: 1.25
                      }}>
                        {sol.title}
                      </h3>
                    </div>
                  </div>

                  <div style={{ padding: '2rem' }}>
                    <p style={{ fontSize: '0.925rem', color: 'var(--ofs-gray-600)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {sol.shortDesc}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {sol.features.map((feat, fIdx) => (
                        <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.875rem', color: 'var(--ofs-gray-800)' }}>
                          <CheckCircle2 size={16} style={{ color: 'var(--ofs-green-600)', flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '1.25rem 2rem',
                  borderTop: '1px solid var(--ofs-gray-200)',
                  background: 'var(--ofs-gray-50)'
                }}>
                  <a 
                    href="#renewables-inquiry"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--ofs-green-700)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      textDecoration: 'none'
                    }}
                  >
                    Request Feasibility Study <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase */}
      <section className="section-pad" id="projects" style={{ background: 'var(--ofs-gray-50)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
            <div className="tag-badge badge-green" style={{ marginBottom: '1rem' }}>
              PROJECT PORTFOLIO
            </div>
            <h2 className="section-title">
              Proven Utility & <br />
              <span className="gradient-text-green">Commercial Deployments</span>
            </h2>
            <p className="section-desc">
              Real-world engineering execution delivering high performance ratios and certified grid compliance.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}>
            {renewablesData.projects.map((proj) => (
              <div 
                key={proj.id}
                style={{
                  background: 'var(--ofs-white)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--ofs-gray-200)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div style={{ height: '210px', position: 'relative' }}>
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(6, 56, 43, 0.92)',
                    color: 'var(--ofs-green-300)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    backdropFilter: 'blur(8px)'
                  }}>
                    {proj.type}
                  </div>
                </div>

                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--ofs-gray-500)', fontSize: '0.825rem', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                    <MapPin size={13} style={{ color: 'var(--ofs-red-600)' }} />
                    {proj.location}
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.85rem' }}>
                    {proj.title}
                  </h3>

                  <div style={{
                    background: 'var(--ofs-green-50)',
                    border: '1px solid var(--ofs-green-100)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1rem',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--ofs-green-700)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      Technical Specifications:
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--ofs-gray-800)', fontWeight: 600 }}>
                      {proj.specs}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.875rem', color: 'var(--ofs-green-700)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Leaf size={16} />
                    {proj.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Renewables Dedicated Contact Form */}
      <div id="renewables-inquiry">
        <ContactCTA />
      </div>
    </>
  );
}
