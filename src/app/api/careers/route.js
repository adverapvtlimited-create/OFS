import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// In-memory cache for serverless environments (e.g. Vercel) where root filesystem is read-only
let memoryApplications = [];

const getWritableFilePath = () => {
  const localDir = path.join(process.cwd(), 'content');
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const testFile = path.join(localDir, '.write-test');
    fs.writeFileSync(testFile, '');
    fs.unlinkSync(testFile);
    return path.join(localDir, 'applications.json');
  } catch {
    const tmpDir = process.env.TMPDIR || process.env.TEMP || '/tmp';
    return path.join(tmpDir, 'applications.json');
  }
};

const readApplications = () => {
  const list = [];
  // 1. Try bundled content/applications.json
  try {
    const bundledPath = path.join(process.cwd(), 'content', 'applications.json');
    if (fs.existsSync(bundledPath)) {
      const fileContent = fs.readFileSync(bundledPath, 'utf8');
      const parsed = JSON.parse(fileContent);
      if (Array.isArray(parsed)) list.push(...parsed);
    }
  } catch {
    // Ignore read error
  }

  // 2. Try /tmp/applications.json
  try {
    const tmpPath = path.join(process.env.TMPDIR || process.env.TEMP || '/tmp', 'applications.json');
    if (fs.existsSync(tmpPath)) {
      const fileContent = fs.readFileSync(tmpPath, 'utf8');
      const parsed = JSON.parse(fileContent);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (!list.some((a) => a.id === item.id)) {
            list.unshift(item);
          }
        }
      }
    }
  } catch {
    // Ignore tmp read error
  }

  // 3. Merge in-memory records
  for (const item of memoryApplications) {
    if (!list.some((a) => a.id === item.id)) {
      list.unshift(item);
    }
  }

  return list;
};

const writeApplications = (apps) => {
  memoryApplications = apps;
  try {
    const filePath = getWritableFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(apps, null, 2), 'utf8');
  } catch (e) {
    console.warn('[Storage Note] File persistence bypassed on serverless runtime:', e.message);
  }
};

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

    const applications = readApplications();
    applications.unshift(applicationRecord);
    writeApplications(applications);

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
    const applications = readApplications();
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
    }

    const applications = readApplications();
    const index = applications.findIndex(a => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    applications[index].status = status;
    applications[index].updatedAt = new Date().toISOString();
    writeApplications(applications);

    return NextResponse.json({ success: true, application: applications[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update application status' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    let applications = readApplications();
    applications = applications.filter(a => a.id !== id);
    writeApplications(applications);

    return NextResponse.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
