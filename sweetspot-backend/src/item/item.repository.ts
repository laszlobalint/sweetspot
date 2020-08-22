import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';

import { ItemDto } from './item.dto';
import { Item } from './item.entity';
import { IngredientRepository } from '../ingredient/ingredient.repository';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  constructor(@InjectRepository(IngredientRepository) private readonly ingredientRepository: IngredientRepository) {
    super();
  }

  async createItem(createItemDto: ItemDto): Promise<Item> {
    const { title, picture, glutenfree, sugarfree, allergens, ingredients } = createItemDto;
    const ingredientsForItem = await this.ingredientRepository.findByIds(ingredients, { relations: ['items'] });
    if (ingredientsForItem.length === ingredients.length) {
      const item = new Item({ title, picture, glutenfree, sugarfree, allergens, ingredients: ingredientsForItem, orders: [] });
      return item.save();
    } else {
      throw new NotFoundException('Could not find all the ingredients!');
    }
  }

  async updateItem(item: Item, updateItemDto: ItemDto): Promise<Item> {
    const { title, picture, glutenfree, sugarfree, allergens, ingredients } = updateItemDto;
    const ingredientsForItem = await this.ingredientRepository.findByIds(ingredients, { relations: ['items'] });
    if (ingredientsForItem.length === ingredients.length) {
      item.title = title;
      item.picture = picture;
      item.glutenfree = glutenfree;
      item.sugarfree = sugarfree;
      item.allergens = allergens;
      item.ingredients = ingredientsForItem;
      return item.save();
    } else {
      throw new NotFoundException('Could not find all the ingredients!');
    }
  }
}
