import { CreateOrderDto, GetOrderDto, UpdateOrderDto, GetOrdersFilterDto } from './order.dto';
import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { OrdersService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  getAllOrders(@Query() getOrdersFilter: GetOrdersFilterDto): GetOrderDto[] {
    if (Object.keys(getOrdersFilter).length) {
      return this.orderService.getOrdersWithFilters(getOrdersFilter);
    } else {
      return this.orderService.getAllOrders();
    }
  }

  @Get('/:id')
  getOrderById(@Param('id') id: string): GetOrderDto {
    return this.orderService.getOrderById(id);
  }

  @Post()
  createOrder(@Body() createTaskDto: CreateOrderDto): CreateOrderDto {
    return this.orderService.createOrder(createTaskDto);
  }

  @Put('/:id')
  updateOrderById(@Param('id') id: string, @Body() updateOrder: UpdateOrderDto): GetOrderDto {
    return this.orderService.updateOrder(id, updateOrder);
  }

  @Delete('/:id')
  deleteOrderById(@Param('id') id: string): void {
    this.orderService.deleteOrderById(id);
  }
}
