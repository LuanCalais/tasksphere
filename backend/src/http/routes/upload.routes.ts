import { Router } from "express";
import { upload } from "../services/upload.service";
import { uploadController } from "../controllers/upload.controller";

export const uploadRoutes = Router();

uploadRoutes.post("/upload", upload.single("file"), uploadController);
