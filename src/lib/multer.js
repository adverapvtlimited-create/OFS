import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadToCloudinary, uploadFileToCloudinary } from './cloudinary';

export { uploadFileToCloudinary };

// 1. Configure upload folder on disk
const uploadPath = path.join(process.cwd(), 'public', 'uploads', 'enquiries');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// 2. Configure Multer with diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const cleanOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${cleanOriginalName}`);
  },
});

// 3. File filter for PDFs, Documents (DOC/DOCX), and Images
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
  ];

  const hasValidExtension = /\.(pdf|docx?|jpe?g|png|webp|gif|svg)$/i.test(
    file.originalname || ''
  );

  if (allowedTypes.includes(file.mimetype) || hasValidExtension) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Unsupported file format. Please upload a PDF document (.pdf) or image (.png, .jpg, .webp).'
      ),
      false
    );
  }
};

// 4. Export configured multer instance with diskStorage (15MB limit)
export const multerUpload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
  fileFilter,
});

/**
 * Helper to upload a Multer diskStorage or memoryStorage file directly to Cloudinary
 * @param {Object} file - The file object produced by multer (req.file)
 * @param {string} [folder='ofs/enquiries'] - Cloudinary folder
 * @returns {Promise<{ url: string, publicId: string, bytes: number, format: string, originalName: string }>}
 */
export async function uploadMulterFileToCloudinary(file, folder = 'ofs/enquiries') {
  if (!file) {
    return null;
  }

  // If multer saved to disk (file.path exists)
  if (file.path) {
    return await uploadToCloudinary(file.path, file.originalname, folder);
  }

  // If file.buffer exists
  if (file.buffer) {
    return await uploadToCloudinary(file.buffer, file.originalname, folder);
  }

  return null;
}

export default multerUpload;
