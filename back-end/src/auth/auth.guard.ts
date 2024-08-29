import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { authMiddleware } from './auth.middleware';


@Injectable()
export class ClerkGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Create a promise-based wrapper for the middleware
    return new Promise((resolve) => {
      authMiddleware(request, null, (err: any) => {
        if (err) {
          throw new UnauthorizedException('Authentication failed');
        }
        resolve(true);
      });
    });
  }
}