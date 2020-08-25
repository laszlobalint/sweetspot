import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemController } from './item.controller';
import { IngredientModule } from '../ingredient/ingredient.module';
import { ItemService } from './item.service';
import { ItemRepository } from './item.repository';
import { IngredientRepository } from '../ingredient/ingredient.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepository, IngredientRepository]), IngredientModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
