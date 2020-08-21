import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto, GetOrdersFilterDto } from './order.dto';
import { OrdersService } from './order.service';
import { OrderValidationPipe } from './order.pipe';
import { GetUser } from '../auth/jwt/jwt.get-user.decorator';
import { User } from '../auth/auth.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllOrders(@Query() getOrdersFilterDto: GetOrdersFilterDto, @GetUser() user: User): Promise<Order[]> {
    console.log(user);
    return this.orderService.getAllOrders(getOrdersFilterDto);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createOrder(@Body(OrderValidationPipe) createTaskDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createTaskDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateOrderById(@Param('id', ParseIntPipe) id: number, @Body(OrderValidationPipe) updateOrder: UpdateOrderDto): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrder);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteOrderById(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.orderService.deleteOrderById(id);
  }
}
