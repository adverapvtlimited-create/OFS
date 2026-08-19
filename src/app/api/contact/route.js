import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || 'Not Specified',
      service: data.service || 'General',
      urgency: data.urgency || 'Standard',
      message: data.message || '',
      status: 'NEW',
      ip: request.headers.get('x-forwarded-for') || '127.0.0.1'
    };

    // Store in JSON database directory
    const dir = path.join(process.cwd(), 'content');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, 'enquiries.json');
    let enquiries = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        enquiries = JSON.parse(fileContent);
      } catch (e) {
        enquiries = [];
      }
    }

    enquiries.unshift(enquiryRecord);
    fs.writeFileSync(filePath, JSON.stringify(enquiries, null, 2), 'utf8');

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
    const filePath = path.join(process.cwd(), 'content', 'enquiries.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const enquiries = JSON.parse(fileContent);
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json([]);
  }
}
