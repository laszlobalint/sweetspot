import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { ItemDto } from './item.dto';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';
import { IngredientRepository } from 'src/ingredient/ingredient.repository';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemRepository) private readonly itemRepository: ItemRepository,
    @InjectRepository(IngredientRepository) private readonly ingredientRepository: IngredientRepository,
  ) {}

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.find({ relations: ['ingredients'] });
  }

  async getItem(id: number): Promise<Item> {
    return this.itemRepository.findOne(id, { relations: ['ingredients'] });
  }

  async createItem(createItemDto: ItemDto): Promise<Item> {
    const { title, picture, glutenfree, sugarfree, allergens, ingredients } = createItemDto;
    const ingredientsForItem = await this.ingredientRepository.findByIds(ingredients, { relations: ['items'] });
    if (ingredientsForItem.length === ingredients.length) {
      const item = new Item({ title, picture, glutenfree, sugarfree, allergens, ingredients: ingredientsForItem });
      return this.itemRepository.save(item);
    } else {
      throw new NotFoundException('Could not find all the ingredients!');
    }
  }

  async updateItem(id: number, updateItemDto: ItemDto): Promise<Item> {
    const item = await this.getItem(id);
    return this.itemRepository.save(item);
  }

  async deleteItem(id: number): Promise<DeleteResult> {
    return this.itemRepository.delete(id);
  }
}
