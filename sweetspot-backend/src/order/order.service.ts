import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { OrderRepository } from './order.repository';
import { Order } from './order.entity';
import { CreateOrderDto, UpdateOrderDto, GetOrdersFilterDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(OrderRepository) private readonly orderRepository: OrderRepository) {}

  async getAllOrders(getOrdersFilterDto: GetOrdersFilterDto): Promise<Order[]> {
    return this.orderRepository.getOrders(getOrdersFilterDto);
  }

  async getOrderById(id: number): Promise<Order> {
    const foundOrder = await this.orderRepository.findOne(id);
    if (!foundOrder) throw new NotFoundException();
    return foundOrder;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.createOrder(createOrderDto);
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const oldOrder = await this.getOrderById(id);
    if (!oldOrder) throw new NotFoundException();
    const newOrder = {
      id,
      name: updateOrderDto.name,
      phone: updateOrderDto.phone,
      email: updateOrderDto.email,
      address: `${updateOrderDto.address.postalCode} ${updateOrderDto.address.settlement}, ${updateOrderDto.address.street}; ${updateOrderDto.address.country}`,
      price: updateOrderDto.price,
      delivery: updateOrderDto.delivery,
    };
    return this.orderRepository.save(newOrder);
  }

  async deleteOrderById(id: number): Promise<DeleteResult> {
    const deleteResult = await this.orderRepository.delete(id);
    if (!deleteResult.affected) throw new NotFoundException();
    return deleteResult;
  }
}
