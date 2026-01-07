import { Express } from "express";
import { healthRoutes } from "./health.routes";
import { uploadRoutes } from "./upload.routes";

export function registerRoutes(app: Express) {
  app.use("/api", healthRoutes);
  app.use("/api", uploadRoutes);
}
