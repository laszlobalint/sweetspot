import { EntityRepository, Repository } from 'typeorm';

import { Ingredient } from './ingredient.entity';

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> {}
