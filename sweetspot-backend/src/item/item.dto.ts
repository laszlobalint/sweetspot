import { IsBoolean, IsArray, IsString, MinLength, MaxLength, IsInt, IsPositive } from 'class-validator';

export class ItemDto {
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  titleHun: string;

  @IsString()
  @MinLength(10)
  @MaxLength(50)
  titleSer: string;

  @IsString()
  @MinLength(10)
  @MaxLength(50)
  titleEng: string;

  @IsString()
  @MinLength(70)
  @MaxLength(100)
  descriptionHun: string;

  @IsString()
  @MinLength(70)
  @MaxLength(100)
  descriptionSer: string;

  @IsString()
  @MinLength(70)
  @MaxLength(100)
  descriptionEng: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
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
