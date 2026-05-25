import formidable from 'formidable';
import fs from 'fs/promises';
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

        // Collect all uploaded files from any keys (files, file, assets, etc.) dynamically
        const filesToProcess = [];
        for (const [key, val] of Object.entries(files)) {
          if (Array.isArray(val)) {
            filesToProcess.push(...val);
          } else if (val) {
            filesToProcess.push(val);
          }
        }

        const uploadedAssets = [];
        try {
          for (const file of filesToProcess) {
            if (!file) continue;
            
            try {
              const result = await uploadToCloudinary(file.filepath, { folder: "hackathon-submissions" });
              uploadedAssets.push({
                url: result.secure_url,
                publicId: result.public_id,
                type: determineAssetType(result.resource_type, file.mimetype),
                fileName: file.originalFilename || file.newFilename
              });
            } finally {
              // Always clean up temporary server files immediately
              try {
                await fs.unlink(file.filepath);
              } catch (unlinkErr) {
                console.error("Failed to delete temp submission file:", unlinkErr.message);
              }
            }
          }

          resolve(uploadedAssets);
        } catch (uploadError) {
          // Clean up any remaining temp files in case of a fatal error mid-loop
          for (const file of filesToProcess) {
            if (file && file.filepath) {
              try {
                await fs.unlink(file.filepath).catch(() => {});
              } catch (e) {}
            }
          }
          reject(uploadError);
        }
      });
    });
  }
}

const uploadService = new UploadService();
export default uploadService;
