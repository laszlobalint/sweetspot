import { Controller, Get, Post, Put, Delete, ParseIntPipe, Param, UseGuards, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { ItemDto } from './item.dto';
import { Item } from './item.entity';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { ItemService } from './item.service';

@Controller('api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  getAllItems(): Promise<Item[]> {
    return this.itemService.getAllItems();
  }

  @Get('/:id')
  getItem(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return this.itemService.getItem(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  @UsePipes(ValidationPipe)
  createItem(@Body() createItemDto: ItemDto): Promise<Item> {
    return this.itemService.createItem(createItemDto);
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  @UsePipes(ValidationPipe)
  updateItem(@Param('id', ParseIntPipe) id: number, @Body() updateItemDto: ItemDto): Promise<Item> {
    return this.itemService.updateItem(id, updateItemDto);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  deleteItem(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.itemService.deleteItem(id);
  }
}
