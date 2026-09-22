import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

export type AuthRequest = Request & {
  user?: { id: number; email: string };
  authToken?: string;
};

function readCookie(header: string | undefined, name: string): string | null {
  if (!header) return null;
  const value = header
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
  return value ? decodeURIComponent(value) : null;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const header = request.headers.authorization;

    const token = header?.startsWith('Bearer ')
      ? header.slice(7)
      : readCookie(request.headers.cookie, 'khosti_session');

    if (!token) {
      throw new UnauthorizedException('Missing auth token');
    }

    try {
      const payload = this.jwtService.verify<{ id: number; email: string }>(
        token,
      );
      request.user = { id: payload.id, email: payload.email };
      request.authToken = token;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
