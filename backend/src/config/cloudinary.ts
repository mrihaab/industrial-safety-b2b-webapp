import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'lx03sgg5',
  api_key: process.env.CLOUDINARY_API_KEY || '625616156141223',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'TukMvsBYBs7JW9hUR-viO4L7C3w',
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ghulam_safety_hub',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit' }],
  } as any,
});

export default cloudinary;
