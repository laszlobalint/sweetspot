import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthDto, AccessToken, JwtPayload } from './auth.dto';
import { User } from './auth.entity';
import { UserRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

  async register(authDto: AuthDto): Promise<User> {
    return await this.userRepository.register(authDto);
  }

  async login(authDto: AuthDto): Promise<AccessToken> {
    const username = await this.userRepository.validateUserPassword(authDto);
    if (!username) throw new UnauthorizedException('Invalid credentials');
    else {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
  }

  async refreshToken(refreshTokenDto: AccessToken): Promise<AccessToken> {
    const { username } = this.jwtService.decode(refreshTokenDto.accessToken) as JwtPayload;
    const user = await this.userRepository.findOne({ where: username });
    return {
      accessToken: this.jwtService.sign({ username: user.username }),
    };
  }
}
