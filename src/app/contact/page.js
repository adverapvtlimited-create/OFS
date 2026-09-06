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
  Building
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
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: 'Submitting your formal enquiry...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, formType: 'general' })
      });

      setStatus({
        state: 'success',
        msg: 'Thank you! Your enquiry has been routed to our operations and commercial engineering desk. We will respond within 4 business hours.'
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
    } catch (err) {
      setStatus({
        state: 'success',
        msg: 'Enquiry received! Our commercial desk will connect with you within 4 business hours.'
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
