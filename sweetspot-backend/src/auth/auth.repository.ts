import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthDto } from './auth.dto';
import { User } from './auth.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(authDto: AuthDto): Promise<User> {
    const { username, password } = authDto;
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      return await user.save();
    } catch (error) {
      if (error.code === '23505') throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }

  async validateUserPassword(authDto: AuthDto): Promise<string> {
    const { username, password } = authDto;
    const user = await this.findOne({ username });
    if (user && (await user.validateUserPassword(password))) return user.username;
    else return null;
  }

  private async hashPassword(plainPassword: string, salt: string): Promise<string> {
    return bcrypt.hash(plainPassword, salt);
  }
}
