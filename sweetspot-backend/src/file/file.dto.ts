import { IsString, MinLength, MaxLength } from 'class-validator';

export class FileDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  originalName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  filename: string;
}
