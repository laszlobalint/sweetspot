import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { OrderDto, GetOrdersFilterDto } from './order.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(OrderRepository) private readonly orderRepository: OrderRepository) {}

  async getAllOrders(getOrdersFilterDto: GetOrdersFilterDto): Promise<Order[]> {
    return this.orderRepository.getOrders(getOrdersFilterDto);
  }

  async getOrder(id: number): Promise<Order> {
    const foundOrder = await this.orderRepository.findOne(id, { relations: ['items'] });
    if (!foundOrder) throw new NotFoundException();
    return foundOrder;
  }

  async createOrder(createOrderDto: OrderDto): Promise<Order> {
    return this.orderRepository.createOrder(createOrderDto);
  }

  async updateOrder(id: number, updateOrderDto: OrderDto): Promise<Order> {
    const oldOrder = await this.getOrder(id);
    if (!oldOrder) throw new NotFoundException();
    const updatedOrder = this.orderRepository.updateOrder(updateOrderDto, id);
    return this.orderRepository.save(updatedOrder);
  }

  async deleteOrderById(id: number): Promise<DeleteResult> {
    const deleteResult = await this.orderRepository.delete(id);
    if (!deleteResult.affected) throw new NotFoundException();
    return deleteResult;
  }
}
