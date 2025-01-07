import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.entity';
import { UsersService } from 'src/users/users.service';

export type AuthInput = {email: string, password: string}
type AuthOutput = {access_token: string, userId: number, email: string, name: string}
type SignInData = {userId: number, email: string, name: string}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  public async validateUser(input: AuthInput): Promise<SignInData> {
    const user = await this.userService.getbyEmail(input.email);

    if (!user || !(bcrypt.compare(input.password, user.password))) {
        console.error('Invalid credentials');
        throw new UnauthorizedException();
      }
      
      return {
        userId: user.id,
        email: user.email,
        name: user.name,
      };
  }

   public async authenticateUser(input: AuthInput): Promise<AuthOutput> {
    const user = await this.validateUser(input);
    if (!user){
        throw new UnauthorizedException();
    }
    return this.signIn(user);
  }

    public async signIn(user: SignInData): Promise<AuthOutput> {
        const tokenPayload = {userId: user.userId, email: user.email, name: user.name}
        const access_token = await this.jwtService.signAsync(tokenPayload);
        return {access_token, userId: user.userId, email: user.email, name: user.name}
    
    }
}