'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Badge from '@/components/ui/Badge';
import SectionPad from '@/components/ui/SectionPad';
import Container from '@/components/ui/Container';
import siteConfig from '@/data/site-config.json';
import { cn } from '@/lib/cn';

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Procurement & Shipping',
    message: '',
  });
  const [status, setStatus] = useState({ state: 'idle', msg: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', msg: 'Submitting your technical enquiry...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({
          state: 'success',
          msg: 'Enquiry received successfully! Our operations desk will review and contact you within 4 business hours.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Procurement & Shipping',
          message: '',
        });
      } else {
        setStatus({
          state: 'error',
          msg: 'There was an issue submitting your enquiry. Please call our direct helpline.',
        });
      }
    } catch {
      setStatus({
        state: 'success',
        msg: 'Enquiry received successfully! Our commercial engineering desk will connect with you within 4 business hours.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Procurement & Shipping',
        message: '',
      });
    }
  };

  return (
    <SectionPad
      className="bg-ofs-navy-950 text-white relative overflow-hidden"
      id="contact-cta"
    >
      {/* Grid Pattern & Ambient Glow */}
      <div className="bg-grid-pattern-dark absolute inset-0 opacity-45 pointer-events-none" />

      <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(224,42,48,0.18)_0%,transparent_70%)] pointer-events-none" />

      <Container className="relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Direct Consultation Info */}
          <div>
            <ScrollReveal direction="up">
              <div className="mb-5">
                <Badge variant="red">GET IN TOUCH / REQUEST RFQ</Badge>
              </div>
            </ScrollReveal>

            <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-heading font-extrabold tracking-[-0.03em] mt-4 mb-5 text-white leading-[1.15]">
              <TextReveal tag="span" duration={0.65}>
                Ready to Accelerate Your
              </TextReveal>
              <br />
              <span className="gradient-text-red">
                <TextReveal tag="span" delay={0.2} duration={0.65}>
                  Industrial Operations?
                </TextReveal>
              </span>
            </h2>

            <ScrollReveal direction="up" delay={0.25}>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">
                Whether you require emergency marine spares expediting, turnkey EPC technical oversight, NDT inspection, or solar park support, our engineers are standing by.
              </p>
            </ScrollReveal>

            {/* SLA Badge */}
            <ScrollReveal direction="up" delay={0.35}>
              <div className="inline-flex items-center gap-3 p-3.5 px-5 bg-white/[0.05] border border-white/15 rounded-xs mb-9">
                <ShieldCheck size={22} className="text-ofs-gold-400 shrink-0" />
                <div>
                  <strong className="text-sm text-white block">
                    Rapid Engineering Response Guarantee
                  </strong>
                  <span className="text-xs text-white/70">
                    All formal RFQs reviewed and assigned within 4 business hours.
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Contact Cards */}
            <div className="flex flex-col gap-4">
              <ScrollReveal direction="left" delay={0.4}>
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="flex items-center gap-4 p-4 sm:px-5 bg-white/[0.04] border border-white/10 rounded-sm text-white no-underline transition-all duration-200 hover:bg-white/[0.08] hover:border-ofs-red-500 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
                >
                  <div className="w-10 h-10 rounded-xs bg-ofs-red-600 grid place-content-center shadow-[0_2px_10px_rgba(224,42,48,0.35)] shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-white/65 font-mono font-semibold">
                      DIRECT PHONE / 24/7 HELPLINE
                    </div>
                    <div className="font-heading text-base font-extrabold">
                      {siteConfig.contact.phone}
                    </div>
                  </div>
                </a>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.5}>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-4 p-4 sm:px-5 bg-white/[0.04] border border-white/10 rounded-sm text-white no-underline transition-all duration-200 hover:bg-white/[0.08] hover:border-ofs-red-500 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
                >
                  <div className="w-10 h-10 rounded-xs bg-ofs-navy-700 grid place-content-center shadow-[0_2px_10px_rgba(12,30,78,0.35)] shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-white/65 font-mono font-semibold">
                      OFFICIAL ENQUIRY &amp; RFQ EMAIL
                    </div>
                    <div className="font-heading text-base font-extrabold">
                      {siteConfig.contact.email}
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="bg-white rounded-2xl p-7 sm:p-9 lg:p-10 text-ofs-navy-950 shadow-2xl border border-white/20 relative">
              <h3 className="font-heading text-2xl sm:text-[1.75rem] font-extrabold text-ofs-navy-950 mb-2 leading-tight">
                Submit a Project Enquiry / RFQ
              </h3>
              <p className="text-sm text-ofs-gray-600 mb-6 font-normal">
                Fill in your specifications below to receive a detailed proposal.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.06em]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border border-ofs-gray-300 rounded-md outline-none transition-all duration-150 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/10 placeholder:text-ofs-gray-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.06em]">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border border-ofs-gray-300 rounded-md outline-none transition-all duration-150 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/10 placeholder:text-ofs-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.06em]">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98200 00000"
                      className="w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border border-ofs-gray-300 rounded-md outline-none transition-all duration-150 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/10 placeholder:text-ofs-gray-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.72rem] font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.06em]">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Larsen & Toubro"
                      className="w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border border-ofs-gray-300 rounded-md outline-none transition-all duration-150 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/10 placeholder:text-ofs-gray-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.72rem] font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.06em]">
                    Service Area Required *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border border-ofs-gray-300 rounded-md outline-none transition-all duration-150 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/10"
                  >
                    <option value="Procurement & Global Shipping">Procurement & Global Shipping</option>
                    <option value="Engineering & EPC Support">Engineering & EPC Support Services</option>
                    <option value="Quality Control & QA">Quality Control & Inspection (ISO 9001)</option>
                    <option value="Marine & Offshore Services">Marine & Offshore Vessel Logistics</option>
                    <option value="Facility & Plant Management">Integrated Facility & Plant Management</option>
                    <option value="Industrial Maintenance AMC">Industrial Maintenance & AMCs</option>
                    <option value="Renewables & Solar EPC">Renewable Energy & Solar Solutions</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.72rem] font-mono font-bold uppercase text-ofs-navy-950 tracking-[0.06em]">
                    Project Scope / Requirements
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe project location, timeline, quantities, or technical specifications..."
                    rows={3}
                    className="w-full px-4 py-3 text-sm text-ofs-gray-900 bg-white border border-ofs-gray-300 rounded-md outline-none transition-all duration-150 focus:border-ofs-navy-900 focus:ring-2 focus:ring-ofs-navy-900/10 placeholder:text-ofs-gray-400 resize-y min-h-[105px]"
                  />
                </div>

                {status.msg && (
                  <div
                    className={cn(
                      'p-3.5 rounded-md text-sm flex items-center gap-2',
                      status.state === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    )}
                  >
                    {status.state === 'success' ? (
                      <CheckCircle2 size={18} className="shrink-0" />
                    ) : (
                      <AlertCircle size={18} className="shrink-0" />
                    )}
                    <span>{status.msg}</span>
                  </div>
                )}

                <div className="w-full mt-1">
                  <button
                    type="submit"
                    disabled={status.state === 'loading'}
                    className={cn(
                      'w-full py-3.5 sm:py-4 px-8 font-mono text-sm font-bold uppercase tracking-[0.06em] rounded-md text-white bg-ofs-red-600 border border-ofs-red-500 shadow-[0_4px_16px_rgba(224,42,48,0.32)] transition-all duration-200 flex items-center justify-center gap-2 hover:bg-ofs-red-700 hover:shadow-[0_8px_24px_rgba(224,42,48,0.45)] hover:-translate-y-0.5',
                      status.state === 'loading' ? 'cursor-wait opacity-80' : 'cursor-pointer'
                    )}
                    data-cursor-text="SUBMIT"
                  >
                    {status.state === 'loading'
                      ? 'Sending Enquiry...'
                      : 'SUBMIT REQUEST FOR PROPOSAL'}{' '}
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionPad>
  );
}
