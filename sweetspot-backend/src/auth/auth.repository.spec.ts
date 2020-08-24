import { Test } from '@nestjs/testing';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

import { User } from './auth.entity';
import { UserRepository } from './auth.repository';

const mockCredentialsDto = { username: 'TestUsername', password: 'TestPassword' };

describe('AuthRepository', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('register', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully registers the user', () => {
      save.mockResolvedValue(undefined);
      expect(userRepository.register(mockCredentialsDto)).resolves.not.toThrow();
    });
    it('throws a conflict exception as username already exists', () => {
      save.mockRejectedValue({ code: '23505' });
      expect(userRepository.register(mockCredentialsDto)).resolves.toThrow(ConflictException);
    });
    it('throws an internal server exception if some other error occurs', () => {
      save.mockRejectedValue({ code: '12345' });
      expect(userRepository.register(mockCredentialsDto)).resolves.toThrow(InternalServerErrorException);
    });
  });

  describe('validateUserPassword', () => {
    let user;

    beforeEach(() => {
      userRepository.findOne = jest.fn();
      user = new User();
      user.username = mockCredentialsDto.username;
      user.validateUserPassword = jest.fn();
    });

    it('returns the username as validation is successful', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validateUserPassword.mockResolvedValue(true);
      const result = await userRepository.validateUserPassword(mockCredentialsDto);
      expect(result).toEqual(mockCredentialsDto.username);
    });

    it('returns null as a user cannot be found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      const result = await userRepository.validateUserPassword(mockCredentialsDto);
      expect(user.validateUserPassword).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('returns null as a user cannot be found', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validateUserPassword.mockResolvedValue(false);
      const result = await userRepository.validateUserPassword(mockCredentialsDto);
      expect(user.validateUserPassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });
});
