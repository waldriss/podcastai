export interface UserToRegister {
  email: string;
  name: string;
  password: string;
}

export interface TAuthenticatedUser {
  name: string;
  username: string;
  id: number;
  userImage: string;
}
