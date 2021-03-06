import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is too weak' })
  password: string;
}

export interface JwtPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export interface AccessToken {
  accessToken: string;
}

export interface Logout {
  message: string;
}
