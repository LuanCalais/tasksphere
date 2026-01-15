export interface User {
  id?: number;
  name: string;
  isActive?: boolean;
  email: string;
  profilePictureUrl?: string;
  profilePicture?: File | null;
  cloudinaryPublicId?: string;
  projectCount?: number | null;
}
