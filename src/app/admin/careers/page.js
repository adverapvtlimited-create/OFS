'use client';

import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  Phone,
  Mail,
  Clock,
  FileText,
  Search,
  Trash2,
  CheckCircle2,
  Building,
  RefreshCw,
  User
} from 'lucide-react';
import { cn } from '@/lib/cn';

export default function CareersAdminPage() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/careers');
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch('/api/careers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setApplications(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        setActionMessage(`Candidate status updated to ${newStatus}`);
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job application?')) return;
    try {
      const res = await fetch(`/api/careers?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setApplications(prev => prev.filter(item => item.id !== id));
        setActionMessage('Application deleted.');
        setTimeout(() => setActionMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.currentCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-heading text-[1.75rem] font-extrabold text-ofs-navy-950 mb-1">
            Job Applications &amp; Candidate CVs ({applications.length})
          </h1>
          <p className="text-[0.875rem] text-ofs-gray-600 m-0">
            Talent acquisition portal for reviewing applicants across engineering and procurement roles.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={fetchApplications}
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
          {['ALL', 'UNDER_REVIEW', 'SHORTLISTED', 'REJECTED', 'HIRED'].map((st) => (
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
              {st} ({st === 'ALL' ? applications.length : applications.filter(a => a.status === st).length})
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-[280px]">
          <input
            type="text"
            placeholder="Search candidate name, role, email..."
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
          <p className="m-0 text-ofs-gray-600 text-[0.9rem]">Loading applications...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="p-16 px-8 text-center bg-white rounded-lg border border-ofs-gray-200 text-ofs-gray-500">
          <Briefcase size={36} className="text-ofs-gray-300 mx-auto mb-4" />
          <h3 className="font-heading text-ofs-navy-950 mb-1">
            {searchTerm ? 'No Applications Found' : 'No Candidate Applications Yet'}
          </h3>
          <p className="text-[0.875rem] m-0">
            {searchTerm ? 'Try adjusting your search query or status filter.' : 'When candidates apply to open roles on the Careers page, their profiles will appear here instantly.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filteredApplications.map((app) => {
            const statusBadgeClasses =
              app.status === 'UNDER_REVIEW' ? 'text-ofs-gold-600 bg-amber-50 border-amber-200' :
              app.status === 'SHORTLISTED' ? 'text-ofs-green-700 bg-ofs-green-50 border-ofs-green-200' :
              app.status === 'HIRED' ? 'text-ofs-navy-900 bg-ofs-navy-50 border-ofs-navy-200' : 'text-ofs-red-600 bg-ofs-red-50 border-ofs-red-200';

            return (
              <div
                key={app.id}
                className="bg-white border border-ofs-gray-200 rounded-lg p-8 shadow-sm"
              >
                <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-[0.8rem] font-extrabold text-ofs-navy-950">
                        {app.id}
                      </span>
                      <span className={cn('text-[0.72rem] font-mono py-0.5 px-2 rounded font-extrabold border', statusBadgeClasses)}>
                        {app.status}
                      </span>
                      <span className="text-xs text-ofs-gray-500 font-mono">
                        {new Date(app.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-extrabold text-ofs-navy-950 m-0">
                      {app.fullName}
                      <span className="font-semibold text-ofs-red-600 text-[0.95rem] ml-3">
                        Applied for: {app.jobTitle}
                      </span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className="font-mono text-[0.78rem] font-bold py-1.5 px-3 rounded border border-ofs-gray-300 bg-ofs-navy-50 text-ofs-navy-950 cursor-pointer"
                    >
                      <option value="UNDER_REVIEW">Status: UNDER REVIEW</option>
                      <option value="SHORTLISTED">Status: SHORTLISTED</option>
                      <option value="HIRED">Status: HIRED</option>
                      <option value="REJECTED">Status: REJECTED</option>
                    </select>

                    <button
                      onClick={() => handleDelete(app.id)}
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
                      Email Address
                    </div>
                    <a href={`mailto:${app.email}`} className="text-ofs-navy-950 font-bold flex items-center gap-1.5 hover:text-ofs-red-600 transition-colors">
                      <Mail size={14} className="text-ofs-red-600" /> {app.email}
                    </a>
                  </div>

                  <div>
                    <div className="text-ofs-gray-500 text-xs font-mono uppercase mb-1">
                      Phone
                    </div>
                    <a href={`tel:${app.phone}`} className="text-ofs-navy-950 font-bold flex items-center gap-1.5 hover:text-ofs-red-600 transition-colors">
                      <Phone size={14} className="text-ofs-red-600" /> {app.phone}
                    </a>
                  </div>

                  <div>
                    <div className="text-ofs-gray-500 text-xs font-mono uppercase mb-1">
                      Experience &amp; Current Company
                    </div>
                    <div className="text-ofs-navy-950 font-bold">
                      {app.experienceYears} • {app.currentCompany}
                    </div>
                  </div>

                  <div>
                    <div className="text-ofs-gray-500 text-xs font-mono uppercase mb-1">
                      Resume File
                    </div>
                    <div className="text-ofs-navy-900 font-bold flex items-center gap-1.5">
                      <FileText size={14} className="text-ofs-navy-700" /> {app.resumeName}
                    </div>
                  </div>
                </div>

                {app.coverNote && (
                  <div>
                    <div className="text-ofs-gray-500 text-xs font-mono uppercase mb-1.5">
                      Candidate Cover Note
                    </div>
                    <div className="bg-white border border-ofs-gray-200 rounded p-4 text-[0.925rem] text-ofs-gray-800 leading-relaxed">
                      {app.coverNote}
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
