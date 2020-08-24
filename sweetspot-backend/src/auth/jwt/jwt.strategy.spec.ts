import { Test } from '@nestjs/testing';

import { User } from '../auth.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from '../auth.repository';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});
const mockJwtStrategy = () => ({
  config: jest.fn(),
  validate: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: JwtStrategy, useFactory: mockJwtStrategy },
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    const user = new User();
    user.username = 'TestUser';
    it('validates and returns the user based on JWT payload', async () => {
      userRepository.findOne.mockResolvedValue(user);
      jwtStrategy.validate.mockResolvedValue(user);
      const result = await jwtStrategy.validate({ username: user.username });
      expect(result).toEqual(user);
    });
  });
});
