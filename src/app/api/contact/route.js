import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { sendRfqEmail } from "@/lib/brevo";

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

          // Upload directly to Cloudinary using in-memory Buffer (no disk write required)
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

          fileDetails = {
            buffer,
            base64: buffer.toString("base64"),
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

    // 1. Dispatch Email via Brevo API using in-memory Buffer & Cloudinary URL
    const emailResult = await sendRfqEmail({
      enquiry: enquiryRecord,
      file: fileDetails,
    });

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
  return NextResponse.json([]);
}
