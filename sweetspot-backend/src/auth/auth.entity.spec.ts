import * as bcrypt from 'bcryptjs';

import { User } from './auth.entity';

describe('AuthEntity', () => {
  let user;

  beforeEach(() => {
    user = new User();
    user.password = 'testPassword';
    user.salt = 'testSalt';
    bcrypt.hash = jest.fn();
  });

  describe('validateUserPassword', () => {
    it('returns true as password is valid', async () => {
      bcrypt.hash.mockReturnValue('testPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validateUserPassword('123456');
      expect(bcrypt.hash).toHaveBeenCalledWith('123456', user.salt);
      expect(result).toBeTruthy();
    });

    it('returns false as password is invalid', async () => {
      bcrypt.hash.mockReturnValue('wrongPassword');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await user.validateUserPassword('wrongPassword');
      expect(bcrypt.hash).toHaveBeenCalledWith('wrongPassword', user.salt);
      expect(result).toBeFalsy();
    });
  });
});
