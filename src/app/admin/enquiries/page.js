'use client';

import React, { useEffect, useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Building,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function EnquiriesAdminPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setEnquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        setActionMessage(`Status updated to ${newStatus}`);
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      const res = await fetch(`/api/contact?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setEnquiries(prev => prev.filter(item => item.id !== id));
        setActionMessage('Enquiry record deleted.');
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch = 
      e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.25rem' }}>
            Client RFQs &amp; Project Inquiries ({enquiries.length})
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--ofs-gray-600)', margin: 0 }}>
            Real-time inquiries and quotation requests submitted through the live website.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            onClick={fetchEnquiries}
            className="btn btn-outline"
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#fff', cursor: 'pointer' }}
          >
            <RefreshCw size={14} /> Refresh Data
          </button>
        </div>
      </div>

      {actionMessage && (
        <div style={{
          padding: '0.75rem 1rem',
          background: 'var(--ofs-green-50)',
          border: '1px solid var(--ofs-green-200)',
          color: 'var(--ofs-green-800)',
          borderRadius: 'var(--radius-xs)',
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={16} />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div style={{
        background: 'var(--ofs-white)',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--ofs-gray-200)',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['ALL', 'NEW', 'CONTACTED', 'IN_REVIEW', 'ARCHIVED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                background: statusFilter === st ? 'var(--ofs-navy-950)' : 'var(--ofs-navy-50)',
                color: statusFilter === st ? '#fff' : 'var(--ofs-gray-700)',
                border: '1px solid var(--ofs-navy-100)',
                transition: 'all 0.2s ease'
              }}
            >
              {st} ({st === 'ALL' ? enquiries.length : enquiries.filter(e => e.status === st).length})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '280px' }}>
          <input
            type="text"
            placeholder="Search by name, company, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ paddingLeft: '2.5rem', fontSize: '0.85rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ofs-gray-400)' }} />
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--ofs-gray-200)' }}>
          <RefreshCw size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--ofs-red-600)', margin: '0 auto 0.5rem auto' }} />
          <p style={{ margin: 0, color: 'var(--ofs-gray-600)', fontSize: '0.9rem' }}>Loading inquiry database...</p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--ofs-gray-200)', color: 'var(--ofs-gray-500)' }}>
          <MessageSquare size={36} style={{ color: 'var(--ofs-gray-300)', margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--ofs-navy-950)', marginBottom: '0.35rem' }}>
            {searchTerm ? 'No Inquiries Found' : 'No Submissions Yet'}
          </h3>
          <p style={{ fontSize: '0.875rem', margin: 0 }}>
            {searchTerm ? 'Try adjusting your search criteria or filter status.' : 'All RFQ and contact form submissions from live users will automatically appear here.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredEnquiries.map((enq) => {
            const statusColor = 
              enq.status === 'NEW' ? 'var(--ofs-red-600)' :
              enq.status === 'CONTACTED' ? 'var(--ofs-green-700)' :
              enq.status === 'IN_REVIEW' ? 'var(--ofs-gold-600)' : 'var(--ofs-gray-500)';

            return (
              <div
                key={enq.id}
                style={{
                  background: 'var(--ofs-white)',
                  border: '1px solid var(--ofs-gray-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--ofs-navy-950)' }}>
                        {enq.id}
                      </span>
                      <span style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: 'var(--radius-xs)',
                        background: enq.status === 'NEW' ? 'var(--ofs-red-50)' : 'var(--ofs-green-50)',
                        color: statusColor,
                        fontWeight: 800,
                        border: `1px solid ${statusColor}33`
                      }}>
                        {enq.status}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--ofs-gray-500)', fontFamily: 'var(--font-mono)' }}>
                        {new Date(enq.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--ofs-navy-950)', margin: 0 }}>
                      {enq.name}
                      {enq.company && enq.company !== 'Not Specified' && (
                        <span style={{ fontWeight: 500, color: 'var(--ofs-gray-600)', fontSize: '1rem', marginLeft: '0.5rem' }}>
                          — {enq.company}
                        </span>
                      )}
                    </h3>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        padding: '0.4rem 0.75rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--ofs-gray-300)',
                        background: 'var(--ofs-navy-50)',
                        color: 'var(--ofs-navy-950)',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="NEW">Status: NEW</option>
                      <option value="IN_REVIEW">Status: IN REVIEW</option>
                      <option value="CONTACTED">Status: CONTACTED</option>
                      <option value="ARCHIVED">Status: ARCHIVED</option>
                    </select>

                    <button
                      onClick={() => handleDelete(enq.id)}
                      title="Delete record"
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--ofs-red-200)',
                        color: 'var(--ofs-red-600)',
                        padding: '0.4rem 0.65rem',
                        borderRadius: 'var(--radius-xs)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Scope & Contact Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
                  gap: '1rem',
                  background: 'var(--ofs-navy-50)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.25rem',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem'
                }}>
                  <div>
                    <div style={{ color: 'var(--ofs-gray-500)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      Official Email
                    </div>
                    <a href={`mailto:${enq.email}`} style={{ color: 'var(--ofs-navy-950)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}>
                      <Mail size={14} style={{ color: 'var(--ofs-red-600)' }} /> {enq.email}
                    </a>
                  </div>

                  <div>
                    <div style={{ color: 'var(--ofs-gray-500)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      Phone / WhatsApp
                    </div>
                    <a href={`tel:${enq.phone}`} style={{ color: 'var(--ofs-navy-950)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}>
                      <Phone size={14} style={{ color: 'var(--ofs-red-600)' }} /> {enq.phone}
                    </a>
                  </div>

                  <div>
                    <div style={{ color: 'var(--ofs-gray-500)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      Service Division
                    </div>
                    <div style={{ color: 'var(--ofs-navy-950)', fontWeight: 700 }}>
                      {enq.service}
                    </div>
                  </div>

                  <div>
                    <div style={{ color: 'var(--ofs-gray-500)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      Urgency / Timeline
                    </div>
                    <div style={{ color: enq.urgency?.includes('Urgent') ? 'var(--ofs-red-600)' : 'var(--ofs-navy-950)', fontWeight: 700 }}>
                      {enq.urgency}
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                {enq.message && (
                  <div>
                    <div style={{ color: 'var(--ofs-gray-500)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      Scope &amp; Material Specifications
                    </div>
                    <div style={{
                      background: 'var(--ofs-white)',
                      border: '1px solid var(--ofs-gray-200)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '1rem',
                      fontSize: '0.925rem',
                      color: 'var(--ofs-gray-800)',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {enq.message}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
