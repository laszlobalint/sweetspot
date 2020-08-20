import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { AuthDto, AccessToken } from './auth.dto';
import { AuthService } from './auth.service';
import { User } from './auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body(ValidationPipe) authDto: AuthDto): Promise<User> {
    return this.authService.register(authDto);
  }

  @Post('/login')
  login(@Body(ValidationPipe) authDto: AuthDto): Promise<AccessToken> {
    return this.authService.login(authDto);
  }
}
