import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientRepository } from './ingredient.repository';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(@InjectRepository(IngredientRepository) private readonly ingredientRepository: IngredientRepository) {}

  async getAllIngredients(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }
}
