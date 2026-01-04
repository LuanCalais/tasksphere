export interface User {
  id?: number;
  name: string;
  email: string;
  profilePictureUrl?: string;
}

export interface UserQueryArgs {
  id: string;
}
