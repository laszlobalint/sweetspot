import { Controller, Body, Post, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthDto, AccessToken } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from './auth.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UseGuards(AuthGuard('jwt'))
  register(@Body(ValidationPipe) authDto: AuthDto): Promise<User> {
    return this.authService.register(authDto);
  }

  @Post('/login')
  login(@Body(ValidationPipe) authDto: AuthDto): Promise<AccessToken> {
    return this.authService.login(authDto);
  }
}
