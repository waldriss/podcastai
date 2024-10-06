export interface TAuth {
  sessionClaims: {
    userId: string;
  };
}
export type Voice =
  | 'nPczCjzI2devNBz1zQrb'
  | 'pqHfZKP75CvOlQylNhV4'
  | 'JBFqnCBsd6RMkjVDRZzb'
  | 'pFZP5JQG7iQjIQuC4Bku';
  export type VoiceName= "Brian" | "Bill" | "George" | "Lilly";

declare global {
  namespace Express {
    interface Request {
      auth: TAuth;
      authenticatedUserId?: number;
    }
  }
}
