import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { AuthDto, AccessToken } from './auth.dto';
import { User } from './auth.entity';
import { UserRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

  async login(authDto: AuthDto): Promise<AccessToken> {
    const username = await this.userRepository.validateUserPassword(authDto);
    if (!username) throw new UnauthorizedException('Invalid credentials');
    else {
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
  }

  async refreshToken(user: User): Promise<AccessToken> {
    const dbUser = await this.userRepository.findOne({ where: { username: user.username } });
    return {
      accessToken: this.jwtService.sign({ username: dbUser.username }),
    };
  }

  async register(authDto: AuthDto): Promise<User> {
    return await this.userRepository.register(authDto);
  }

  async updateUser(id: number, authDto: AuthDto): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return await this.userRepository.updateUser(user, authDto);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
