import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './auth.repository';
import { AuthDto, AccessToken } from './auth.dto';
import { User } from './auth.entity';

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
}
