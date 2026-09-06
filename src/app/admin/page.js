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
import { cn } from '@/lib/cn';

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
      <div className="mb-8">
        <h1 className="font-heading text-[1.75rem] font-extrabold text-ofs-navy-950 mb-1">
          Operations &amp; Content Dashboard
        </h1>
        <p className="text-[0.9rem] text-ofs-gray-600 m-0">
          Manage client project RFQs, career submissions, and published content across OFS Group India.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg border border-ofs-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono font-bold text-ofs-gray-500 uppercase">
              Project Inquiries
            </span>
            <MessageSquare size={18} className="text-ofs-red-600" />
          </div>
          <div className="font-heading text-[2rem] font-extrabold text-ofs-navy-950">
            {enquiries.length}
          </div>
          <div className="text-xs text-ofs-green-700 mt-1">
            Active RFQs in system
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-ofs-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono font-bold text-ofs-gray-500 uppercase">
              Job Applications
            </span>
            <Briefcase size={18} className="text-ofs-navy-900" />
          </div>
          <div className="font-heading text-[2rem] font-extrabold text-ofs-navy-950">
            {applications.length}
          </div>
          <div className="text-xs text-ofs-gray-500 mt-1">
            Submitted candidate CVs
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-ofs-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono font-bold text-ofs-gray-500 uppercase">
              Published Insights
            </span>
            <FileText size={18} className="text-ofs-gold-600" />
          </div>
          <div className="font-heading text-[2rem] font-extrabold text-ofs-navy-950">
            {blogPosts.length}
          </div>
          <div className="text-xs text-ofs-gray-500 mt-1">
            Technical articles live
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-ofs-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono font-bold text-ofs-gray-500 uppercase">
              Core Divisions
            </span>
            <Building size={18} className="text-ofs-navy-700" />
          </div>
          <div className="font-heading text-[2rem] font-extrabold text-ofs-navy-950">
            {servicesData.length}
          </div>
          <div className="text-xs text-ofs-green-700 mt-1">
            Active divisions
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-ofs-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-heading text-lg font-bold text-ofs-navy-950 m-0">
            Recent Project Inquiries &amp; RFPs
          </h3>
          <Link href="/admin/enquiries" className="text-xs font-mono text-ofs-red-600 font-bold hover:underline">
            View All ({enquiries.length})
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-ofs-gray-500">Loading records...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-8 text-center text-ofs-gray-500">
            No enquiries received yet. Submissions from the contact and RFP forms will appear here in real-time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[0.85rem]">
              <thead>
                <tr className="border-b border-ofs-gray-200 text-ofs-gray-500 font-mono">
                  <th className="p-3">ID</th>
                  <th className="p-3">Client Name</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Service Area</th>
                  <th className="p-3">Urgency</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="border-b border-ofs-gray-100 hover:bg-ofs-gray-50/50">
                    <td className="p-3 font-mono font-bold text-ofs-navy-900">{enq.id}</td>
                    <td className="p-3 font-semibold text-ofs-navy-950">{enq.name}</td>
                    <td className="p-3 text-ofs-gray-600">{enq.company}</td>
                    <td className="p-3 text-ofs-navy-900">{enq.service}</td>
                    <td className="p-3">
                      <span className={cn(
                        'text-[0.7rem] font-mono py-1 px-2 rounded font-bold',
                        enq.urgency?.includes('Urgent')
                          ? 'bg-ofs-red-50 text-ofs-red-700'
                          : 'bg-ofs-navy-50 text-ofs-navy-700'
                      )}>
                        {enq.urgency}
                      </span>
                    </td>
                    <td className="p-3 text-ofs-gray-500 text-xs font-mono">
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
