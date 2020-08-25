import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';

import { User } from '../auth.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from '../auth.repository';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [JwtStrategy, { provide: UserRepository, useFactory: mockUserRepository }],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    const user = new User();
    user.id = 1;
    user.username = 'TestUser';
    user.password = 'TestPassword';
    user.salt = 'TestSalt';

    it('validates and returns the user based on JWT payload', async () => {
      userRepository.findOne.mockResolvedValue(user);
      const result = await jwtStrategy.validate({ username: user.username });
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: user.username });
      expect(result).toEqual(user);
    });

    it('throws an unauthorized exception as user cannot be found', () => {
      userRepository.findOne.mockResolvedValue(null);

      const action = async () => {
        await jwtStrategy.validate({ username: user.username });
      };
      expect(action()).rejects.toThrow(UnauthorizedException);
    });
  });
});
