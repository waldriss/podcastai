import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly requireAuth = ClerkExpressRequireAuth({
    onError: () => {
      console.log('error');
    },
  });
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const excludedPaths = [
      '/signin',
      '/register',
      '/auth-google',
      '/server',
    ];

    if (excludedPaths.includes(request.path)) {
      return true; // Allow access to excluded paths
    }

    return new Promise((resolve, reject) => {
      this.requireAuth(request, response, (err: any) => {
        if (err) {
          reject(new UnauthorizedException('Authentication failed'));
        }
    
        // Extract user ID from the verified Clerk session and add it to the request
        const userId = request.auth.sessionClaims?.userId;
        if (!userId) {
          reject(new UnauthorizedException('User ID not found'));
        }

        // Attach the user ID to the request object
        request.authenticatedUserId = parseInt(userId);
        resolve(true);
      });
    });
  }
}
