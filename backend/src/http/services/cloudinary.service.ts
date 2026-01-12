import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { CloudinaryUploadResult } from "../../graphql/features/cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: Express.Multer.File,
  folder: string = "tasksphere"
): Promise<CloudinaryUploadResult> {
  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: [
          { width: 1000, height: 1000, crop: "limit" },
          { quality: "auto" },
        ],
      },
      (error, result) => {
        if (error) {
          console.error("Erro no upload Cloudinary:", error);
          reject(error);
        } else if (result) {
          resolve({
            success: true,
            fileUrl: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            size: result.bytes,
          });
        }
      }
    );

    const bufferStrem = Readable.from(file.buffer);
    bufferStrem.pipe(uploadStream);
  });
}

export async function deleteFromCloudinary(
  publicId: string
): Promise<{ result: string }> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Cloudinary deletion result for ${publicId}:`, result);
    return result;
  } catch (err: any) {
    console.error(`Error deleting from Cloudinary (${publicId}):`, err);
    return { result: err?.message || "" };
  }
}

export function extractPublicIdFromUrl(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    return match ? match[1] : null;
  } catch (err: any) {
    console.error("Error extracting publicId from URL:", err);
    return null;
  }
}
