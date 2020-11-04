/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  ParseIntPipe,
  Param,
  UseGuards,
  Body,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { imageFileFilter, editFileName } from '../file/file';
import { ItemDto } from './item.dto';
import { Item } from './item.entity';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { ItemService } from './item.service';
import { FileDto } from '../file/file.dto';

@Controller('api/items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/upload/:image')
  fetchUploadedFile(@Param('image') image: string, @Res() res: any): any {
    return res.sendFile(image, { root: './assets' });
  }

  @UseGuards(JwtGuard)
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './assets',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: any): FileDto {
    return {
      originalName: file.originalname,
      filename: file.filename,
    } as FileDto;
  }

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
