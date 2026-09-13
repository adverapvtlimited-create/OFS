import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary SDK with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a file from Disk Path or Buffer to Cloudinary
 * Handles PDFs (as 'raw'/'auto') and Images (as 'image')
 *
 * @param {Buffer|string} fileInput - File buffer or absolute disk file path
 * @param {string} fileName - Original file name (e.g. 'rfq_specs.pdf')
 * @param {string} [folder='ofs/enquiries'] - Cloudinary folder destination
 * @returns {Promise<{ url: string, secure_url: string, public_id: string, bytes: number, format: string, originalName: string }>}
 */
export async function uploadToCloudinary(
  fileInput,
  fileName,
  folder = "ofs/enquiries",
) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn(
      "[Cloudinary] Missing credentials. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local",
    );
    return null;
  }

  const cleanBaseName = fileName
    ? fileName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_")
    : `file_${Date.now()}`;

  const isPdf = fileName && fileName.toLowerCase().endsWith(".pdf");
  const isImage = fileName && /\.(jpe?g|png|webp|gif|svg)$/i.test(fileName);
  const resourceType = isPdf ? "raw" : isImage ? "image" : "auto";

  // If fileInput is a disk file path string
  if (typeof fileInput === "string") {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        fileInput,
        {
          folder,
          resource_type: resourceType,
          public_id: `${Date.now()}_${cleanBaseName}`,
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            console.error("[Cloudinary Upload Error]:", error);
            return reject(error);
          }
          resolve({
            url: result.secure_url,
            secure_url: result.secure_url,
            public_id: result.public_id,
            publicId: result.public_id,
            bytes: result.bytes,
            format: result.format || (isPdf ? "pdf" : "raw"),
            originalName: fileName,
          });
        },
      );
    });
  }

  // If fileInput is a Buffer
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: `${Date.now()}_${cleanBaseName}`,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          console.error("[Cloudinary Upload Error]:", error);
          return reject(error);
        }
        resolve({
          url: result.secure_url,
          secure_url: result.secure_url,
          public_id: result.public_id,
          publicId: result.public_id,
          bytes: result.bytes,
          format: result.format || (isPdf ? "pdf" : "raw"),
          originalName: fileName,
        });
      },
    );

    uploadStream.end(fileInput);
  });
}

/**
 * Uploads a file (Multer diskStorage file object, Web File, Buffer, or file path string) to Cloudinary
 * @param {Object|string|Buffer} file - Multer file object, file path, Web File, or Buffer
 * @param {string} [folder='ofs/enquiries'] - Cloudinary folder
 * @returns {Promise<{ url: string, secure_url: string, public_id: string, bytes?: number, format?: string, originalName?: string }>}
 */
export const uploadFileToCloudinary = async (
  file,
  folder = "ofs/enquiries",
) => {
  if (!file) return null;

  // 1. If file is a Multer diskStorage file object (has file.path)
  if (file.path && typeof file.path === "string") {
    return await uploadToCloudinary(
      file.path,
      file.originalname || file.filename,
      folder,
    );
  }

  // 2. If file is a Multer memoryStorage file object (has file.buffer)
  if (file.buffer) {
    return await uploadToCloudinary(
      file.buffer,
      file.originalname || file.filename,
      folder,
    );
  }

  // 3. If file is a Next.js / Web File / Blob object (has arrayBuffer method)
  if (typeof file === "object" && typeof file.arrayBuffer === "function") {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return await uploadToCloudinary(
      buffer,
      file.name || "document.pdf",
      folder,
    );
  }

  // 4. If file is a disk path string
  if (typeof file === "string") {
    return await uploadToCloudinary(file, file.split(/[\\/]/).pop(), folder);
  }

  // 5. If file is a raw Buffer
  if (Buffer.isBuffer(file)) {
    return await uploadToCloudinary(file, "document.pdf", folder);
  }

  return null;
};

/**
 * Upload a file directly from a disk path to Cloudinary
 */
export async function uploadFilePathToCloudinary(
  filePath,
  fileName,
  folder = "ofs/enquiries",
) {
  return uploadToCloudinary(filePath, fileName, folder);
}

export default cloudinary;
