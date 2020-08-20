import { IsNotEmpty, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class ItemDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
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
