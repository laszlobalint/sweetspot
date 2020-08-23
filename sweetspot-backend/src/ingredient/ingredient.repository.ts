import { EntityRepository, Repository } from 'typeorm';

import { Ingredient } from './ingredient.entity';
import { IngredientDto } from './ingredient.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> {
  async createIngredient(createIngredientDto: IngredientDto): Promise<Ingredient> {
    const { name } = createIngredientDto;
    const ingredient = new Ingredient({ name, items: [] });
    try {
      return await ingredient.save();
    } catch (error) {
      if (error.code === '23505') throw new ConflictException('Ingredient already exists');
      else throw new InternalServerErrorException();
    }
  }
}
