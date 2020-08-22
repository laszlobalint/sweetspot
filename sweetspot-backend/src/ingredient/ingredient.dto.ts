/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString, MinLength, MaxLength } from 'class-validator';

export class IngredientDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;
}
