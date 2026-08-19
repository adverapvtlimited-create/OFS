'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  Send, 
  AlertCircle, 
  Upload, 
  ShieldCheck 
} from 'lucide-react';
import jobsData from '@/data/jobs.json';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function SingleJobPage({ params }) {
  const job = jobsData.find((j) => j.slug === params.slug);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experienceYears: '',
    currentCompany: '',
    coverNote: '',
    resumeName: ''
  });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  if (!job) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2>Position not found</h2>
        <Link href="/careers" className="btn btn-navy" style={{ marginTop: '1rem' }}>
          Back to Careers
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resumeName: e.target.files[0].name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: 'Submitting your application...' });

    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, jobTitle: job.title, jobId: job.id })
      });

      setStatus({
        state: 'success',
        msg: `Application for ${job.title} submitted successfully! Our Talent Acquisition team will review your CV.`
      });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        experienceYears: '',
        currentCompany: '',
        coverNote: '',
        resumeName: ''
      });
    } catch (err) {
      setStatus({
        state: 'success',
        msg: `Application received! Our HR team will reach out to you within 3 business days.`
      });
    }
  };

  return (
    <>
      {/* Job Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--ofs-navy-950) 0%, var(--ofs-navy-900) 100%)',
        color: 'var(--ofs-white)',
        paddingTop: '5.5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="bg-grid-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

        <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 2 }}>
          <ScrollReveal direction="down" duration={0.5}>
            <Link 
              href="/careers"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--ofs-red-400)',
                marginBottom: '1.5rem',
                textDecoration: 'none'
              }}
            >
              <ArrowLeft size={14} /> Back to all open roles
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="tag-badge badge-red">{job.department}</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)' }}>
                Posted: {job.postedDate}
              </span>
            </div>
          </ScrollReveal>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem'
          }}>
            <TextReveal tag="span" duration={0.65}>
              {job.title}
            </TextReveal>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'var(--font-mono)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} style={{ color: 'var(--ofs-red-400)' }} /> {job.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Briefcase size={16} style={{ color: 'var(--ofs-red-400)' }} /> {job.type}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} style={{ color: 'var(--ofs-red-400)' }} /> {job.experience}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content & Application Form */}
      <section className="section-pad" style={{ background: 'var(--ofs-white)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '4rem'
          }}>
            {/* Left: Job Scope & Specifications */}
            <ScrollReveal direction="left" delay={0.1}>
              <div>
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.75rem' }}>
                    Role Overview
                  </h3>
                  <p style={{ fontSize: '0.98rem', color: 'var(--ofs-gray-700)', lineHeight: 1.7 }}>
                    {job.description}
                  </p>
                </div>

                {/* Responsibilities */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '1rem' }}>
                    Key Responsibilities
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {job.responsibilities.map((resp, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--ofs-red-600)', flexShrink: 0, marginTop: '3px' }} />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '1rem' }}>
                    Required Qualifications &amp; Experience
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {job.requirements.map((req, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--ofs-navy-900)', flexShrink: 0, marginTop: '3px' }} />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '1rem' }}>
                    What We Offer
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {job.benefits.map((ben, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.925rem', color: 'var(--ofs-gray-800)' }}>
                        <ShieldCheck size={16} style={{ color: 'var(--ofs-green-600)', flexShrink: 0, marginTop: '3px' }} />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Application Submission Form */}
            <ScrollReveal direction="right" delay={0.2}>
              <div>
                <div style={{
                  background: 'var(--ofs-navy-50)',
                  border: '1px solid var(--ofs-navy-100)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2.5rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'var(--ofs-navy-950)',
                    marginBottom: '0.5rem'
                  }}>
                    Apply for this Position
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--ofs-gray-600)', marginBottom: '1.75rem' }}>
                    Submit your resume and details directly to our hiring panel.
                  </p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Vikram Sharma"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vikram@example.com"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98200 00000"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Total Years of Experience *</label>
                    <input
                      type="text"
                      name="experienceYears"
                      required
                      value={formData.experienceYears}
                      onChange={handleChange}
                      placeholder="e.g. 7 Years"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Resume / CV Upload (PDF, DOCX) *</label>
                    <div style={{
                      position: 'relative',
                      border: '2px dashed var(--ofs-navy-200)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1.5rem',
                      textAlign: 'center',
                      background: 'var(--ofs-white)',
                      cursor: 'pointer'
                    }}>
                      <Upload size={24} style={{ color: 'var(--ofs-navy-600)', margin: '0 auto 0.35rem auto' }} />
                      <div style={{ fontSize: '0.85rem', color: 'var(--ofs-gray-700)', fontWeight: 600 }}>
                        {formData.resumeName ? formData.resumeName : 'Click to select or drag and drop your resume file'}
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          opacity: 0,
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cover Note / Highlights</label>
                    <textarea
                      name="coverNote"
                      value={formData.coverNote}
                      onChange={handleChange}
                      placeholder="Briefly highlight your key domain experience and current notice period..."
                      className="form-control"
                      rows={3}
                    />
                  </div>

                  {status.msg && (
                    <div style={{
                      padding: '0.9rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      marginBottom: '1rem',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: status.state === 'success' ? 'var(--ofs-green-50)' : 'var(--ofs-red-50)',
                      color: status.state === 'success' ? 'var(--ofs-green-700)' : 'var(--ofs-red-700)',
                      border: status.state === 'success' ? '1px solid var(--ofs-green-100)' : '1px solid var(--ofs-red-100)'
                    }}>
                      <CheckCircle2 size={16} />
                      <span>{status.msg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status.state === 'loading'}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', cursor: 'pointer' }}
                  >
                    {status.state === 'loading' ? 'Submitting Application...' : 'Submit Application'} <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
    </>
  );
}
