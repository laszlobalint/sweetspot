import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { IngredientDto } from './ingredient.dto';
import { Ingredient } from './ingredient.entity';
import { IngredientRepository } from './ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(@InjectRepository(IngredientRepository) private readonly ingredientRepository: IngredientRepository) {}

  async getAllIngredients(): Promise<Ingredient[]> {
    return this.ingredientRepository.find({ relations: ['items'] });
  }

  async getIngredient(id: number): Promise<Ingredient> {
    return this.ingredientRepository.findOne(id);
  }

  async createIngredient(createIngredientDto: IngredientDto): Promise<Ingredient> {
    const { name } = createIngredientDto;
    const ingredient = new Ingredient({ name, items: [] });
    return this.ingredientRepository.save(ingredient);
  }

  async updateIngredient(id: number, updateIngredientDto: IngredientDto): Promise<Ingredient> {
    const { name } = updateIngredientDto;
    const ingredient = await this.getIngredient(id);
    ingredient.name = name;
    return this.ingredientRepository.save(ingredient);
  }

  async deleteIngredient(id: number): Promise<DeleteResult> {
    return this.ingredientRepository.delete(id);
  }
}
