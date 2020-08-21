import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { GetUser } from '../auth/jwt/jwt.get-user.decorator';
import { CreateOrderDto, UpdateOrderDto, GetOrdersFilterDto } from './order.dto';
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
    console.log(user);
    return this.orderService.getAllOrders(getOrdersFilterDto);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createOrder(@Body(OrderValidationPipe) createTaskDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createTaskDto);
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  @UsePipes(ValidationPipe)
  updateOrderById(@Param('id', ParseIntPipe) id: number, @Body(OrderValidationPipe) updateOrder: UpdateOrderDto): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrder);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  deleteOrderById(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.orderService.deleteOrderById(id);
  }
}
