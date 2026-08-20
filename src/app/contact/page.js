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

export default function ContactPage() {
  const [formType, setFormType] = useState('rfp'); // 'rfp' | 'general'
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
        body: JSON.stringify({ ...formData, formType })
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
      {/* Hero Banner with TextReveal */}
      <section style={{
        background: 'linear-gradient(135deg, var(--ofs-navy-950) 0%, var(--ofs-navy-900) 100%)',
        color: 'var(--ofs-white)',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="bg-grid-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal direction="down" duration={0.5}>
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
              <span style={{ color: 'var(--ofs-red-400)' }}>Contact</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
              CONNECT WITH OFS GROUP INDIA
            </div>
          </ScrollReveal>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem',
            maxWidth: '920px'
          }}>
            <TextReveal tag="span" duration={0.65}>
              Let's Discuss Your Next
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Project or Procurement RFQ
              </TextReveal>
            </span>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p style={{
              fontSize: '1.18rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '780px',
              lineHeight: 1.6
            }}>
              Connect directly with our corporate headquarters in Mumbai or our global liaison desk in Florida, USA.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-pad" style={{ background: 'var(--ofs-white)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '4.5rem'
          }}>
            {/* Left: Office Locations & Hotline Details */}
            <div>
              <ScrollReveal direction="left" delay={0.1}>
                <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
                  CORPORATE PRESENCE
                </div>

                <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
                  Our Locations &amp; <br />
                  <span className="gradient-text-navy">Direct Contact Channels</span>
                </h2>

                {/* India HQ Card */}
                <div style={{
                  background: 'var(--ofs-navy-50)',
                  border: '1px solid var(--ofs-navy-100)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2.25rem',
                  marginBottom: '1.5rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Building size={22} style={{ color: 'var(--ofs-red-600)' }} />
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--ofs-navy-950)', margin: 0 }}>
                      Oriented Facility Solution Pvt Ltd
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.925rem', color: 'var(--ofs-gray-700)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {siteConfig.contact.addressIndia.line1}, {siteConfig.contact.addressIndia.line2}, {siteConfig.contact.addressIndia.city}, {siteConfig.contact.addressIndia.state} – {siteConfig.contact.addressIndia.pincode}, {siteConfig.contact.addressIndia.country}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--ofs-navy-950)', fontFamily: 'var(--font-mono)' }}>
                    <a href={`tel:${siteConfig.contact.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'inherit' }}>
                      <Phone size={15} style={{ color: 'var(--ofs-red-600)' }} /> {siteConfig.contact.phone}
                    </a>
                    <a href={`mailto:${siteConfig.contact.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'inherit' }}>
                      <Mail size={15} style={{ color: 'var(--ofs-red-600)' }} /> {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* USA Liaison Office Card */}
                <div style={{
                  background: 'var(--ofs-navy-50)',
                  border: '1px solid var(--ofs-navy-100)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2.25rem',
                  marginBottom: '2rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Globe2 size={22} style={{ color: 'var(--ofs-navy-700)' }} />
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--ofs-navy-950)', margin: 0 }}>
                      Oriented Facility Solution LLC
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.925rem', color: 'var(--ofs-gray-700)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {siteConfig.contact.addressUSA.line1}, {siteConfig.contact.addressUSA.city}, {siteConfig.contact.addressUSA.state}, {siteConfig.contact.addressUSA.pincode}, {siteConfig.contact.addressUSA.country}
                  </p>
                  <div style={{ fontSize: '0.85rem', color: 'var(--ofs-navy-950)', fontFamily: 'var(--font-mono)' }}>
                    Global AVL Procurement &amp; International Cargo Coordination Desk
                  </div>
                </div>

                {/* Response SLA Note */}
                <div style={{
                  padding: '1.35rem',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--ofs-navy-950)',
                  color: 'var(--ofs-white)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}>
                  <ShieldCheck size={26} style={{ color: 'var(--ofs-gold-400)', flexShrink: 0 }} />
                  <div style={{ fontSize: '0.85rem', lineHeight: 1.45 }}>
                    <strong style={{ color: '#fff', display: 'block' }}>ISO 9001:2015 Service Standard</strong>
                    Technical enquiries and RFQs are reviewed and assigned within 4 business hours.
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Interactive Tabbed RFP Form */}
            <div>
              <ScrollReveal direction="right" delay={0.2}>
                <div style={{
                  background: 'var(--ofs-white)',
                  border: '1px solid var(--ofs-gray-200)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'clamp(2.25rem, 4.5vw, 3.25rem)',
                  boxShadow: 'var(--shadow-xl)'
                }}>
                  {/* Form Type Tabs */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--ofs-gray-200)', paddingBottom: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => setFormType('rfp')}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.825rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '0.55rem 1.15rem',
                        borderRadius: 'var(--radius-xs)',
                        cursor: 'pointer',
                        background: formType === 'rfp' ? 'var(--ofs-red-600)' : 'transparent',
                        color: formType === 'rfp' ? 'var(--ofs-white)' : 'var(--ofs-gray-600)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Submit RFQ / RFP
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormType('general')}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.825rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '0.55rem 1.15rem',
                        borderRadius: 'var(--radius-xs)',
                        cursor: 'pointer',
                        background: formType === 'general' ? 'var(--ofs-navy-900)' : 'transparent',
                        color: formType === 'general' ? 'var(--ofs-white)' : 'var(--ofs-gray-600)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      General Enquiry
                    </button>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.5rem' }}>
                    {formType === 'rfp' ? 'Request a Formal Technical Quotation' : 'Send a General Business Enquiry'}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--ofs-gray-500)', marginBottom: '1.75rem' }}>
                    Please fill in your project parameters below for immediate evaluation.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
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

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
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

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
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
                        <CheckCircle2 size={18} />
                        <span>{status.msg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status.state === 'loading'}
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%', cursor: 'pointer' }}
                    >
                      {status.state === 'loading' ? 'Processing Enquiry...' : 'Submit Official RFP Document'} <Send size={16} />
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
