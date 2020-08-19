import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto, GetOrderDto, UpdateOrderDto, GetOrdersFilterDto } from './order.dto';

@Injectable()
export class OrdersService {
  private dummyOrders: any[] = [];

  getAllOrders(): GetOrderDto[] {
    return this.dummyOrders;
  }

  getOrdersWithFilters(getOrdersFilter: GetOrdersFilterDto): GetOrderDto[] {
    const { name, email } = getOrdersFilter;
    let orders = this.getAllOrders();
    orders = orders.filter(order => order.name.toLowerCase() === name.toLowerCase() || order.email.toLowerCase() === email.toLowerCase());
    return orders;
  }

  getOrderById(id: string): GetOrderDto {
    return this.dummyOrders.find(order => order.id === id);
  }

  createOrder(newOrder: CreateOrderDto): GetOrderDto {
    const order: GetOrderDto = { id: uuidv4(), ...newOrder };
    this.dummyOrders.push(order);
    return order;
  }

  updateOrder(id: string, updateOrder: UpdateOrderDto): GetOrderDto {
    const i: number = this.dummyOrders.indexOf(this.dummyOrders.find(order => order.id === id));
    this.dummyOrders[i] = { id: this.dummyOrders[i].id, ...updateOrder };
    return this.dummyOrders[i];
  }

  deleteOrderById(id: string): void {
    this.dummyOrders = this.dummyOrders.filter(order => order.id !== id);
  }
}
