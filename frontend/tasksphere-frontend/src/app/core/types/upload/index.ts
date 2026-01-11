export interface UploadResponse {
  success: boolean;
  fileUrl: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
  size: number;
  originalName: string;
}
