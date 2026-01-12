export interface User {
  id?: number;
  name: string;
  isActive: boolean;
  email: string;
  profilePictureUrl?: string;
  cloudinaryPublicId?: string;
}

export interface UserQueryArgs {
  id: string;
}
