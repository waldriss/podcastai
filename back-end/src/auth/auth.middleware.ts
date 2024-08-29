import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.path !== "/signin" && req.path !== "/register" && req.path !== "/SigInOrSignUpGoogle" && req.path !== "/server") {
    return ClerkExpressRequireAuth()(req, res, next);
  }
  next();
};