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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Procurement & Shipping',
    urgency: 'Standard (1-2 Days)',
    message: ''
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState('');
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setPdfError('Please upload a valid PDF document (.pdf)');
      setPdfFile(null);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setPdfError('PDF file size must be less than 10MB');
      setPdfFile(null);
      return;
    }
    setPdfError('');
    setPdfFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: 'Submitting your formal enquiry...' });

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('company', formData.company);
      payload.append('service', formData.service);
      payload.append('urgency', formData.urgency);
      payload.append('message', formData.message);
      payload.append('formType', 'general');
      if (pdfFile) {
        payload.append('file', pdfFile);
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: payload
      });

      if (res.ok) {
        setStatus({
          state: 'success',
          msg: 'Thank you! Your enquiry and attached specifications have been routed to our commercial desk. We will respond within 4 business hours.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Procurement & Shipping',
          urgency: 'Standard (1-2 Days)',
          message: ''
        });
        setPdfFile(null);
        setPdfError('');
      } else {
        const errData = await res.json().catch(() => ({}));
        setStatus({
          state: 'error',
          msg: errData.error || 'Failed to submit enquiry. Please try again.'
        });
      }
    } catch (err) {
      setStatus({
        state: 'error',
        msg: err.message || 'Unable to connect to the server. Please check your connection and try again.'
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

          <ScrollReveal direction="up" delay={0.1}>
            <div className="tag-badge badge-red mb-5">
              CONNECT WITH OFS GROUP INDIA
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.1] text-white mb-6 max-w-[920px]">
            <TextReveal tag="span" duration={0.65}>
              Let's Discuss Your Next
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Project or General Enquiry
              </TextReveal>
            </span>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-[1.18rem] text-white/85 max-w-[780px] leading-relaxed mb-8">
              Connect directly with our corporate headquarters in Mumbai or our global liaison desk in Florida, USA.
            </p>
          </ScrollReveal>

          {/* Above-the-fold Direct Contact Channels */}
          <ScrollReveal direction="up" delay={0.35}>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center gap-2.5 py-2.5 px-5 rounded-md bg-white text-ofs-navy-950 font-heading font-extrabold text-sm shadow-lg hover:bg-ofs-gold-300 transition-colors no-underline"
              >
                <Phone size={15} className="text-ofs-red-600" /> {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2.5 py-2.5 px-5 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-semibold backdrop-blur-md transition-colors no-underline"
              >
                <Mail size={15} className="text-ofs-red-400" /> {siteConfig.contact.email}
              </a>
              <a
                href="#rfq-form"
                className="inline-flex items-center gap-2 py-2.5 px-5 rounded-md bg-ofs-red-600 hover:bg-ofs-red-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(224,42,48,0.4)] transition-all no-underline"
              >
                Quick RFQ Form ↓
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[4.5rem]">
            <div>
              <ScrollReveal direction="left" delay={0.1}>
                <div className="tag-badge badge-red mb-4">
                  CORPORATE PRESENCE
                </div>

                <h2 className="section-title mb-6">
                  Our Locations &amp; <br />
                  <span className="gradient-text-navy">Direct Contact Channels</span>
                </h2>

                <div className="bg-ofs-navy-50/50 border border-ofs-navy-100 rounded-lg p-9 mb-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe2 size={22} className="text-ofs-navy-700 shrink-0" />
                    <h3 className="font-heading text-xl font-extrabold text-ofs-navy-950 m-0">
                      Oriented Facility Solution LLC
                    </h3>
                  </div>
                  <p className="text-[0.925rem] text-ofs-gray-700 leading-relaxed mb-5">
                    {siteConfig.contact.addressUSA.line1}, {siteConfig.contact.addressUSA.city}, {siteConfig.contact.addressUSA.state}, {siteConfig.contact.addressUSA.pincode}, {siteConfig.contact.addressUSA.country}
                  </p>
                  <div className="text-[0.85rem] text-ofs-navy-950 font-mono">
                    Global AVL Procurement &amp; International Cargo Coordination Desk
                  </div>
                </div>

                <div className="bg-ofs-navy-50/50 border border-ofs-navy-100 rounded-lg p-9 mb-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Building size={22} className="text-ofs-red-600 shrink-0" />
                    <h3 className="font-heading text-xl font-extrabold text-ofs-navy-950 m-0">
                      Oriented Facility Solution Pvt Ltd
                    </h3>
                  </div>
                  <p className="text-[0.925rem] text-ofs-gray-700 leading-relaxed mb-5">
                    {siteConfig.contact.addressIndia.line1}, {siteConfig.contact.addressIndia.line2}, {siteConfig.contact.addressIndia.city}, {siteConfig.contact.addressIndia.state} – {siteConfig.contact.addressIndia.pincode}, {siteConfig.contact.addressIndia.country}
                  </p>
                  <div className="flex flex-col gap-2 text-sm text-ofs-navy-950 font-mono">
                    <a href={`tel:${siteConfig.contact.phoneRaw}`} className="inline-flex items-center gap-2 hover:text-ofs-red-600 transition-colors">
                      <Phone size={15} className="text-ofs-red-600 shrink-0" /> {siteConfig.contact.phone}
                    </a>
                    <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-2 hover:text-ofs-red-600 transition-colors">
                      <Mail size={15} className="text-ofs-red-600 shrink-0" /> {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Response SLA Note */}
                <div className="p-[1.35rem] rounded bg-ofs-navy-950 text-white flex items-center gap-3.5">
                  <ShieldCheck size={26} className="text-ofs-gold-400 shrink-0" />
                  <div className="text-[0.85rem] leading-snug">
                    <strong className="text-white block">ISO 9001:2015 Service Standard</strong>
                    Technical and business enquiries are reviewed and assigned within 4 business hours.
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal direction="right" delay={0.2}>
                <div id="rfq-form" className="bg-white border border-ofs-gray-200 rounded-2xl p-6 sm:p-9 lg:p-[3.25rem] shadow-xl scroll-mt-24">
                  {/* Form Type */}
                  <div className="flex gap-2 mb-8 border-b border-ofs-gray-200 pb-4">
                    <div className="font-mono text-[0.825rem] font-bold uppercase py-2.5 px-4 rounded bg-ofs-navy-900 text-white shadow-sm">
                      General Enquiry
                    </div>
                  </div>

                  <h3 className="font-heading text-[1.4rem] font-extrabold text-ofs-navy-950 mb-2">
                    Send a General Business Enquiry
                  </h3>
                  <p className="text-[0.875rem] text-ofs-gray-500 mb-7">
                    Please fill in your details below and our team will get back to you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
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
                          className="form-control"
                        />
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
                          className="form-control"
                        />
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
                          className="form-control"
                        />
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
                        className="form-control"
                        rows={4}
                      />
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
                        <CheckCircle2 size={18} className="shrink-0" />
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
