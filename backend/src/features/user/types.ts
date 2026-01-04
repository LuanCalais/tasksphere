export interface User {
  id?: number;
  name: string;
  isActive: boolean;
  email: string;
  profilePictureUrl?: string;
}

export interface UserQueryArgs {
  id: string;
}
