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
declare global {
  namespace Express {
    interface Request {
      auth: TAuth;
      authenticatedUserId?: number;
    }
  }
}
