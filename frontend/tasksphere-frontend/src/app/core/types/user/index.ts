export type CreateUserInput = {
  name: string;
  email: string;
  profilePictureUrl?: string | undefined;
  profilePicture?: File | null;
};
