import { Controller, Body, Post, ValidationPipe, UseGuards } from '@nestjs/common';
import { RateLimit } from 'nestjs-rate-limiter';

import { AuthDto, AccessToken, Logout } from './auth.dto';
import { User } from './auth.entity';
import { JwtGuard } from './jwt/jwt.guard';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UseGuards(JwtGuard)
  register(@Body(ValidationPipe) authDto: AuthDto): Promise<User> {
    return this.authService.register(authDto);
  }

  @RateLimit({ points: 20, duration: 60 })
  @Post('/login')
  login(@Body(ValidationPipe) authDto: AuthDto): Promise<AccessToken> {
    return this.authService.login(authDto);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() refreshTokenDto: AccessToken): Promise<AccessToken> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('/logout')
  @UseGuards(JwtGuard)
  async logout(): Promise<Logout> {
    return { message: 'Logged out.' };
  }
}
