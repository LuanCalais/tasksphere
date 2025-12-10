export interface User {
    id?: number;
    name: string;
    email: string;
}

export interface UserQueryArgs {
  id: string;
}