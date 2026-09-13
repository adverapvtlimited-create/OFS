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
  ExternalLink,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/cn';

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
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-[1.75rem] font-extrabold text-ofs-navy-950 mb-1">
            Client RFQs &amp; Project Inquiries ({enquiries.length})
          </h1>
          <p className="text-[0.875rem] text-ofs-gray-600 m-0">
            Real-time inquiries and quotation requests submitted through the live website.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={fetchEnquiries}
            className="btn btn-outline py-2 px-3.5 text-[0.8rem] flex items-center gap-1.5 bg-white cursor-pointer"
          >
            <RefreshCw size={14} /> Refresh Data
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 px-4 bg-ofs-green-50 border border-ofs-green-200 text-ofs-green-800 rounded text-[0.85rem] mb-6 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{actionMessage}</span>
        </div>
      )}

      <div className="bg-white p-5 px-6 rounded-lg border border-ofs-gray-200 mb-6 flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-1.5 flex-wrap">
          {['ALL', 'NEW', 'CONTACTED', 'IN_REVIEW', 'ARCHIVED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'font-mono text-xs font-bold py-1.5 px-3.5 rounded cursor-pointer transition-all duration-200 border',
                statusFilter === st
                  ? 'bg-ofs-navy-950 text-white border-ofs-navy-950'
                  : 'bg-ofs-navy-50 text-ofs-gray-700 border-ofs-navy-100 hover:bg-ofs-navy-100'
              )}
            >
              {st} ({st === 'ALL' ? enquiries.length : enquiries.filter(e => e.status === st).length})
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-[280px]">
          <input
            type="text"
            placeholder="Search by name, company, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control pl-10 text-[0.85rem]"
          />
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ofs-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center bg-white rounded-lg border border-ofs-gray-200">
          <RefreshCw size={24} className="animate-spin text-ofs-red-600 mx-auto mb-2" />
          <p className="m-0 text-ofs-gray-600 text-[0.9rem]">Loading inquiry database...</p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="p-16 px-8 text-center bg-white rounded-lg border border-ofs-gray-200 text-ofs-gray-500">
          <MessageSquare size={36} className="text-ofs-gray-300 mx-auto mb-4" />
          <h3 className="font-heading text-ofs-navy-950 mb-1">
            {searchTerm ? 'No Inquiries Found' : 'No Submissions Yet'}
          </h3>
          <p className="text-[0.875rem] m-0">
            {searchTerm ? 'Try adjusting your search criteria or filter status.' : 'All RFQ and contact form submissions from live users will automatically appear here.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filteredEnquiries.map((enq) => {
            const statusBadgeClasses =
              enq.status === 'NEW' ? 'text-ofs-red-600 bg-ofs-red-50 border-ofs-red-200' :
              enq.status === 'CONTACTED' ? 'text-ofs-green-700 bg-ofs-green-50 border-ofs-green-200' :
              enq.status === 'IN_REVIEW' ? 'text-ofs-gold-600 bg-amber-50 border-amber-200' : 'text-ofs-gray-500 bg-ofs-gray-100 border-ofs-gray-200';

            return (
              <div
                key={enq.id}
                className="bg-white border border-ofs-gray-200 rounded-lg p-8 shadow-sm relative"
              >
                <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-[0.8rem] font-extrabold text-ofs-navy-950">
                        {enq.id}
                      </span>
                      <span className={cn('text-[0.72rem] font-mono py-0.5 px-2 rounded font-extrabold border', statusBadgeClasses)}>
                        {enq.status}
                      </span>
                      <span className="text-xs text-ofs-gray-500 font-mono">
                        {new Date(enq.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-extrabold text-ofs-navy-950 m-0">
                      {enq.name}
                      {enq.company && enq.company !== 'Not Specified' && (
                        <span className="font-medium text-ofs-gray-600 text-base ml-2">
                          — {enq.company}
                        </span>
                      )}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      className="font-mono text-[0.78rem] font-bold py-1.5 px-3 rounded border border-ofs-gray-300 bg-ofs-navy-50 text-ofs-navy-950 cursor-pointer"
                    >
                      <option value="NEW">Status: NEW</option>
                      <option value="IN_REVIEW">Status: IN REVIEW</option>
                      <option value="CONTACTED">Status: CONTACTED</option>
                      <option value="ARCHIVED">Status: ARCHIVED</option>
                    </select>

                    <button
                      onClick={() => handleDelete(enq.id)}
                      title="Delete record"
                      className="bg-transparent border border-ofs-red-200 text-ofs-red-600 py-1.5 px-2.5 rounded cursor-pointer flex items-center justify-center hover:bg-ofs-red-50 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-ofs-navy-50/70 rounded p-5 mb-5 text-[0.85rem]">
                  <div>
                    <div className="text-ofs-gray-500 text-xs font-mono uppercase mb-1">
                      Official Email
                    </div>
                    <a href={`mailto:${enq.email}`} className="text-ofs-navy-950 font-bold flex items-center gap-1.5 hover:text-ofs-red-600 transition-colors">
                      <Mail size={14} className="text-ofs-red-600" /> {enq.email}
                    </a>
                  </div>

                  <div>
                    <div className="text-ofs-gray-500 text-xs font-mono uppercase mb-1">
                      Phone / WhatsApp
                    </div>
                    <a href={`tel:${enq.phone}`} className="text-ofs-navy-950 font-bold flex items-center gap-1.5 hover:text-ofs-red-600 transition-colors">
                      <Phone size={14} className="text-ofs-red-600" /> {enq.phone}
                    </a>
                  </div>

                  <div>
                    <div className="text-ofs-gray-500 text-xs font-mono uppercase mb-1">
                      Service Division
                    </div>
                    <div className="text-ofs-navy-950 font-bold">
                      {enq.service}
                    </div>
                  </div>

                  <div>
                    <div className="text-ofs-gray-500 text-xs font-mono uppercase mb-1">
                      Urgency / Timeline
                    </div>
                    <div className={cn(
                      'font-bold',
                      enq.urgency?.includes('Urgent') ? 'text-ofs-red-600' : 'text-ofs-navy-950'
                    )}>
                      {enq.urgency}
                    </div>
                  </div>
                </div>

                {enq.message && (
                  <div className="mb-4">
                    <div className="text-ofs-gray-500 text-xs font-mono uppercase mb-1.5">
                      Scope &amp; Material Specifications
                    </div>
                    <div className="bg-white border border-ofs-gray-200 rounded p-4 text-[0.925rem] text-ofs-gray-800 leading-relaxed whitespace-pre-wrap">
                      {enq.message}
                    </div>
                  </div>
                )}

                {enq.pdfUrl && (
                  <div className="mt-4 pt-3 border-t border-ofs-gray-100 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-ofs-red-50 text-ofs-red-600 rounded">
                        <FileText size={16} />
                      </div>
                      <span className="text-xs font-mono font-bold text-ofs-navy-950">
                        Attached PDF: {enq.pdfName || 'RFQ_Specification.pdf'}
                      </span>
                      {enq.pdfSize && (
                        <span className="text-xs text-ofs-gray-500 font-mono">
                          ({(enq.pdfSize / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      )}
                    </div>

                    <a
                      href={enq.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ofs-red-600 hover:text-ofs-red-700 bg-ofs-red-50 hover:bg-ofs-red-100 py-1.5 px-3 rounded border border-ofs-red-200 transition-colors no-underline"
                    >
                      View / Download PDF <ExternalLink size={13} />
                    </a>
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
