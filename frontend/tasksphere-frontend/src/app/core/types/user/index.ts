export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  profilePictureUrl?: string | null;
  projectCount?: number | null;
  createdAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  profilePictureUrl?: string | null;
  cloudinaryPublicId?: string | null;
}

export type UserOption = {
  id: number | string;
  name: string;
  email: string;
  avatarUrl?: string | null;
};
