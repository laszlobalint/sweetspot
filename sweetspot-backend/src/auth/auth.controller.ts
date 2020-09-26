import { Controller, Body, Post, ValidationPipe, UseGuards, Put, UsePipes, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { RateLimit } from 'nestjs-rate-limiter';
import { DeleteResult } from 'typeorm';

import { AuthDto, AccessToken, Logout } from './auth.dto';
import { User } from './auth.entity';
import { JwtGuard } from './jwt/jwt.guard';
import { AuthService } from './auth.service';
import { GetUser } from './jwt/jwt.get-user.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @RateLimit({ points: 20, duration: 60 })
  @UsePipes(ValidationPipe)
  login(@Body() authDto: AuthDto): Promise<AccessToken> {
    return this.authService.login(authDto);
  }

  @Post('/logout')
  @UseGuards(JwtGuard)
  async logout(): Promise<Logout> {
    return { message: 'Logged out.' };
  }

  @Post('/refresh-token')
  @UseGuards(JwtGuard)
  @UsePipes(ValidationPipe)
  async refreshToken(@Body() refreshTokenDto: AccessToken, @GetUser() user: User): Promise<AccessToken> {
    if (refreshTokenDto.accessToken) return this.authService.refreshToken(user);
  }

  @Post('/register')
  @UseGuards(JwtGuard)
  @UsePipes(ValidationPipe)
  register(@Body() authDto: AuthDto): Promise<User> {
    return this.authService.register(authDto);
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  @UsePipes(ValidationPipe)
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUsertDto: AuthDto): Promise<User> {
    return this.authService.updateUser(id, updateUsertDto);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  @UsePipes(ValidationPipe)
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.authService.deleteUser(id);
  }
}
