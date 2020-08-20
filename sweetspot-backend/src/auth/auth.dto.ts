import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is too weak' })
  password: string;
}

export interface JwtPayload {
  username: string;
}

export interface AccessToken {
  accessToken: string;
}
