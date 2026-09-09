import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getEnquiriesFilePath = () => {
  const dir = path.join(process.cwd(), 'content');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, 'enquiries.json');
};

const readEnquiries = () => {
  const filePath = getEnquiriesFilePath();
  if (!fs.existsSync(filePath)) return [];
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (e) {
    return [];
  }
};

const writeEnquiries = (enquiries) => {
  const filePath = getEnquiriesFilePath();
  fs.writeFileSync(filePath, JSON.stringify(enquiries, null, 2), 'utf8');
};

export async function POST(request) {
  try {
    let data = {};
    let pdfUrl = null;
    let pdfName = null;
    let pdfSize = null;

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        service: formData.get('service'),
        urgency: formData.get('urgency'),
        message: formData.get('message'),
        formType: formData.get('formType') || 'general'
      };

      const pdfFile = formData.get('file');
      if (pdfFile && typeof pdfFile === 'object' && pdfFile.name) {
        if (pdfFile.type === 'application/pdf' || pdfFile.name.toLowerCase().endsWith('.pdf')) {
          const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'enquiries');
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }

          const safeFileName = `${Date.now()}-${pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
          const filePath = path.join(uploadsDir, safeFileName);
          const arrayBuffer = await pdfFile.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          fs.writeFileSync(filePath, buffer);

          pdfUrl = `/uploads/enquiries/${safeFileName}`;
          pdfName = pdfFile.name;
          pdfSize = pdfFile.size;
        }
      }
    } else {
      data = await request.json();
    }

    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required fields.' },
        { status: 400 }
      );
    }

    const enquiryRecord = {
      id: `ENQ-${Date.now()}`,
      timestamp: new Date().toISOString(),
      formType: data.formType || 'rfp',
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || 'Not Specified',
      service: data.service || 'General',
      urgency: data.urgency || 'Standard (1-2 Days)',
      message: data.message || '',
      pdfUrl,
      pdfName,
      pdfSize,
      status: 'NEW',
      ip: request.headers.get('x-forwarded-for') || '127.0.0.1'
    };

    const enquiries = readEnquiries();
    enquiries.unshift(enquiryRecord);
    writeEnquiries(enquiries);

    return NextResponse.json({
      success: true,
      message: 'Enquiry successfully registered.',
      enquiryId: enquiryRecord.id
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing enquiry.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = readEnquiries();
    return NextResponse.json(enquiries);
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

    const enquiries = readEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    enquiries[index].status = status;
    enquiries[index].updatedAt = new Date().toISOString();
    writeEnquiries(enquiries);

    return NextResponse.json({ success: true, enquiry: enquiries[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update enquiry status' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    let enquiries = readEnquiries();
    enquiries = enquiries.filter(e => e.id !== id);
    writeEnquiries(enquiries);

    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
