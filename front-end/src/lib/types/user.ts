import { exploreQuote } from "./quote";

export interface UserToRegister {
  email: string;
  name: string;
  password: string;
}

export interface TAuthenticatedUser {
  name: string;
  id: number;
}

export interface Author {
  id: number;
  name: string;
  imageUrl?: string;
}

export interface AuthorDetails extends Author{
  quotes:exploreQuote[];
  _count: {
    quotes: number;
  }
}

export interface TopAuthor extends AuthorDetails{}