import { Controller, Get, Post, Body, Param, Delete, Put, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto, GetOrdersFilterDto } from './order.dto';
import { OrdersService } from './order.service';
import { OrderValidationPipe } from './order.pipe';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  getAllOrders(@Query() getOrdersFilterDto: GetOrdersFilterDto): Promise<Order[]> {
    return this.orderService.getAllOrders(getOrdersFilterDto);
  }

  @Get('/:id')
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
  deleteOrderById(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.orderService.deleteOrderById(id);
  }
}
