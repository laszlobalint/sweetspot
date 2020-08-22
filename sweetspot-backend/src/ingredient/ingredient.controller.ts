import { Controller, Get, UseGuards, ParseIntPipe, Param, Post, Put, Delete, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { IngredientDto } from './ingredient.dto';
import { Ingredient } from './ingredient.entity';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { IngredientService } from './ingredient.service';

@UseGuards(JwtGuard)
@Controller('api/ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  getAllIngredients(): Promise<Ingredient[]> {
    return this.ingredientService.getAllIngredients();
  }

  @Get('/:id')
  getIngredient(@Param('id', ParseIntPipe) id: number): Promise<Ingredient> {
    return this.ingredientService.getIngredient(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createIngredient(@Body() createIngredientDto: IngredientDto): Promise<Ingredient> {
    return this.ingredientService.createIngredient(createIngredientDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateIngredient(@Param('id', ParseIntPipe) id: number, @Body() updateIngredientDto: IngredientDto): Promise<Ingredient> {
    return this.ingredientService.updateIngredient(id, updateIngredientDto);
  }

  @Delete('/:id')
  deleteIngredient(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.ingredientService.deleteIngredient(id);
  }
}
