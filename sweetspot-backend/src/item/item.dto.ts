import { IsNotEmpty, IsBoolean, IsArray, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class ItemDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  picture: string;

  @IsBoolean()
  glutenfree: boolean;

  @IsBoolean()
  sugarfree: boolean;

  @IsOptional()
  @IsArray()
  ingredients?: string[];

  @IsOptional()
  @IsArray()
  allergens?: string[];
}
