'use client';

import React, { useState } from 'react';
import { CheckCircle2, Send, Upload } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

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
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, jobTitle: job.title, jobId: job.id }),
      });

      if (res.ok) {
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
      } else {
        const errData = await res.json().catch(() => ({}));
        setStatus({
          state: 'error',
          msg: errData.error || 'Failed to submit application. Please verify all details and try again.',
        });
      }
    } catch (err) {
      setStatus({
        state: 'error',
        msg: err?.message || 'Network error submitting application. Please try again later.',
      });
    }
  };

  return (
    <ScrollReveal direction="right" delay={0.2}>
      <div className="bg-ofs-navy-50 border border-ofs-navy-100 rounded-lg p-5 sm:p-8 lg:p-10 shadow-lg">
        <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-ofs-navy-950 mb-2">
          Apply for this Position
        </h3>
        <p className="text-xs sm:text-sm text-ofs-gray-600 mb-6">
          Submit your resume and details directly to our hiring panel.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.05em]" htmlFor="fullName">
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              required
              minLength={2}
              maxLength={100}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Vikram Sharma"
              className="w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border border-ofs-gray-300 rounded-sm outline-none transition-all duration-150 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/15"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.05em]" htmlFor="email">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              maxLength={120}
              value={formData.email}
              onChange={handleChange}
              placeholder="vikram@example.com"
              className="w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border border-ofs-gray-300 rounded-sm outline-none transition-all duration-150 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/15"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.05em]" htmlFor="phone">
              Phone Number *
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              required
              minLength={7}
              maxLength={25}
              pattern="^[+]?[0-9\s\-\(\)\.]{7,25}$"
              title="Please enter a valid phone number containing digits (e.g. +91 98200 00000)"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98200 00000"
              className="w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border border-ofs-gray-300 rounded-sm outline-none transition-all duration-150 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/15"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.05em]" htmlFor="experienceYears">
              Total Years of Experience *
            </label>
            <input
              id="experienceYears"
              type="text"
              name="experienceYears"
              required
              maxLength={50}
              value={formData.experienceYears}
              onChange={handleChange}
              placeholder="e.g. 7 Years"
              className="w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border border-ofs-gray-300 rounded-sm outline-none transition-all duration-150 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/15"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.05em]" htmlFor="resume">
              Resume / CV Upload (PDF, DOCX) *
            </label>
            <div className="relative border-2 border-dashed border-ofs-navy-200 rounded-sm p-6 text-center bg-white cursor-pointer hover:border-ofs-navy-400 transition-colors">
              <Upload size={24} className="text-ofs-navy-600 mx-auto mb-1.5" />
              <div className="text-sm text-ofs-gray-700 font-semibold">
                {formData.resumeName ? formData.resumeName : 'Click to select or drag and drop your resume file'}
              </div>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.05em]" htmlFor="coverNote">
              Cover Note / Highlights
            </label>
            <textarea
              id="coverNote"
              name="coverNote"
              value={formData.coverNote}
              onChange={handleChange}
              placeholder="Briefly highlight your key domain experience and current notice period..."
              rows={3}
              className="w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border border-ofs-gray-300 rounded-sm outline-none transition-all duration-150 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/15 resize-y min-h-[100px]"
            />
          </div>

          {status.msg && (
            <div
              className={cn(
                'p-3.5 rounded-xs text-sm flex items-center gap-2',
                status.state === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              )}
            >
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{status.msg}</span>
            </div>
          )}

          <div className="w-full mt-2">
            <button
              type="submit"
              disabled={status.state === 'loading'}
              className={cn(
                'w-full py-4 px-8 font-mono text-sm font-bold uppercase tracking-[0.06em] rounded-xs text-white bg-ofs-red-600 border border-ofs-red-500 shadow-[0_4px_16px_rgba(224,42,48,0.32)] transition-all duration-200 flex items-center justify-center gap-2 hover:bg-ofs-red-700 hover:shadow-[0_8px_24px_rgba(224,42,48,0.45)] hover:-translate-y-0.5',
                status.state === 'loading' ? 'cursor-wait opacity-80' : 'cursor-pointer'
              )}
            >
              {status.state === 'loading' ? 'Submitting Application...' : 'Submit Application'}{' '}
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </ScrollReveal>
  );
}
