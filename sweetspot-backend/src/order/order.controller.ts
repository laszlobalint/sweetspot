import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { GetUser } from '../auth/jwt/jwt.get-user.decorator';
import { OrderDto, GetOrdersFilterDto } from './order.dto';
import { User } from '../auth/auth.entity';
import { Order } from './order.entity';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { OrderValidationPipe } from './order.pipe';
import { OrdersService } from './order.service';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  @UseGuards(JwtGuard)
  getAllOrders(@Query() getOrdersFilterDto: GetOrdersFilterDto, @GetUser() user: User): Promise<Order[]> {
    return this.orderService.getAllOrders(getOrdersFilterDto);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.getOrder(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createOrder(@Body(OrderValidationPipe) createTaskDto: OrderDto): Promise<Order> {
    return this.orderService.createOrder(createTaskDto);
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  @UsePipes(ValidationPipe)
  updateOrder(@Param('id', ParseIntPipe) id: number, @Body(OrderValidationPipe) updateOrderDto: OrderDto): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.orderService.deleteOrderById(id);
  }
}
