import { Request, Response } from "express";

export function healthController(req: Request, res: Response) {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    cloudinary: !!process.env.CLOUDINARY_CLOUD_NAME,
  });
}
