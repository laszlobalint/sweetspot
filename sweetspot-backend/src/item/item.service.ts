import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { ItemDto } from './item.dto';
import { Item } from './item.entity';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(ItemRepository) private readonly itemRepository: ItemRepository) {}

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.find({ relations: ['ingredients', 'orders'] });
  }

  async getItem(id: number): Promise<Item> {
    return this.itemRepository.findOne(id, { relations: ['ingredients', 'orders'] });
  }

  async createItem(createItemDto: ItemDto): Promise<Item> {
    return this.itemRepository.createItem(createItemDto);
  }

  async updateItem(id: number, updateItemDto: ItemDto): Promise<Item> {
    const oldItem = await this.itemRepository.findOne(id);
    if (!oldItem) throw new NotFoundException();
    return this.itemRepository.updateItem(oldItem, updateItemDto);
  }

  async deleteItem(id: number): Promise<DeleteResult> {
    return this.itemRepository.delete(id);
  }
}
