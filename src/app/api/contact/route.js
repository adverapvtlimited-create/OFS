import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { sendRfqEmail } from "@/lib/brevo";
import {
  contactEnquirySchema,
  updateEnquiryStatusSchema,
  enquiryQuerySchema,
  validatePdfFile,
} from "@/lib/validations/contact";

export const dynamic = "force-dynamic";

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
    let rawData = {};
    let pdfUrl = null;
    let cloudinaryUrl = null;
    let pdfName = null;
    let pdfSize = null;
    let fileDetails = null;
    let fileContentType = "application/pdf";
    let uploadedFile = null;

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        company: formData.get("company"),
        service: formData.get("service"),
        urgency: formData.get("urgency"),
        message: formData.get("message"),
        formType: formData.get("formType") || "general",
      };
      uploadedFile = formData.get("file");
    } else {
      rawData = await request.json();
    }

    // 🔒 1. Zod Validation for Form Fields
    const validationResult = contactEnquirySchema.safeParse(rawData);
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      const firstErrorMessage =
        Object.values(errors).flat()[0] || "Invalid form submission data.";
      return NextResponse.json(
        {
          success: false,
          error: firstErrorMessage,
          errors,
        },
        { status: 400 },
      );
    }

    const validatedData = validationResult.data;

    // 🔒 2. Zod/File Validation for attached PDF
    if (
      uploadedFile &&
      typeof uploadedFile === "object" &&
      uploadedFile.name &&
      typeof uploadedFile.arrayBuffer === "function"
    ) {
      const fileValidation = validatePdfFile(uploadedFile);
      if (!fileValidation.valid) {
        return NextResponse.json(
          {
            success: false,
            error: fileValidation.error,
            errors: { file: [fileValidation.error] },
          },
          { status: 400 },
        );
      }

      pdfName = uploadedFile.name;
      pdfSize = uploadedFile.size;
      fileContentType = uploadedFile.type || "application/pdf";

      try {
        const arrayBuffer = await uploadedFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using in-memory Buffer
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

        // Try local disk only if directory is writable
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

    const enquiryRecord = {
      id: `ENQ-${Date.now()}`,
      timestamp: new Date().toISOString(),
      formType: validatedData.formType,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      service: validatedData.service,
      urgency: validatedData.urgency,
      message: validatedData.message,
      pdfUrl: pdfUrl || cloudinaryUrl,
      cloudinaryUrl,
      pdfName,
      pdfSize,
      status: "NEW",
      ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
    };

    // 1. Dispatch Email via Brevo API using in-memory Buffer & Cloudinary URL
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

    if (!emailResult.success) {
      console.error("[Contact Route] Brevo email dispatch failed:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          error: emailResult.error || "Failed to send email notification to the commercial desk.",
          enquiryId: enquiryRecord.id,
          cloudinaryUrl,
          emailSent: false,
        },
        { status: 500 },
      );
    }

    // 2. [PHASE 2 - STRAPI INTEGRATION]
    // Once the Hostinger VPS is online, we will uncomment this block to securely push
    // the validated lead directly into the PostgreSQL database via the Strapi API.
    /*
    try {
      const strapiPayload = {
        data: {
          formType: data.formType || "general",
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company || "Not Specified",
          subjectOrRole: data.service || "General Inquiry",
          message: data.message || "",
          status: "New"
          // Note: File attachments require a separate upload to Strapi if not using Cloudinary links
        }
      };

      await fetch(`${process.env.STRAPI_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.STRAPI_WRITE_TOKEN}`
        },
        body: JSON.stringify(strapiPayload)
      });
    } catch (strapiErr) {
      console.error("[Strapi Persistence Error]:", strapiErr);
      // We don't fail the request here, because the email was already successfully dispatched!
    }
    */

    return NextResponse.json({
      success: true,
      message: "Enquiry registered successfully and dispatched to commercial desk.",
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

// GET route remains for now to prevent Admin Portal from crashing on frontend builds, 
// returning an empty array until Strapi is connected.
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
    const body = await request.json().catch(() => ({}));
    const validation = updateEnquiryStatusSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const msg = Object.values(errors).flat()[0] || "Invalid ID or status.";
      return NextResponse.json({ error: msg, errors }, { status: 400 });
    }

    const { id, status } = validation.data;
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
    const queryValidation = enquiryQuerySchema.safeParse({
      id: searchParams.get("id"),
    });

    if (!queryValidation.success) {
      return NextResponse.json(
        { error: "Valid Enquiry ID is required in query params." },
        { status: 400 },
      );
    }

    const { id } = queryValidation.data;
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
