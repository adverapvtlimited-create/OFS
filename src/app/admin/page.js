'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2,
  Users,
  Building
} from 'lucide-react';
import servicesData from '@/data/services.json';
import blogPosts from '@/data/blog-posts.json';
import jobsData from '@/data/jobs.json';

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [enqRes, appRes] = await Promise.all([
          fetch('/api/contact').then(r => r.json()).catch(() => []),
          fetch('/api/careers').then(r => r.json()).catch(() => [])
        ]);
        setEnquiries(Array.isArray(enqRes) ? enqRes : []);
        setApplications(Array.isArray(appRes) ? appRes : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      {/* Top Welcome Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '0.35rem' }}>
          Operations & Content Dashboard
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--ofs-gray-600)', margin: 0 }}>
          Manage client project RFQs, career submissions, and published content across OFS Group India.
        </p>
      </div>

      {/* Metrics Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{ background: 'var(--ofs-white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--ofs-gray-200)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ofs-gray-500)', textTransform: 'uppercase' }}>
              Project Inquiries
            </span>
            <MessageSquare size={18} style={{ color: 'var(--ofs-red-600)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--ofs-navy-950)' }}>
            {enquiries.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ofs-green-700)', marginTop: '0.35rem' }}>
            Active RFQs in system
          </div>
        </div>

        <div style={{ background: 'var(--ofs-white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--ofs-gray-200)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ofs-gray-500)', textTransform: 'uppercase' }}>
              Job Applications
            </span>
            <Briefcase size={18} style={{ color: 'var(--ofs-navy-900)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--ofs-navy-950)' }}>
            {applications.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ofs-gray-500)', marginTop: '0.35rem' }}>
            Submitted candidate CVs
          </div>
        </div>

        <div style={{ background: 'var(--ofs-white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--ofs-gray-200)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ofs-gray-500)', textTransform: 'uppercase' }}>
              Published Insights
            </span>
            <FileText size={18} style={{ color: 'var(--ofs-gold-600)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--ofs-navy-950)' }}>
            {blogPosts.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ofs-gray-500)', marginTop: '0.35rem' }}>
            Technical articles live
          </div>
        </div>

        <div style={{ background: 'var(--ofs-white)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--ofs-gray-200)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ofs-gray-500)', textTransform: 'uppercase' }}>
              Core Divisions
            </span>
            <Building size={18} style={{ color: 'var(--ofs-navy-700)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--ofs-navy-950)' }}>
            {servicesData.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--ofs-green-700)', marginTop: '0.35rem' }}>
            ISO 9001:2015 active
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div style={{ background: 'var(--ofs-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--ofs-gray-200)', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ofs-navy-950)', margin: 0 }}>
            Recent Project Inquiries & RFPs
          </h3>
          <Link href="/admin/enquiries" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--ofs-red-600)', fontWeight: 700 }}>
            View All ({enquiries.length})
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--ofs-gray-500)' }}>Loading records...</div>
        ) : enquiries.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--ofs-gray-500)' }}>
            No enquiries received yet. Submissions from the contact and RFP forms will appear here in real-time.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ofs-gray-200)', color: 'var(--ofs-gray-500)', fontFamily: 'var(--font-mono)' }}>
                  <th style={{ padding: '0.75rem' }}>ID</th>
                  <th style={{ padding: '0.75rem' }}>Client Name</th>
                  <th style={{ padding: '0.75rem' }}>Company</th>
                  <th style={{ padding: '0.75rem' }}>Service Area</th>
                  <th style={{ padding: '0.75rem' }}>Urgency</th>
                  <th style={{ padding: '0.75rem' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} style={{ borderBottom: '1px solid var(--ofs-gray-100)' }}>
                    <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ofs-navy-900)' }}>{enq.id}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--ofs-navy-950)' }}>{enq.name}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--ofs-gray-600)' }}>{enq.company}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--ofs-navy-900)' }}>{enq.service}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-xs)',
                        background: enq.urgency.includes('Urgent') ? 'var(--ofs-red-50)' : 'var(--ofs-navy-50)',
                        color: enq.urgency.includes('Urgent') ? 'var(--ofs-red-700)' : 'var(--ofs-navy-700)',
                        fontWeight: 700
                      }}>
                        {enq.urgency}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--ofs-gray-500)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                      {new Date(enq.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
