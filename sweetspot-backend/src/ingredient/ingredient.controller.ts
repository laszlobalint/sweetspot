import { Controller, Get, UseGuards } from '@nestjs/common';

import { IngredientService } from './ingredient.service';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { Ingredient } from './ingredient.entity';

@UseGuards(JwtGuard)
@Controller('api/ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  getAllOrders(): Promise<Ingredient[]> {
    return this.ingredientService.getAllIngredients();
  }
}
