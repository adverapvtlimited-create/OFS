'use client';

import React, { useEffect, useState } from 'react';
import { MessageSquare, Phone, Mail, Clock, ShieldCheck, Search, Filter } from 'lucide-react';

export default function EnquiriesAdminPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contact')
      .then((r) => r.json())
      .then((data) => {
        setEnquiries(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.service?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.25rem' }}>
            Client RFQs & Project Inquiries
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--ofs-gray-600)', margin: 0 }}>
            Review, filter, and track technical enquiries submitted across the website.
          </p>
        </div>

        {/* Search Filter */}
        <div style={{ position: 'relative', width: '280px' }}>
          <input
            type="text"
            placeholder="Search by name, company, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '2.5rem', fontSize: '0.85rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ofs-gray-400)' }} />
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-md)' }}>
          Loading enquiries...
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--ofs-gray-200)', color: 'var(--ofs-gray-500)' }}>
          {searchTerm ? 'No matching enquiries found for your search.' : 'No enquiries received yet. Submissions will appear here instantly.'}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              style={{
                background: 'var(--ofs-white)',
                border: '1px solid var(--ofs-gray-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--ofs-red-600)' }}>
                      {enq.id}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--ofs-gray-500)', fontFamily: 'var(--font-mono)' }}>
                      {new Date(enq.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ofs-navy-950)', margin: 0 }}>
                    {enq.name} <span style={{ fontWeight: 400, color: 'var(--ofs-gray-500)', fontSize: '1rem' }}>— {enq.company}</span>
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--ofs-navy-50)',
                    color: 'var(--ofs-navy-900)',
                    fontWeight: 700
                  }}>
                    {enq.service}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-xs)',
                    background: enq.urgency?.includes('Urgent') ? 'var(--ofs-red-50)' : 'var(--ofs-gray-100)',
                    color: enq.urgency?.includes('Urgent') ? 'var(--ofs-red-700)' : 'var(--ofs-gray-700)',
                    fontWeight: 700
                  }}>
                    {enq.urgency}
                  </span>
                </div>
              </div>

              {/* Message Box */}
              <div style={{
                background: 'var(--ofs-gray-50)',
                borderRadius: 'var(--radius-xs)',
                padding: '1rem',
                fontSize: '0.9rem',
                color: 'var(--ofs-gray-800)',
                lineHeight: 1.5,
                marginBottom: '1rem',
                border: '1px solid var(--ofs-gray-200)'
              }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ofs-gray-500)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Requirement Specifications:
                </div>
                {enq.message || 'No additional message provided.'}
              </div>

              {/* Direct Actions */}
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--ofs-gray-700)', fontFamily: 'var(--font-mono)', flexWrap: 'wrap' }}>
                <a href={`tel:${enq.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--ofs-navy-900)', fontWeight: 600 }}>
                  <Phone size={14} style={{ color: 'var(--ofs-red-600)' }} /> Call: {enq.phone}
                </a>
                <a href={`mailto:${enq.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--ofs-navy-900)', fontWeight: 600 }}>
                  <Mail size={14} style={{ color: 'var(--ofs-red-600)' }} /> Email: {enq.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
