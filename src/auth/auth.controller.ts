import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Auth } from 'typeorm';
import { AuthInput } from './auth.service';
import { Passport } from 'passport';
import { PassportLocalGuard } from './passport-local.guard';
import { PassportJwtAuthGuard } from './passport-jwt.guard';

/*@Controller('auth')
export class AuthController {
  
  constructor(
    private authService: AuthService
  ){}


    @Post('login')
    async login(@Body() input:AuthInput) {
      return this.authService.authenticateUser(input);

    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() request) {
        return request.user;
        }
}*/

@Controller('auth-v2')
export class AuthController {
  
  constructor(
    private authService: AuthService
  ){}


    @Post('login')
    @UseGuards(PassportLocalGuard)
    async login(@Request() request) {
      return this.authService.signIn(request.user);

    }

    @UseGuards(PassportJwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() request) {
        return request.user;
        }
}