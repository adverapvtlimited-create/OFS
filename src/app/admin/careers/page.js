'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase, User, Mail, Phone, Clock, FileText, CheckCircle2, Search } from 'lucide-react';
import jobsData from '@/data/jobs.json';

export default function CareersAdminPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'openings'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/careers')
      .then((r) => r.json())
      .then((data) => {
        setApplications(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.25rem' }}>
            Talent Acquisition & Careers Management
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--ofs-gray-600)', margin: 0 }}>
            Manage candidate submissions and active corporate job requisitions.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--ofs-white)', padding: '0.35rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--ofs-gray-200)' }}>
          <button
            onClick={() => setActiveTab('applications')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'applications' ? 'var(--ofs-navy-950)' : 'transparent',
              color: activeTab === 'applications' ? '#fff' : 'var(--ofs-gray-600)'
            }}
          >
            Candidate Submissions ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('openings')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'openings' ? 'var(--ofs-navy-950)' : 'transparent',
              color: activeTab === 'openings' ? '#fff' : 'var(--ofs-gray-600)'
            }}
          >
            Active Job Openings ({jobsData.length})
          </button>
        </div>
      </div>

      {activeTab === 'applications' ? (
        loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-md)' }}>Loading applications...</div>
        ) : applications.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--ofs-gray-200)', color: 'var(--ofs-gray-500)' }}>
            No job applications received yet. Submissions from the careers application forms will appear here instantly.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {applications.map((app) => (
              <div
                key={app.id}
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
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--ofs-navy-900)' }}>
                        {app.id}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--ofs-gray-500)', fontFamily: 'var(--font-mono)' }}>
                        {new Date(app.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ofs-navy-950)', margin: 0 }}>
                      {app.fullName}
                    </h3>
                  </div>

                  <span style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    background: 'var(--ofs-navy-50)',
                    color: 'var(--ofs-navy-950)',
                    fontWeight: 700
                  }}>
                    Role: {app.jobTitle}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--ofs-gray-700)' }}>
                  <div><strong>Experience:</strong> {app.experienceYears}</div>
                  <div><strong>Current Employer:</strong> {app.currentCompany}</div>
                  <div><strong>Resume File:</strong> <span style={{ color: 'var(--ofs-red-600)', fontFamily: 'var(--font-mono)' }}>{app.resumeName}</span></div>
                </div>

                {app.coverNote && (
                  <div style={{ background: 'var(--ofs-gray-50)', padding: '0.85rem', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem', color: 'var(--ofs-gray-800)', marginBottom: '1rem', border: '1px solid var(--ofs-gray-200)' }}>
                    <strong>Candidate Note:</strong> {app.coverNote}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--ofs-navy-900)', fontFamily: 'var(--font-mono)' }}>
                  <a href={`tel:${app.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'inherit' }}>
                    <Phone size={14} style={{ color: 'var(--ofs-red-600)' }} /> {app.phone}
                  </a>
                  <a href={`mailto:${app.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'inherit' }}>
                    <Mail size={14} style={{ color: 'var(--ofs-red-600)' }} /> {app.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {jobsData.map((job) => (
            <div
              key={job.id}
              style={{
                background: 'var(--ofs-white)',
                border: '1px solid var(--ofs-gray-200)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ofs-red-600)', marginBottom: '0.25rem' }}>
                  {job.department}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ofs-navy-950)', margin: '0 0 0.35rem 0' }}>
                  {job.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--ofs-gray-500)', fontFamily: 'var(--font-mono)' }}>
                  Location: {job.location} • Experience: {job.experience}
                </div>
              </div>

              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--ofs-green-50)',
                color: 'var(--ofs-green-700)',
                fontWeight: 700,
                border: '1px solid var(--ofs-green-100)'
              }}>
                Active Requisition
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
