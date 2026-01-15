export interface User {
  id: string;
  name: string;
  email: string;
  isActive?: boolean | null;
  profilePictureUrl?: string | null;
  projectCount?: number | null;
  createdAt?: string | null;
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
