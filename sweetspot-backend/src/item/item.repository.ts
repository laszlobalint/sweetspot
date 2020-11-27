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
    const {
      titleHun,
      titleSer,
      titleEng,
      descriptionHun,
      descriptionSer,
      descriptionEng,
      picture,
      price,
      glutenfree,
      sugarfree,
      lactosefree,
      ingredients,
    } = createItemDto;

    const ingredientsForItem = await this.ingredientRepository.findByIds(ingredients, { relations: ['items'] });

    if (ingredientsForItem.length === ingredients.length) {
      const item = new Item({
        titleHun,
        titleSer,
        titleEng,
        descriptionHun,
        descriptionSer,
        descriptionEng,
        picture,
        price,
        glutenfree,
        sugarfree,
        lactosefree,
        ingredients: ingredientsForItem,
        orders: [],
      });

      return item.save();
    } else {
      throw new NotFoundException('Could not find all the ingredients!');
    }
  }

  async updateItem(item: Item, updateItemDto: ItemDto): Promise<Item> {
    const {
      titleHun,
      titleSer,
      titleEng,
      descriptionHun,
      descriptionSer,
      descriptionEng,
      picture,
      price,
      glutenfree,
      sugarfree,
      lactosefree,
      ingredients,
    } = updateItemDto;

    const ingredientsForItem = await this.ingredientRepository.findByIds(ingredients, { relations: ['items'] });

    if (ingredientsForItem.length === ingredients.length) {
      item.titleHun = titleHun;
      item.titleSer = titleSer;
      item.titleEng = titleEng;
      item.descriptionHun = descriptionHun;
      item.descriptionSer = descriptionSer;
      item.descriptionEng = descriptionEng;
      item.picture = picture;
      item.price = price;
      item.glutenfree = glutenfree;
      item.sugarfree = sugarfree;
      item.lactosefree = lactosefree;
      item.ingredients = ingredientsForItem;

      return item.save();
    } else {
      throw new NotFoundException('Could not find all the ingredients!');
    }
  }
}
