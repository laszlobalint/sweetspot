import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemRepository } from './item.repository';
import { IngredientService } from '../ingredient/ingredient.service';
import { IngredientRepository } from 'src/ingredient/ingredient.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository, IngredientRepository])],
  controllers: [ItemController],
  providers: [ItemService, IngredientService],
})
export class ItemModule {}
