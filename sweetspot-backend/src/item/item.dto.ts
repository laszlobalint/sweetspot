import { IsBoolean, IsArray, IsString, MinLength, MaxLength, IsInt, IsPositive } from 'class-validator';

export class ItemDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsString()
  @MinLength(4)
  @MaxLength(50)
  picture: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsBoolean()
  glutenfree: boolean;

  @IsBoolean()
  sugarfree: boolean;

  @IsBoolean()
  lactosefree: boolean;

  @IsArray()
  ingredients: number[];
}
