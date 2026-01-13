export interface User {
  id?: number;
  name: string;
  isActive: boolean;
  email: string;
  profilePictureUrl?: string;
  cloudinaryPublicId?: string;
  projectCount?: number;
}

export interface UserQueryArgs {
  id: string;
}
