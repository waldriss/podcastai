export interface TAuth {
  sessionClaims: {
    userId: string;
  };
}
declare global {
    namespace Express {
      interface Request {
        auth:TAuth;
        authenticatedUserId?:number

      }
    }
  }