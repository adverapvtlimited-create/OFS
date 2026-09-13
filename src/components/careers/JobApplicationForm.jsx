'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Send, Upload } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { careerApplicationSchema, validateResumeFile } from '@/lib/validations/career';

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
  const [fieldErrors, setFieldErrors] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateResumeFile(file);
      if (!validation.valid) {
        setResumeError(validation.error);
        setResumeFile(null);
        return;
      }
      setResumeError('');
      setResumeFile(file);
      setFormData((prev) => ({ ...prev, resumeName: file.name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setResumeError('');

    // 🔒 1. Client-side Zod validation
    const candidateData = {
      ...formData,
      jobTitle: job?.title || 'General Application',
      jobId: job?.id || 'general',
    };

    const validation = careerApplicationSchema.safeParse(candidateData);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      setFieldErrors(errors);
      setStatus({
        state: 'error',
        msg: 'Please correct the highlighted fields before submitting.',
      });
      return;
    }

    // 🔒 2. Resume validation
    if (resumeFile) {
      const fileValidation = validateResumeFile(resumeFile);
      if (!fileValidation.valid) {
        setResumeError(fileValidation.error);
        return;
      }
    }

    setStatus({ state: 'loading', msg: 'Submitting your application...' });

    try {
      let res;
      const validData = validation.data;

      if (resumeFile) {
        const bodyData = new FormData();
        bodyData.append('fullName', validData.fullName);
        bodyData.append('email', validData.email);
        bodyData.append('phone', validData.phone);
        bodyData.append('experienceYears', validData.experienceYears || '');
        bodyData.append('currentCompany', validData.currentCompany || '');
        bodyData.append('coverNote', validData.coverNote || '');
        bodyData.append('jobTitle', validData.jobTitle);
        bodyData.append('jobId', validData.jobId);
        bodyData.append('resumeName', validData.resumeName || resumeFile.name);
        bodyData.append('file', resumeFile);

        res = await fetch('/api/careers', {
          method: 'POST',
          body: bodyData,
        });
      } else {
        res = await fetch('/api/careers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(validData),
        });
      }

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        throw new Error(result.error || 'Failed to submit application.');
      }

      setStatus({
        state: 'success',
        msg: `Application for ${job?.title || 'this position'} submitted successfully! A confirmation email has been sent to ${formData.email}.`,
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
      setFieldErrors({});
      setResumeFile(null);
      setResumeError('');
    } catch (err) {
      console.error('Job application submission error:', err);
      setStatus({
        state: 'error',
        msg: err.message || 'Failed to submit application. Please check your details and try again.',
      });
    }
  };

  return (
    <ScrollReveal direction="right" delay={0.2}>
      <div className="bg-ofs-navy-50 border border-ofs-navy-100 rounded-lg p-8 sm:p-10 shadow-lg">
        <h3 className="font-heading text-2xl font-extrabold text-ofs-navy-950 mb-2">
          Apply for this Position
        </h3>
        <p className="text-sm text-ofs-gray-600 mb-7">
          Submit your resume and details directly to our hiring panel.
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.05em]" htmlFor="fullName">
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
              className={cn(
                "w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border rounded-sm outline-none transition-all duration-150",
                fieldErrors.fullName
                  ? "border-ofs-red-500 focus:border-ofs-red-600 focus:ring-2 focus:ring-ofs-red-500/20"
                  : "border-ofs-gray-300 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/15"
              )}
            />
            {fieldErrors.fullName && (
              <p className="flex items-center gap-1 text-xs text-ofs-red-600 font-medium mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{fieldErrors.fullName[0]}</span>
              </p>
            )}
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
              value={formData.email}
              onChange={handleChange}
              placeholder="vikram@example.com"
              className={cn(
                "w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border rounded-sm outline-none transition-all duration-150",
                fieldErrors.email
                  ? "border-ofs-red-500 focus:border-ofs-red-600 focus:ring-2 focus:ring-ofs-red-500/20"
                  : "border-ofs-gray-300 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/15"
              )}
            />
            {fieldErrors.email && (
              <p className="flex items-center gap-1 text-xs text-ofs-red-600 font-medium mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{fieldErrors.email[0]}</span>
              </p>
            )}
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
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98200 00000"
              className={cn(
                "w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border rounded-sm outline-none transition-all duration-150",
                fieldErrors.phone
                  ? "border-ofs-red-500 focus:border-ofs-red-600 focus:ring-2 focus:ring-ofs-red-500/20"
                  : "border-ofs-gray-300 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/15"
              )}
            />
            {fieldErrors.phone && (
              <p className="flex items-center gap-1 text-xs text-ofs-red-600 font-medium mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{fieldErrors.phone[0]}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.05em]" htmlFor="experienceYears">
              Total Years of Experience *
            </label>
            <input
              id="experienceYears"
              type="text"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              placeholder="e.g. 7 Years"
              className={cn(
                "w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border rounded-sm outline-none transition-all duration-150",
                fieldErrors.experienceYears
                  ? "border-ofs-red-500 focus:border-ofs-red-600 focus:ring-2 focus:ring-ofs-red-500/20"
                  : "border-ofs-gray-300 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/15"
              )}
            />
            {fieldErrors.experienceYears && (
              <p className="flex items-center gap-1 text-xs text-ofs-red-600 font-medium mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{fieldErrors.experienceYears[0]}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.05em]" htmlFor="resume">
              Resume / CV Upload (PDF up to 10MB)
            </label>
            <div className="relative border-2 border-dashed border-ofs-navy-200 rounded-sm p-6 text-center bg-white cursor-pointer hover:border-ofs-navy-400 transition-colors">
              <Upload size={24} className="text-ofs-navy-600 mx-auto mb-1.5" />
              <div className="text-sm text-ofs-gray-700 font-semibold">
                {formData.resumeName ? formData.resumeName : 'Click to select or drag and drop your resume file (.pdf)'}
              </div>
              <input
                id="resume"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            {resumeError && (
              <p className="flex items-center gap-1 text-xs text-ofs-red-600 font-medium mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{resumeError}</span>
              </p>
            )}
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
              className={cn(
                "w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border rounded-sm outline-none transition-all duration-150 resize-y min-h-[100px]",
                fieldErrors.coverNote
                  ? "border-ofs-red-500 focus:border-ofs-red-600 focus:ring-2 focus:ring-ofs-red-500/20"
                  : "border-ofs-gray-300 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/15"
              )}
            />
            {fieldErrors.coverNote && (
              <p className="flex items-center gap-1 text-xs text-ofs-red-600 font-medium mt-0.5">
                <AlertCircle size={12} className="shrink-0" />
                <span>{fieldErrors.coverNote[0]}</span>
              </p>
            )}
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
              {status.state === 'success' ? (
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle size={16} className="shrink-0 text-red-600" />
              )}
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
