import fs from 'fs';

/**
 * Dispatches an RFQ / General Enquiry email via Brevo REST API
 * @param {Object} params
 * @param {Object} params.enquiry - Enquiry data directly from frontend
 * @param {Object|null} params.file - Attached file { filePath, fileName, contentType, cloudinaryUrl, size }
 * @returns {Promise<{ success: boolean, messageId?: string, error?: string }>}
 */
export async function sendRfqEmail({ enquiry, file = null }) {
  const apiKey = process.env.BREVO_API_KEY;
  const companyName =
    process.env.BREVO_SENDER_NAME ||
    process.env.EMAIL_FROM_NAME ||
    'OFS Group India';
  const senderEmail =
    process.env.BREVO_SENDER_EMAIL || 'ganeshbirajdar286@gmail.com';
  const senderName = companyName;
  const receiverEmail =
    process.env.CONTACT_RECEIVER_EMAIL || 'ganeshbirajdar286@gmail.com';

  if (!apiKey) {
    const errorMsg = 'BREVO_API_KEY is not configured in .env.local or .env';
    console.error('[Brevo Error]:', errorMsg);
    return {
      success: false,
      error: errorMsg,
    };
  }

  const {
    id = `ENQ-${Date.now()}`,
    name = '',
    email = '',
    phone = '',
    company = '',
    service = 'Procurement & Sourcing',
    urgency = 'Standard (1-2 Days)',
    message = '',
    formType = 'general',
    timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
    }),
  } = enquiry;

  // The client who submitted the form
  const clientEmail = (email || '').trim();
  const clientName = (name || '').trim() || 'Client';
  const clientCompany = (company || '').trim() || 'Not Specified';

  const isRfq =
    formType === 'rfp' || service.toLowerCase().includes('procurement');
  const emailSubject = `New Inquiry from ${clientName}${clientCompany !== 'Not Specified' ? ` (${clientCompany})` : ''} - ${service}`;

  // Build attachments for Brevo (supports in-memory Buffer, base64, disk path, or Cloudinary URL)
  const attachments = [];
  if (file) {
    const attachName = file.fileName || file.name || 'Specification_Document.pdf';
    if (file.buffer && Buffer.isBuffer(file.buffer)) {
      attachments.push({
        content: file.buffer.toString('base64'),
        name: attachName,
      });
    } else if (file.base64 && typeof file.base64 === 'string') {
      attachments.push({
        content: file.base64,
        name: attachName,
      });
    } else if (file.filePath && typeof file.filePath === 'string') {
      try {
        if (fs.existsSync(file.filePath)) {
          const fileBase64 = fs.readFileSync(file.filePath).toString('base64');
          attachments.push({
            content: fileBase64,
            name: attachName,
          });
        } else if (file.cloudinaryUrl) {
          attachments.push({
            url: file.cloudinaryUrl,
            name: attachName,
          });
        }
      } catch (err) {
        console.warn('[Brevo Attachment Read Warning]:', err.message);
        if (file.cloudinaryUrl) {
          attachments.push({
            url: file.cloudinaryUrl,
            name: attachName,
          });
        }
      }
    } else if (file.cloudinaryUrl) {
      attachments.push({
        url: file.cloudinaryUrl,
        name: attachName,
      });
    }
  }

  // Admin HTML Email Body
  const adminHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 640px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #071330 0%, #0d1b3e 100%); padding: 32px 30px; text-align: left; border-bottom: 3px solid #dc2626;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #dc2626; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; margin-bottom: 12px;">
                      ${isRfq ? 'REQUEST FOR QUOTATION (RFQ)' : 'GENERAL BUSINESS ENQUIRY'}
                    </span>
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; line-height: 1.3;">
                      New Commercial Enquiry Received
                    </h1>
                    <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 13px;">
                      Ref ID: <strong style="color: #f8fafc; font-family: monospace;">${id}</strong> &bull; Received on ${timestamp} IST
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 30px;">

              <!-- Client Info Table -->
              <h3 style="margin: 0 0 14px 0; color: #071330; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                👤 Contact &amp; Organization Details
              </h3>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; width: 38%; color: #64748b; font-weight: 600;">Contact Person:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${clientName}</td>
                </tr>
                <tr style="border-top: 1px dashed #f1f5f9;">
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Official Work Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${clientEmail}" style="color: #dc2626; font-weight: 600; text-decoration: none;">${clientEmail}</a>
                  </td>
                </tr>
                <tr style="border-top: 1px dashed #f1f5f9;">
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone / WhatsApp:</td>
                  <td style="padding: 8px 0;">
                    <a href="tel:${phone}" style="color: #0f172a; font-weight: 600; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                <tr style="border-top: 1px dashed #f1f5f9;">
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Company / Client:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${clientCompany}</td>
                </tr>
                <tr style="border-top: 1px dashed #f1f5f9;">
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Service Division:</td>
                  <td style="padding: 8px 0; color: #071330; font-weight: 700;">${service}</td>
                </tr>
                <tr style="border-top: 1px dashed #f1f5f9;">
                  <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Project Urgency:</td>
                  <td style="padding: 8px 0;">
                    <span style="background-color: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 4px; font-weight: 600; font-size: 12px;">
                      ${urgency}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Scope / Message Box -->
              <h3 style="margin: 0 0 10px 0; color: #071330; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                📝 Scope Description &amp; Technical Requirements
              </h3>
              <div style="background-color: #f8fafc; border-left: 4px solid #dc2626; padding: 16px; border-radius: 0 8px 8px 0; font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 24px; white-space: pre-wrap;">
                ${message ? message.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '<em>No additional scope text provided.</em>'}
              </div>

              <!-- Document Attachment & Cloudinary Section -->
              <h3 style="margin: 0 0 10px 0; color: #071330; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                📎 Attached Documents &amp; Specifications
              </h3>

              ${
                file
                  ? `
                <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="vertical-align: middle;">
                        <p style="margin: 0; font-weight: 700; font-size: 14px; color: #1e3a8a;">
                          📄 ${file.fileName || 'Attached Document'}
                        </p>
                        ${file.size ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB</p>` : ''}
                      </td>
                      ${
                        file.cloudinaryUrl
                          ? `
                      <td align="right" style="vertical-align: middle;">
                        <a href="${file.cloudinaryUrl}" target="_blank" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600;">
                          View on Cloudinary ↗
                        </a>
                      </td>`
                          : ''
                      }
                    </tr>
                  </table>
                  <p style="margin: 8px 0 0 0; font-size: 11px; color: #64748b;">
                    * The document is attached to this email message.
                  </p>
                </div>
              `
                  : `
                <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 14px; text-align: center; color: #64748b; font-size: 13px; margin-bottom: 24px;">
                  No external document or PDF attached with this submission.
                </div>
              `
              }

              <!-- Quick Action Bar -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${clientEmail}?subject=RE:%20OFS%20Inquiry%20${encodeURIComponent(id)}%20-%20${encodeURIComponent(service)}" style="display: inline-block; background-color: #071330; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 700; letter-spacing: 0.5px;">
                      Reply directly to ${clientName} (${clientEmail})
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
              <p style="margin: 0 0 4px 0; font-weight: 600; color: #64748b;">
                ${senderName}
              </p>
              <p style="margin: 0;">
                Official Inquiries Mailbox: <a href="mailto:${receiverEmail}" style="color: #dc2626; text-decoration: none;">${receiverEmail}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Brevo API Payload for Admin
  const emailPayload = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [
      {
        email: receiverEmail,
        name: 'OFS Commercial Desk',
      },
    ],
    replyTo: {
      email: clientEmail,
      name: clientName,
    },
    subject: emailSubject,
    htmlContent: adminHtmlContent,
    attachment: attachments.length > 0 ? attachments : undefined,
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('[Brevo API Error Details]:', result);
      return {
        success: false,
        error: result.message || 'Failed to dispatch email via Brevo',
      };
    }



    // Send confirmation auto-responder to client
    if (clientEmail && clientEmail.includes('@')) {
      sendClientConfirmation({
        apiKey,
        senderEmail,
        senderName: companyName,
        clientEmail,
        clientName,
        enquiryId: id,
        service,
        receiverEmail,
      }).catch((e) => {
        console.warn('[Brevo Client Confirmation Note]:', e.message);
      });
    }

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (err) {
    console.error('[Brevo Network Error]:', err);
    return {
      success: false,
      error: err.message || 'Internal connection error communicating with Brevo',
    };
  }
}

/**
 * Sends automated receipt confirmation back to the client via Brevo
 */
async function sendClientConfirmation({
  apiKey,
  senderEmail,
  senderName,
  clientEmail,
  clientName,
  enquiryId,
  service,
  receiverEmail,
}) {
  const clientHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; background-color: #f8fafc; padding: 25px;">
  <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <div style="background-color: #071330; padding: 24px; color: #ffffff; border-bottom: 3px solid #dc2626;">
      <h2 style="margin: 0; font-size: 20px;">We Received Your Enquiry</h2>
      <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">Reference ID: <strong>${enquiryId}</strong></p>
    </div>
    <div style="padding: 24px; line-height: 1.6; font-size: 14px;">
      <p>Dear <strong>${clientName}</strong>,</p>
      <p>Thank you for reaching out to <strong>${senderName}</strong> regarding <strong>${service}</strong>.</p>
      <p>Your technical specification and commercial enquiry have been registered and routed to our specialized commercial engineering desk.</p>
      <div style="background: #f1f5f9; padding: 14px 18px; border-radius: 6px; margin: 18px 0;">
        <p style="margin: 0; font-size: 13px; color: #475569;">
          ⏱ <strong>Response SLA:</strong> Our technical team typically assesses specifications and responds within <strong>4 business hours</strong>.
        </p>
      </div>
      <p>If you have urgent questions, please feel free to reply directly to this email or connect with us at <a href="mailto:${receiverEmail}" style="color: #dc2626; font-weight: 600;">${receiverEmail}</a>.</p>
      <p style="margin-top: 24px; color: #64748b; font-size: 13px;">Warm regards,<br><strong style="color: #071330;">Commercial Desk &amp; Engineering Operations</strong><br>${senderName}</p>
    </div>
  </div>
</body>
</html>
  `;

  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          email: clientEmail,
          name: clientName,
        },
      ],
      replyTo: {
        email: receiverEmail,
        name: senderName,
      },
      subject: `Thank you for contacting ${senderName} (${enquiryId})`,
      htmlContent: clientHtml,
    }),
  });
}

export default sendRfqEmail;
