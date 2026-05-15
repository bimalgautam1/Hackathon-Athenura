/**
  upload.service.js
  Handles multipart form parsing and uploads files to Cloudinary.
 */

import formidable from 'formidable';
import { uploadToCloudinary } from '../../config/cloudinary.js';

const determineAssetType = (resourceType, mimetype) => {
  if (mimetype && mimetype.startsWith("image/")) return "image";
  if (mimetype && mimetype.startsWith("video/")) return "video";
  return "document";
};

class UploadService {
  async parseAndUpload(req) {
    return new Promise((resolve, reject) => {
      const form = formidable({
        maxFileSize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
        keepExtensions: true
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          return reject(err);
        }

        try {
          const uploadedAssets = [];
          
          // Formidable v3 puts files in arrays
          const fileArray = files.files || files.file || [];
          const filesToProcess = Array.isArray(fileArray) ? fileArray : [fileArray];

          for (const file of filesToProcess) {
            if (!file) continue;
            
            const result = await uploadToCloudinary(file.filepath, { folder: "hackathon-submissions" });
            
            uploadedAssets.push({
              url: result.secure_url,
              publicId: result.public_id,
              type: determineAssetType(result.resource_type, file.mimetype),
              fileName: file.originalFilename || file.newFilename
            });
          }

          resolve(uploadedAssets);
        } catch (uploadError) {
          reject(uploadError);
        }
      });
    });
  }
}

const uploadService = new UploadService();
export default uploadService;
