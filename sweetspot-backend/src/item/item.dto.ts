import { IsBoolean, IsArray, IsString, MinLength, MaxLength } from 'class-validator';

export class ItemDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  picture: string;

  @IsBoolean()
  glutenfree: boolean;

  @IsBoolean()
  sugarfree: boolean;

  @IsBoolean()
  allergens: boolean;

  @IsArray()
  ingredients: number[];
}
