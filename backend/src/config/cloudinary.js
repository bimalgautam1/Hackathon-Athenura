/**
  cloudinary.js
  Cloudinary credentials and connection setup.
 */

import { v2 as cloudinary } from 'cloudinary';
import envConfig from './envConfig.js';

cloudinary.config({
  cloud_name: envConfig.cloudinaryCloudName,
  api_key: envConfig.cloudinaryApiKey,
  api_secret: envConfig.cloudinaryApiSecret
});

export const uploadToCloudinary = async (filePath, options = {}) => {
  const defaultOptions = {
    folder: "hackathon-submissions",
    resource_type: "auto"
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  return await cloudinary.uploader.upload(filePath, mergedOptions);
};

export const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;
