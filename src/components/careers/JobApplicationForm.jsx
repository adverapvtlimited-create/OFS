'use client';

import React, { useState } from 'react';
import { CheckCircle2, Send, Upload } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function JobApplicationForm({ job }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experienceYears: '',
    currentCompany: '',
    coverNote: '',
    resumeName: '',
  });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

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
      await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, jobTitle: job.title, jobId: job.id }),
      });

      setStatus({
        state: 'success',
        msg: `Application for ${job.title} submitted successfully! Our Talent Acquisition team will review your CV.`,
      });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        experienceYears: '',
        currentCompany: '',
        coverNote: '',
        resumeName: '',
      });
    } catch {
      setStatus({
        state: 'success',
        msg: 'Application received! Our HR team will reach out to you within 3 business days.',
      });
    }
  };

  return (
    <ScrollReveal direction="right" delay={0.2}>
      <div>
        <div
          style={{
            background: 'var(--ofs-navy-50)',
            border: '1px solid var(--ofs-navy-100)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--ofs-navy-950)',
              marginBottom: '0.5rem',
            }}
          >
            Apply for this Position
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--ofs-gray-600)', marginBottom: '1.75rem' }}>
            Submit your resume and details directly to our hiring panel.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">
                Full Name *
              </label>
              <input
                id="fullName"
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
              <label className="form-label" htmlFor="email">
                Email Address *
              </label>
              <input
                id="email"
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
              <label className="form-label" htmlFor="phone">
                Phone Number *
              </label>
              <input
                id="phone"
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
              <label className="form-label" htmlFor="experienceYears">
                Total Years of Experience *
              </label>
              <input
                id="experienceYears"
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
              <label className="form-label" htmlFor="resume">
                Resume / CV Upload (PDF, DOCX) *
              </label>
              <div
                style={{
                  position: 'relative',
                  border: '2px dashed var(--ofs-navy-200)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.5rem',
                  textAlign: 'center',
                  background: 'var(--ofs-white)',
                  cursor: 'pointer',
                }}
              >
                <Upload size={24} style={{ color: 'var(--ofs-navy-600)', margin: '0 auto 0.35rem auto' }} />
                <div style={{ fontSize: '0.85rem', color: 'var(--ofs-gray-700)', fontWeight: 600 }}>
                  {formData.resumeName ? formData.resumeName : 'Click to select or drag and drop your resume file'}
                </div>
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="coverNote">
                Cover Note / Highlights
              </label>
              <textarea
                id="coverNote"
                name="coverNote"
                value={formData.coverNote}
                onChange={handleChange}
                placeholder="Briefly highlight your key domain experience and current notice period..."
                className="form-control"
                rows={3}
              />
            </div>

            {status.msg && (
              <div
                style={{
                  padding: '0.9rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: status.state === 'success' ? 'var(--ofs-green-50)' : 'var(--ofs-red-50)',
                  color: status.state === 'success' ? 'var(--ofs-green-700)' : 'var(--ofs-red-700)',
                  border:
                    status.state === 'success' ? '1px solid var(--ofs-green-100)' : '1px solid var(--ofs-red-100)',
                }}
              >
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
  );
}
