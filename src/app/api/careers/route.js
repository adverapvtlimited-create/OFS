import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { sendCareerApplicationEmail } from '@/lib/brevo';

export const dynamic = 'force-dynamic';

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
    let data = {};
    let resumeUrl = null;
    let cloudinaryUrl = null;
    let resumeName = null;
    let resumeSize = null;
    let fileDetails = null;
    let fileContentType = 'application/pdf';

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      data = {
        fullName: formData.get('fullName') || formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        experienceYears: formData.get('experienceYears'),
        currentCompany: formData.get('currentCompany'),
        jobTitle: formData.get('jobTitle') || 'General Application',
        jobId: formData.get('jobId') || 'general',
        coverNote: formData.get('coverNote') || '',
        resumeName: formData.get('resumeName') || 'Candidate_Resume.pdf',
      };

      const uploadedFile = formData.get('file') || formData.get('resume');
      if (
        uploadedFile &&
        typeof uploadedFile === 'object' &&
        uploadedFile.name &&
        typeof uploadedFile.arrayBuffer === 'function'
      ) {
        resumeName = uploadedFile.name;
        resumeSize = uploadedFile.size;
        fileContentType = uploadedFile.type || 'application/pdf';

        try {
          const arrayBuffer = await uploadedFile.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // 1. Upload directly to Cloudinary using in-memory Buffer
          try {
            const cloudinaryResult = await uploadToCloudinary(
              buffer,
              uploadedFile.name,
              'ofs/careers'
            );
            if (cloudinaryResult?.secure_url || cloudinaryResult?.url) {
              cloudinaryUrl = cloudinaryResult.secure_url || cloudinaryResult.url;
              resumeUrl = cloudinaryUrl;
            }
          } catch (cloudErr) {
            console.warn('[Cloudinary Career Upload Warning]:', cloudErr.message);
          }

          // 2. Try saving to local disk only if directory is writable (e.g. local dev)
          let diskFilePath = null;
          try {
            const uploadsDir = path.join(
              process.cwd(),
              'public',
              'uploads',
              'careers'
            );
            if (!fs.existsSync(uploadsDir)) {
              fs.mkdirSync(uploadsDir, { recursive: true });
            }
            const safeFileName = `${Date.now()}-${uploadedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            diskFilePath = path.join(uploadsDir, safeFileName);
            fs.writeFileSync(diskFilePath, buffer);
            if (!resumeUrl) {
              resumeUrl = `/uploads/careers/${safeFileName}`;
            }
          } catch {
            // Read-only filesystem in production - safely skipped
          }

          fileDetails = {
            buffer,
            base64: buffer.toString('base64'),
            filePath: diskFilePath,
            fileName: resumeName,
            size: resumeSize,
            contentType: fileContentType,
            cloudinaryUrl,
          };
        } catch (fileErr) {
          console.error('[Career File Processing Error]:', fileErr);
        }
      }
    } else {
      data = await request.json();
    }

    if (!data.fullName || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Full name, email, and phone are required fields.' },
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
      resumeName: resumeName || data.resumeName || 'resume-attached.pdf',
      resumeUrl: resumeUrl || cloudinaryUrl || data.resumeUrl || null,
      cloudinaryUrl,
      resumeSize,
      coverNote: data.coverNote || '',
      status: 'UNDER_REVIEW',
      ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
    };

    // 3. Dispatch Email to HR desk and candidate acknowledgement via Brevo API
    const emailResult = await sendCareerApplicationEmail({
      application: applicationRecord,
      file: fileDetails,
    });

    // 4. Save record in internal database for admin dashboard
    applicationRecord.emailDispatched = emailResult.success;
    applicationRecord.emailMessageId = emailResult.messageId || null;
    applicationRecord.emailError = emailResult.error || null;

    const applications = readApplications();
    applications.unshift(applicationRecord);
    writeApplications(applications);

    if (!emailResult.success) {
      console.error('[Careers Route] Brevo email dispatch failed:', emailResult.error);
      return NextResponse.json(
        {
          success: false,
          error:
            emailResult.error ||
            'Failed to dispatch email notification to the HR talent desk.',
          applicationId: applicationRecord.id,
          cloudinaryUrl,
          emailSent: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Job application submitted successfully and dispatched to HR desk.',
      applicationId: applicationRecord.id,
      cloudinaryUrl,
      emailSent: true,
    });
  } catch (error) {
    console.error('Careers API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error processing application.' },
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
