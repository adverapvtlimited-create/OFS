import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.fullName || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Full name, email, and phone are required.' },
        { status: 400 }
      );
    }

    const applicationRecord = {
      id: `APP-${Date.now()}`,
      timestamp: new Date().toISOString(),
      jobId: data.jobId || 'general',
      jobTitle: data.jobTitle || 'General Application',
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      experienceYears: data.experienceYears || 'N/A',
      currentCompany: data.currentCompany || 'N/A',
      resumeName: data.resumeName || 'resume-attached.pdf',
      coverNote: data.coverNote || '',
      status: 'UNDER_REVIEW'
    };

    const dir = path.join(process.cwd(), 'content');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, 'applications.json');
    let applications = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        applications = JSON.parse(fileContent);
      } catch (e) {
        applications = [];
      }
    }

    applications.unshift(applicationRecord);
    fs.writeFileSync(filePath, JSON.stringify(applications, null, 2), 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Application successfully registered.',
      applicationId: applicationRecord.id
    });
  } catch (error) {
    console.error('Careers API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing application.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'content', 'applications.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const applications = JSON.parse(fileContent);
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json([]);
  }
}
