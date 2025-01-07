import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException
    }

    try {
        const tokenPayload = await this.jwtService.verifyAsync(token);
        request.user = {
            userId: tokenPayload.userId,
            email: tokenPayload.email,
            name: tokenPayload.name
        }
        
        return true;
    } catch (error) {
        throw new UnauthorizedException();
    }

  }
}