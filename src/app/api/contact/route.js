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
    const data = await request.json();

    // Server-side validation
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
