import { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../services/cloudinary.service";

export async function uploadController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await uploadToCloudinary(req.file, "tasksphere/profiles");

    return res.json({
      success: true,
      fileUrl: result.fileUrl,
      publicId: result.publicId,
      format: result.format,
      width: result.width,
      height: result.height,
      size: result.size,
      originalName: req.file.originalname,
    });
  } catch (err) {
    next(err);
  }
}
