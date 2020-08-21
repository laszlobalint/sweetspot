import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { IngredientRepository } from './ingredient.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientRepository])],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
