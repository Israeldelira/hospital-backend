import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if (url.includes('register') || url.includes('login')) {
      return true;
    }

    const token = request.headers['authorization'];

    if (!token) {
      throw new ForbiddenException('El token es requerido');
    }

    try {
      const jwtSecret = this.configService.get<string>('jwt.secret');

      const decoded = this.jwtService.verify(token.replace('Bearer ', ''), {
        secret: jwtSecret,
      });
      request.user = decoded;
      return true;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Token Invalido');
    }
  }
}
