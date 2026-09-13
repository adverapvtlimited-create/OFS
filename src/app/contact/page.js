'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Globe2,
  MessageSquare,
  Building,
  UploadCloud,
  FileText,
  X,
  Paperclip
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import siteConfig from '@/data/site-config.json';
import { cn } from '@/lib/cn';
import { contactEnquirySchema, validatePdfFile } from '@/lib/validations/contact';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Procurement & Shipping',
    urgency: 'Standard (1-2 Days)',
    message: '',
    formType: 'general',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState('');
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validatePdfFile(file);
    if (!validation.valid) {
      setPdfError(validation.error);
      setPdfFile(null);
      return;
    }

    setPdfError('');
    setPdfFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setPdfError('');

    // 🔒 1. Client-side Zod validation
    const validation = contactEnquirySchema.safeParse(formData);
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      setFieldErrors(errors);
      setStatus({
        state: 'error',
        msg: 'Please correct the highlighted fields before submitting.',
      });
      return;
    }

    // 🔒 2. File validation if attached
    if (pdfFile) {
      const fileValidation = validatePdfFile(pdfFile);
      if (!fileValidation.valid) {
        setPdfError(fileValidation.error);
        return;
      }
    }

    setStatus({ state: 'loading', msg: 'Submitting your formal enquiry...' });

    try {
      const payload = new FormData();
      const validData = validation.data;

      payload.append('name', validData.name);
      payload.append('email', validData.email);
      payload.append('phone', validData.phone);
      payload.append('company', validData.company || '');
      payload.append('service', validData.service || '');
      payload.append('urgency', validData.urgency || '');
      payload.append('message', validData.message || '');
      payload.append('formType', 'general');

      if (pdfFile) {
        payload.append('file', pdfFile);
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: payload,
      });

      const resData = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus({
          state: 'success',
          msg: 'Thank you! Your enquiry and attached specifications have been routed to our commercial desk. We will respond within 4 business hours.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Procurement & Shipping',
          urgency: 'Standard (1-2 Days)',
          message: '',
          formType: 'general',
        });
        setFieldErrors({});
        setPdfFile(null);
        setPdfError('');
      } else {
        if (resData.errors) {
          setFieldErrors(resData.errors);
        }
        setStatus({
          state: 'error',
          msg: resData.error || 'Failed to submit enquiry. Please try again.',
        });
      }
    } catch (err) {
      setStatus({
        state: 'error',
        msg: err.message || 'Unable to connect to the server. Please check your connection and try again.',
      });
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-ofs-navy-950 via-[#071330] to-ofs-navy-900 text-white py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

        <div className="container relative z-10">
          <ScrollReveal direction="down" duration={0.5}>
            <div className="flex items-center gap-2 font-mono text-xs text-white/60 mb-6 uppercase">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-ofs-red-400">Contact</span>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl">
            <div className="tag-badge badge-red mb-4">Commercial &amp; Technical Desk</div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              Direct Global Procurement &amp; Engineering Support
            </h1>
            <p className="text-ofs-gray-300 text-base sm:text-lg leading-relaxed">
              Connect directly with our technical procurement specialists in Mumbai and Hyderabad for rapid quotation, material specifications, and logistics coordination.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Info & Contact Form */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Office Contacts & Quick Info */}
            <div className="lg:col-span-5 space-y-8">
              <ScrollReveal direction="left" duration={0.6}>
                <div>
                  <h2 className="font-heading text-2xl font-black text-ofs-navy-950 mb-3 tracking-tight">
                    Corporate &amp; Operational Offices
                  </h2>
                  <p className="text-ofs-gray-600 text-sm leading-relaxed mb-8">
                    Reach our technical teams across India for tenders, vendor empanelment, and procurement execution.
                  </p>

                  <div className="space-y-6">
                    {/* Mumbai Office */}
                    <div className="p-6 bg-ofs-navy-50/70 border border-ofs-navy-100 rounded-lg hover:border-ofs-navy-300 transition-colors">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-ofs-red-600 uppercase mb-2">
                        <Building size={14} /> Registered Corporate Office
                      </div>
                      <h3 className="font-heading text-lg font-bold text-ofs-navy-950 mb-2">
                        Mumbai Operational Headquarters
                      </h3>
                      <p className="text-xs text-ofs-gray-600 mb-4 leading-relaxed">
                        {siteConfig?.contact?.addressIndia?.line1}, {siteConfig?.contact?.addressIndia?.line2}, {siteConfig?.contact?.addressIndia?.city}, {siteConfig?.contact?.addressIndia?.state} - {siteConfig?.contact?.addressIndia?.pincode}, {siteConfig?.contact?.addressIndia?.country}
                      </p>
                      <div className="space-y-1.5 text-xs text-ofs-navy-900 font-mono">
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="text-ofs-red-600" />
                          <a href={`tel:${siteConfig?.contact?.phone || '0226961112'}`} className="hover:underline">
                            {siteConfig?.contact?.phone || '022 6961 1112'}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={13} className="text-ofs-red-600" />
                          <a href={`mailto:${siteConfig?.contact?.email || 'hello@ofsworld.com'}`} className="hover:underline">
                            {siteConfig?.contact?.email || 'hello@ofsworld.com'}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* USA Office */}
                    <div className="p-6 bg-ofs-navy-50/70 border border-ofs-navy-100 rounded-lg hover:border-ofs-navy-300 transition-colors">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-ofs-navy-700 uppercase mb-2">
                        <Building size={14} /> Global Entity &amp; Logistics Hub
                      </div>
                      <h3 className="font-heading text-lg font-bold text-ofs-navy-950 mb-2">
                        USA Operations Office
                      </h3>
                      <p className="text-xs text-ofs-gray-600 mb-4 leading-relaxed">
                        {siteConfig?.contact?.addressUSA?.line1}, {siteConfig?.contact?.addressUSA?.city}, {siteConfig?.contact?.addressUSA?.state} {siteConfig?.contact?.addressUSA?.pincode}, {siteConfig?.contact?.addressUSA?.country}
                      </p>
                      <div className="space-y-1.5 text-xs text-ofs-navy-900 font-mono">
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="text-ofs-navy-700" />
                          <a href={`tel:${siteConfig?.contact?.phone || '0226961112'}`} className="hover:underline">
                            {siteConfig?.contact?.phone || '022 6961 1112'}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={13} className="text-ofs-navy-700" />
                          <a href={`mailto:${siteConfig?.contact?.email || 'hello@ofsworld.com'}`} className="hover:underline">
                            {siteConfig?.contact?.email || 'hello@ofsworld.com'}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational SLAs */}
                  <div className="mt-8 p-6 bg-ofs-navy-950 text-white rounded-lg border border-white/10">
                    <h4 className="font-heading text-base font-bold text-white mb-3 flex items-center gap-2">
                      <ShieldCheck size={18} className="text-ofs-red-400" /> Response Guarantees
                    </h4>
                    <ul className="space-y-2.5 text-xs text-ofs-gray-300">
                      <li className="flex items-start gap-2">
                        <Clock size={14} className="text-ofs-gold-400 shrink-0 mt-0.5" />
                        <span><strong>Standard RFQ Response:</strong> Within 4 business hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Clock size={14} className="text-ofs-red-400 shrink-0 mt-0.5" />
                        <span><strong>Emergency Breakdown Support:</strong> 24/7 dedicated commercial desk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Globe2 size={14} className="text-ofs-teal-400 shrink-0 mt-0.5" />
                        <span><strong>International Export Logistics:</strong> FOB, CIF, DDP Incoterms supported</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Contact & RFQ Form */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="right" duration={0.6}>
                <div className="bg-white border border-ofs-gray-200 rounded-xl p-7 sm:p-9 shadow-md">
                  <div className="tag-badge badge-red mb-3">Online RFP Submission</div>

                  <h3 className="font-heading text-[1.4rem] font-extrabold text-ofs-navy-950 mb-2">
                    Send a General Business Enquiry
                  </h3>
                  <p className="text-[0.875rem] text-ofs-gray-500 mb-7">
                    Please fill in your details below and our technical commercial team will get back to you.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Contact Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Ramesh Reddy"
                          className={cn(
                            'form-control',
                            fieldErrors.name && 'border-ofs-red-500 focus:border-ofs-red-600 focus:ring-ofs-red-500/20'
                          )}
                        />
                        {fieldErrors.name && (
                          <p className="flex items-center gap-1 text-xs text-ofs-red-600 font-medium mt-1">
                            <AlertCircle size={12} className="shrink-0" />
                            <span>{fieldErrors.name[0]}</span>
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Official Work Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="r.reddy@enterprise.com"
                          className={cn(
                            'form-control',
                            fieldErrors.email && 'border-ofs-red-500 focus:border-ofs-red-600 focus:ring-ofs-red-500/20'
                          )}
                        />
                        {fieldErrors.email && (
                          <p className="flex items-center gap-1 text-xs text-ofs-red-600 font-medium mt-1">
                            <AlertCircle size={12} className="shrink-0" />
                            <span>{fieldErrors.email[0]}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98200 00000"
                          className={cn(
                            'form-control',
                            fieldErrors.phone && 'border-ofs-red-500 focus:border-ofs-red-600 focus:ring-ofs-red-500/20'
                          )}
                        />
                        {fieldErrors.phone && (
                          <p className="flex items-center gap-1 text-xs text-ofs-red-600 font-medium mt-1">
                            <AlertCircle size={12} className="shrink-0" />
                            <span>{fieldErrors.phone[0]}</span>
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company / Client Name</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="e.g. ONGC / Larsen &amp; Toubro"
                          className="form-control"
                        />
                        {fieldErrors.company && (
                          <p className="flex items-center gap-1 text-xs text-ofs-red-600 font-medium mt-1">
                            <AlertCircle size={12} className="shrink-0" />
                            <span>{fieldErrors.company[0]}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Primary Service Division *</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="Procurement & Shipping">Procurement &amp; Global Shipping</option>
                          <option value="Engineering & EPC Support">Engineering &amp; EPC Support Services</option>
                          <option value="Quality Control & Assurance">Quality Control (QA/QC &amp; NDT)</option>
                          <option value="Spare Parts Sourcing & MRO">Spare Parts Sourcing &amp; MRO</option>
                          <option value="Industrial Logistics">Industrial Logistics &amp; Shipping</option>
                          <option value="Renewables & Solar">Renewables &amp; Solar EPC Division</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Project Urgency / Timeline</label>
                        <select
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value="Standard (1-2 Days)">Standard (1-2 Days)</option>
                          <option value="Urgent Breakdown (< 24 Hours)">Urgent Breakdown (&lt; 24 Hours)</option>
                          <option value="Future Campaign (> 1 Month)">Future Campaign (&gt; 1 Month)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Scope Description / Specification Details *</label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Specify material grades, quantities, delivery destination port, or plant location..."
                        className={cn(
                          'form-control',
                          fieldErrors.message && 'border-ofs-red-500 focus:border-ofs-red-600 focus:ring-ofs-red-500/20'
                        )}
                        rows={4}
                      />
                      {fieldErrors.message && (
                        <p className="flex items-center gap-1 text-xs text-ofs-red-600 font-medium mt-1">
                          <AlertCircle size={12} className="shrink-0" />
                          <span>{fieldErrors.message[0]}</span>
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label flex items-center justify-between">
                        <span>Attach RFQ / Specification PDF</span>
                        <span className="text-[0.7rem] font-normal text-ofs-gray-500 lowercase font-sans">
                          (Optional, Max 10MB)
                        </span>
                      </label>

                      {!pdfFile ? (
                        <label className="relative border-2 border-dashed border-ofs-gray-300 hover:border-ofs-navy-700 bg-ofs-navy-50/50 hover:bg-ofs-navy-50 rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center justify-center text-center group">
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                          <div className="w-10 h-10 rounded-full bg-white border border-ofs-gray-200 flex items-center justify-center mb-2 text-ofs-navy-900 group-hover:scale-110 transition-transform shadow-xs">
                            <UploadCloud size={20} className="text-ofs-red-600" />
                          </div>
                          <p className="text-xs font-semibold text-ofs-navy-950 m-0">
                            <span className="text-ofs-red-600 hover:underline font-bold">Click to upload PDF</span> or drag &amp; drop
                          </p>
                          <p className="text-[0.725rem] text-ofs-gray-500 m-0 mt-1 font-mono">
                            BOQ, RFQ or Technical Specification (PDF up to 10MB)
                          </p>
                        </label>
                      ) : (
                        <div className="flex items-center justify-between p-3.5 bg-ofs-navy-50 border border-ofs-navy-200 rounded-lg shadow-xs">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-9 h-9 rounded bg-ofs-red-600 text-white flex items-center justify-center shrink-0">
                              <FileText size={18} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-ofs-navy-950 truncate m-0">
                                {pdfFile.name}
                              </p>
                              <p className="text-[0.72rem] text-ofs-gray-500 font-mono m-0">
                                {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to attach
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setPdfFile(null);
                              setPdfError('');
                            }}
                            className="p-1.5 rounded-full hover:bg-ofs-red-100 text-ofs-gray-500 hover:text-ofs-red-600 transition-colors cursor-pointer"
                            title="Remove attached PDF"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}

                      {pdfError && (
                        <p className="text-xs text-ofs-red-600 font-mono mt-1.5 flex items-center gap-1">
                          <AlertCircle size={13} /> {pdfError}
                        </p>
                      )}
                    </div>

                    {status.msg && (
                      <div className={cn(
                        'p-3.5 rounded text-[0.85rem] flex items-center gap-2',
                        status.state === 'success'
                          ? 'bg-ofs-green-50 text-ofs-green-700 border border-ofs-green-100'
                          : 'bg-ofs-red-50 text-ofs-red-700 border border-ofs-red-100'
                      )}>
                        {status.state === 'success' ? (
                          <CheckCircle2 size={18} className="shrink-0 text-ofs-green-600" />
                        ) : (
                          <AlertCircle size={18} className="shrink-0 text-ofs-red-600" />
                        )}
                        <span>{status.msg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status.state === 'loading'}
                      className="btn btn-primary btn-lg w-full cursor-pointer flex items-center justify-center gap-2"
                    >
                      {status.state === 'loading' ? 'Processing Enquiry...' : 'Submit General Enquiry'} <Send size={16} />
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
