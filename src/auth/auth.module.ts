import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule,JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        })],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthGuard],
  controllers: [AuthController],
  exports: [AuthGuard, JwtModule, AuthService], 
})
export class AuthModule {}