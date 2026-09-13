import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { sendRfqEmail } from "@/lib/brevo";

// In-memory cache for serverless environments (e.g. Vercel) where root filesystem is read-only
let memoryEnquiries = [];

const getWritableFilePath = () => {
  const localDir = path.join(process.cwd(), "content");
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const testFile = path.join(localDir, ".write-test");
    fs.writeFileSync(testFile, "");
    fs.unlinkSync(testFile);
    return path.join(localDir, "enquiries.json");
  } catch {
    const tmpDir = process.env.TMPDIR || process.env.TEMP || "/tmp";
    return path.join(tmpDir, "enquiries.json");
  }
};

const readEnquiries = () => {
  const list = [];
  // 1. Try bundled content/enquiries.json
  try {
    const bundledPath = path.join(process.cwd(), "content", "enquiries.json");
    if (fs.existsSync(bundledPath)) {
      const fileContent = fs.readFileSync(bundledPath, "utf8");
      const parsed = JSON.parse(fileContent);
      if (Array.isArray(parsed)) list.push(...parsed);
    }
  } catch {
    // Ignore read error
  }

  // 2. Try /tmp/enquiries.json
  try {
    const tmpPath = path.join(process.env.TMPDIR || process.env.TEMP || "/tmp", "enquiries.json");
    if (fs.existsSync(tmpPath)) {
      const fileContent = fs.readFileSync(tmpPath, "utf8");
      const parsed = JSON.parse(fileContent);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (!list.some((e) => e.id === item.id)) {
            list.unshift(item);
          }
        }
      }
    }
  } catch {
    // Ignore tmp read error
  }

  // 3. Merge in-memory records
  for (const item of memoryEnquiries) {
    if (!list.some((e) => e.id === item.id)) {
      list.unshift(item);
    }
  }

  return list;
};

const writeEnquiries = (enquiries) => {
  memoryEnquiries = enquiries;
  try {
    const filePath = getWritableFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(enquiries, null, 2), "utf8");
  } catch (e) {
    console.warn("[Storage Note] File persistence bypassed on serverless runtime:", e.message);
  }
};

export async function POST(request) {
  try {
    let data = {};
    let pdfUrl = null;
    let cloudinaryUrl = null;
    let pdfName = null;
    let pdfSize = null;
    let fileDetails = null;
    let fileContentType = "application/pdf";

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        service: formData.get("service"),
        urgency: formData.get("urgency"),
        message: formData.get("message"),
        formType: formData.get("formType") || "general",
      };

      const uploadedFile = formData.get("file");
      if (
        uploadedFile &&
        typeof uploadedFile === "object" &&
        uploadedFile.name &&
        typeof uploadedFile.arrayBuffer === "function"
      ) {
        pdfName = uploadedFile.name;
        pdfSize = uploadedFile.size;
        fileContentType = uploadedFile.type || "application/pdf";

        try {
          const arrayBuffer = await uploadedFile.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // 1. Upload directly to Cloudinary using in-memory Buffer (no disk write required)
          try {
            const cloudinaryResult = await uploadToCloudinary(
              buffer,
              uploadedFile.name,
              "ofs/enquiries",
            );
            if (cloudinaryResult?.secure_url || cloudinaryResult?.url) {
              cloudinaryUrl = cloudinaryResult.secure_url || cloudinaryResult.url;
              pdfUrl = cloudinaryUrl;
            }
          } catch (cloudErr) {
            console.warn("[Cloudinary Upload Warning]:", cloudErr.message);
          }

          // 2. Try saving to local disk only if directory is writable (e.g., local dev)
          let diskFilePath = null;
          try {
            const uploadsDir = path.join(
              process.cwd(),
              "public",
              "uploads",
              "enquiries",
            );
            if (!fs.existsSync(uploadsDir)) {
              fs.mkdirSync(uploadsDir, { recursive: true });
            }
            const safeFileName = `${Date.now()}-${uploadedFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
            diskFilePath = path.join(uploadsDir, safeFileName);
            fs.writeFileSync(diskFilePath, buffer);
            if (!pdfUrl) {
              pdfUrl = `/uploads/enquiries/${safeFileName}`;
            }
          } catch {
            // Read-only filesystem in production (Vercel) - disk write safely skipped
          }

          fileDetails = {
            buffer,
            base64: buffer.toString("base64"),
            filePath: diskFilePath,
            fileName: pdfName,
            size: pdfSize,
            contentType: fileContentType,
            cloudinaryUrl,
          };
        } catch (fileErr) {
          console.error("[File Processing Error]:", fileErr);
        }
      }
    } else {
      data = await request.json();
    }

    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required fields." },
        { status: 400 },
      );
    }

    const enquiryRecord = {
      id: `ENQ-${Date.now()}`,
      timestamp: new Date().toISOString(),
      formType: data.formType || "general",
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || "Not Specified",
      service: data.service || "General Procurement",
      urgency: data.urgency || "Standard (1-2 Days)",
      message: data.message || "",
      pdfUrl: pdfUrl || cloudinaryUrl,
      cloudinaryUrl,
      pdfName,
      pdfSize,
      status: "NEW",
      ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
    };

    // 3. Dispatch Email via Brevo API using in-memory Buffer & Cloudinary URL
    const emailResult = await sendRfqEmail({
      enquiry: enquiryRecord,
      file: fileDetails,
    });

    // 4. Save record in internal JSON database for admin dashboard
    enquiryRecord.emailDispatched = emailResult.success;
    enquiryRecord.emailMessageId = emailResult.messageId || null;
    enquiryRecord.emailError = emailResult.error || null;

    const enquiries = readEnquiries();
    enquiries.unshift(enquiryRecord);
    writeEnquiries(enquiries);

    // If sending the email failed, return an error to the frontend
    if (!emailResult.success) {
      console.error("[Contact Route] Brevo email dispatch failed:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          error:
            emailResult.error ||
            "Failed to send email notification to the commercial desk.",
          enquiryId: enquiryRecord.id,
          cloudinaryUrl,
          emailSent: false,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Enquiry registered successfully and dispatched to commercial desk.",
      enquiryId: enquiryRecord.id,
      cloudinaryUrl,
      emailSent: true,
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error processing enquiry." },
      { status: 500 },
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
      return NextResponse.json(
        { error: "ID and status required" },
        { status: 400 },
      );
    }

    const enquiries = readEnquiries();
    const index = enquiries.findIndex((e) => e.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    enquiries[index].status = status;
    enquiries[index].updatedAt = new Date().toISOString();
    writeEnquiries(enquiries);

    return NextResponse.json({ success: true, enquiry: enquiries[index] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update enquiry status" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    let enquiries = readEnquiries();
    enquiries = enquiries.filter((e) => e.id !== id);
    writeEnquiries(enquiries);

    return NextResponse.json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete enquiry" },
      { status: 500 },
    );
  }
}
